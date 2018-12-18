<?php

namespace BaseCms\Http\Controllers;

use BaseCms\Models\AdminLog;
use BaseCms\Models\Block;
use BaseCms\Models\Language;
use BaseCms\Models\PageBlock;
use BaseCms\Models\PageGroup;
use BaseCms\Models\PagePublishRequests;
use BaseCms\Models\PageVersion;
use BaseCms\Models\PageVersionSchedule;
use BaseCms\Models\ThemeTemplate;
use CoasterCms\Helpers\Cms\Page\PageCache;
use CoasterCms\Helpers\Cms\Page\Path;
use CoasterCms\Http\Controllers\AdminController as Controller;
use BaseCms\Models\Page;
use CoasterCms\Libraries\Blocks\Repeater;
use View;
use Auth;
use Request;
use Response;
class NewsCategoryController extends Controller
{
    public function getIndex()
    {
        $this->layoutData['content'] = View::make('admin.pages.news_category', array('pages' => Page::getNewsCategoryView(0), 'add_page' => Auth::action('pages.add'), 'page_states' => Auth::user()->getPageStates(), 'max' => Page::at_limit(), 'rootPageIds' => '', 'groups_exist' => PageGroup::count()));
        $this->layoutData['modals'] = View::make('admin.modals.general.delete_item');
    }

    public function getAdd($parentPageId = 0, $groupId = 0)
    {
        $publishingOn = config('coaster::admin.publishing') > 0;
        $cabPublish = ($publishingOn && Auth::action('pages.version-publish', ['page_id' => $parentPageId])) || (!$publishingOn && Auth::action('pages.edit', ['page_id' => $parentPageId]));

        // set page data
        $page = new Page;
        if ($parentPageId && $parent = Page::find($parentPageId)) {
            $page->parent = $parent->id;
            $page->template = $parent->child_template;
        } else {
            $page->parent = 0;
        }
        if ($groupId && $group = PageGroup::find($groupId)) {
            $page->groups->add($group);
            $page->template = $group->default_template;
            $page->parent = $parentPageId ? $page->parent : -1;
        }
        $page->group_container = 0;
        $page->link = 0;
        $page->live = $cabPublish ? 1 : 0;
        $page->sitemap = 1;

        // get item name, or default to page
        $item_name = $page->groupItemsNames() ?: 'Page';

        list($tab_headers[0], $tab_contents[0]) = $page->tabInfoNewsCategory();
        ksort($tab_headers);


        $tab_data = [
            'headers' => View::make('admin.tabs.article_header', ['tabs' => $tab_headers])->render(),
            'contents' => View::make('admin.tabs.journal_content', ['tabs' => $tab_contents, 'item' => $item_name, 'new_page' => true, 'publishing' => $publishingOn, 'can_publish' => $cabPublish, 'page' => $page])->render()
        ];
//        dd($tab_data);
        $this->layoutData['content'] = View::make('admin.pages.news_category_add', [
            'page' => $page,
            'item_name' => $item_name,
            'tab' => $tab_data
        ]);
    }

    public function postAdd($pageId = 0, $groupId = 0)
    {
        $page_version = PageVersion::prepareNew();
        $page_info = Request::input('page_info') ?: [];
        $page_info['template'] = ['exists'=>1,'select'=>2];
        $page_info['live'] = ['exists'=>1,'select'=>1];
        $page_info['sitemap'] = ['exists'=>1,'select'=>1];
        $page_info['group_container_url_priority'] = '0';
        $page_info['group_container'] = '0';
        $page_groups = Request::input('page_groups') ?: [];
        $page_info_other['group_radio'] = '0';
        $page_info_other['menus'] = ['1'=>'1'];
        $page_info_lang['name'] = Request::input('page_info_lang')['name'];
        $page_info_lang['url'] = Request::input('page_info_lang')['name'];
        $page = new Page;
        if (!$page->savePostData($page_version, $page_info, $page_info_lang, $page_groups, $page_info_other)) {
            $this->getAdd($pageId);
            return null;
        } else {
            $existingPage = Page::find($page->id);
            if (!$existingPage) {
                return '分类没有找到';
            }
            $publish = false;
            $publishing = (bool) config('admin.publishing');
            $canPublish = Auth::action('pages.version-publish', ['page_id' => $page->id]);
            if ($publishing && $existingPage->link == 0) {
                // check if publish
                if (Request::input('publish') != '' && $canPublish) {
                    $publish = true;
                    // check if there were requests to publish the version being edited
                    $overwriting_page_version = PageVersion::where('version_id', '=', Request::input('versionFrom'))->where('page_id', '=', $pageId)->first();
                    $requests = PagePublishRequests::where('page_version_id', '=', $overwriting_page_version->id)->where('status', '=', 'awaiting')->get();
                    if (!$requests->isEmpty()) {
                        foreach ($requests as $request) {
                            $request->status = 'approved';
                            $request->mod_id = Auth::user()->id;
                            $request->save();
                        }
                    }
                }
            } elseif (!$publishing || ($existingPage->link == 1 && $canPublish)) {
                $publish = true;
            }

            // run if duplicate button was hit
            if (Request::input('duplicate') == 1) {
                if ($existingPage->canDuplicate()) {
                    if ($duplicatePage = $existingPage->saveDuplicateFromPostData($page_info, $page_info_lang, $page_groups, $page_info_other)) {
                        Repeater::setDuplicate();
                        Block::submit($duplicatePage->id, 1, $publish);
                        return \redirect()->route('coaster.admin.pages.edit', ['pageId' => $duplicatePage->id]);
                    } else {
                        $this->addAlert('danger', 'Duplication failed');
                        return $this->getEdit($page->id);
                    }
                } else {
                    return abort(403, 'Action not permitted');
                }
            }
            $version = PageVersion::add_new($page->id);

            // update blocks
            Block::submit($page->id, $version->version_id, $publish);
            $this->addAlert('success', '分类修改成功');

            if ($publish) {
                if (Request::input('publish_request') != '') {
                    PagePublishRequests::add($page->id, $version->version_id, Request::input('request_note'));
                }
                $version->publish();
                PageCache::clear($page->id);
            }
            if(Request::input('is_hot',0)){
                $existingPage->is_hot = Request::input('is_hot',0);
                $existingPage->save();
            }

            return \redirect()->route('coaster.admin.news_category');
        }
    }

    public function getEdit($pageId, $versionId = 0)
    {
        // get page data
        if (!($page = Page::find($pageId))) {
            return '文章没有找到';
        }
        PageVersionSchedule::checkPageVersionIds();

        $publishingOn = config('coaster::admin.publishing') > 0;
        $auth = [
            'can_publish' => ($publishingOn && Auth::action('pages.version-publish', ['page_id' => $pageId])) || (!$publishingOn && Auth::action('pages.edit', ['page_id' => $pageId])),
            'can_duplicate' => $page->canDuplicate()
        ];

        // get page lang data
        if (!($page_lang = $page->pageCurrentLang)) {
            if (!($page_lang = $page->pageDefaultLang)) {
                return 'Page Lang Data Not Found';
            }
            $page_lang = $page_lang->replicate();
            $page_lang->language_id = Language::current();
            $page_lang->save();
        }
        $page_lang->url = ltrim($page_lang->url, '/');

        // get version data
        $versionData = [];
        $versionData['latest'] = PageVersion::latest_version($pageId);
        $versionData['editing'] = ($versionId == 0 || $versionId > $versionData['latest']) ? $versionData['latest'] : $versionId;
        $versionData['live'] = $page_lang->live_version;

        // get frontend link (preview or direct link if document)
        $frontendLink = Path::getFullUrl($pageId);
        if (!$page->is_live() && $page->link == 0) {
            $live_page_version = PageVersion::where('page_id', '=', $pageId)->where('version_id', '=', $versionData['live'])->first();
            if (!empty($live_page_version)) {
                $frontendLink .= '?preview=' . $live_page_version->preview_key;
            }
        }

        // if loading a non live version get version template rather than current page template
        if ($versionData['live'] != $versionData['editing']) {
            if ($page_version = PageVersion::where('version_id', '=', $versionData['editing'])->where('page_id', '=', $pageId)->first()) {
                $page->template = $page_version->template;
            } else {
                return 'Page Version Data Not Found';
            }
        }

        // load page info and order so page info is first and block categories are in order
        list($tab_headers[0], $tab_contents[0]) = $page->tabInfoNewsCategory();
        ksort($tab_headers);

        // load version / publish requests
        if ($publishingOn && count($tab_headers) > 1) {
            $tab_headers[-1] = 'Versions';
            $tab_contents[-1] = View::make('coaster::partials.tabs.versions.main', ['content' => PageVersion::version_table($page->id)])->render();
            list($tab_headers[-2], $tab_contents[-2]) = $page->tabRequests();
        }

        // remove empty tabs
        $tab_headers = array_filter($tab_headers);

        // get item name, or default to page
        $item_name = $page->groupItemsNames() ?: 'Page';

        $tab_data = [
            'headers' => View::make('admin.tabs.header', ['tabs' => $tab_headers])->render(),
            'contents' => View::make('admin.tabs.news_category_content', ['tabs' => $tab_contents, 'item' => $item_name, 'new_page' => false, 'publishing' => $publishingOn, 'can_publish' => $auth['can_publish'], 'page' => $page])->render()
        ];

        // add required modals
        if ($publishingOn) {
            $intervals = PageVersionSchedule::selectOptions();
            $this->layoutData['modals'] =
                View::make('coaster::modals.pages.publish')->render() .
                View::make('coaster::modals.pages.publish_schedule', ['intervals' => $intervals, 'live_version' => $versionData['live']])->render() .
                View::make('coaster::modals.pages.request_publish')->render() .
                View::make('coaster::modals.pages.rename_version')->render();
        }

        $this->layoutData['content'] = View::make('admin.pages.edit', [
            'page' => $page,
            'page_lang' => $page_lang,
            'item_name' => $item_name,
            'publishingOn' => $publishingOn,
            'tab' => $tab_data,
            'frontendLink' => $frontendLink,
            'version' => $versionData,
            'auth' => $auth
        ]);
        return null;
    }

    public function postEdit($pageId)
    {
        $existingPage = Page::find($pageId);
        if (!$existingPage) {
            return '文章没有找到';
        }

        $publish = false;
        $publishing = (bool) config('admin.publishing');
        $canPublish = Auth::action('pages.version-publish', ['page_id' => $pageId]);
        if ($publishing && $existingPage->link == 0) {
            // check if publish
            if (Request::input('publish') != '' && $canPublish) {
                $publish = true;
                // check if there were requests to publish the version being edited
                $overwriting_page_version = PageVersion::where('version_id', '=', Request::input('versionFrom'))->where('page_id', '=', $pageId)->first();
                $requests = PagePublishRequests::where('page_version_id', '=', $overwriting_page_version->id)->where('status', '=', 'awaiting')->get();
                if (!$requests->isEmpty()) {
                    foreach ($requests as $request) {
                        $request->status = 'approved';
                        $request->mod_id = Auth::user()->id;
                        $request->save();
                    }
                }
            }
        } elseif (!$publishing || ($existingPage->link == 1 && $canPublish)) {
            $publish = true;
        }

        $page_info = Request::input('page_info') ?: [];
        $page_info['template'] = ['exists'=>1,'select'=>2];
        $page_info['live'] = ['exists'=>1,'select'=>1];
        $page_info['sitemap'] = ['exists'=>1,'select'=>1];
        $page_info['group_container_url_priority'] = '0';
        $page_info['group_container'] = '0';
        $page_groups = Request::input('page_groups') ?: [];
        $page_info_other['group_radio'] = '0';
        $page_info_other['menus'] = ['1'=>'1'];
        $page_info_lang['name'] = Request::input('page_info_lang')['name'];
        $page_info_lang['url'] = Request::input('page_info_lang')['name'];

        // run if duplicate button was hit
        if (Request::input('duplicate') == 1) {
            if ($existingPage->canDuplicate()) {
                if ($duplicatePage = $existingPage->saveDuplicateFromPostData($page_info, $page_info_lang, $page_groups, $page_info_other)) {
                    Repeater::setDuplicate();
                    Block::submit($duplicatePage->id, 1, $publish);
                    return \redirect()->route('coaster.admin.pages.edit', ['pageId' => $duplicatePage->id]);
                } else {
                    $this->addAlert('danger', 'Duplication failed');
                    return $this->getEdit($pageId);
                }
            } else {
                return abort(403, 'Action not permitted');
            }
        }
        $version = PageVersion::add_new($pageId);

        // save page info
        if ($existingPage->savePostData($version, $page_info, $page_info_lang, $page_groups, $page_info_other)) {
            AdminLog::new_log('Updated page \'' . $existingPage->pageLang()->name . '\' (Page ID ' . $existingPage->id . ')');
        } else {
            $this->addAlert('warning', '"Page Info" not updated (check tab for errors)');
        }

        // update blocks
        Block::submit($pageId, $version->version_id, $publish);
        $this->addAlert('success', '分类修改成功');

        if ($publish) {
            if (Request::input('publish_request') != '') {
                PagePublishRequests::add($pageId, $version->version_id, Request::input('request_note'));
            }
            $version->publish();
            PageCache::clear($pageId);
        }

        $existingPage->is_hot = Request::input('is_hot',0);
        $existingPage->save();
        // display page edit form
        return $this->getEdit($pageId,$version->version_id);
    }

    //
    public function postDelete($pageId)
    {
        if ($page = Page::find($pageId)) {
            json_encode($page->delete());
            return redirect()->route("coaster.admin.news_category");
        }
        return Response::make('Page with ID '.$pageId.' not found', 500);
    }
}
