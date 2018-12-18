<?php namespace BaseCms\Models;

use Auth;
use Carbon\Carbon;
use CoasterCms\Helpers\Cms\Page\Path;
use View;
use File;

class Page extends \CoasterCms\Models\Page
{

    const HOT_YES = 1;#热门
    const HOT_NO = 0;#默认

    const TEMPLATE_ARTICLE =1;#文章模板
    const TEMPLATE_ARTICLE_CATEGORY =2;#分类模板

    const TYPE_JOURNAL =99;#期刊
    const TYPE_JOURNAL_NEWS =100;#期刊快报
    const TYPE_SUBMISSION =101;#投稿
    const TYPE_CHUSHU =102;#出书
    const TYPE_KETI =103;#课题
    const TYPE_ZHUANLI =104;#专利
    const TYPE_FRONTIER =105;#学术前沿
    const TYPE_QUESTION =106;#学术答疑
    const TYPE_PAPER_TESTING =107;#论文检测
    const TYPE_PAPER =108;#论文
    const TYPE_PROJECT_SUGGEST =109;#课题介绍
    const TYPE_PROJECT_GOOD =110;#获奖课题
    const TYPE_PROJECT_NICE =111;#优质课题
    const TYPE_PARENT_NEWS =112;#专利快报
    const TYPE_PARENT_GUIDE =113;#专利指南
    const TYPE_BOOK_COMMON =114;#出书常识
    const TYPE_AUTHOR =115;#著名作者
    const TYPE_CONSULT =116;#出书咨询
    const TYPE_WRITING =117;#应用文
    const TYPE_DOWN=118;#资源下载
    const TYPE_MEDIA=119;#线上媒体
    const TYPE_PRINT=120;#其他纸媒




    public static function category_pages($page_id, $check_live = false)
    {
        $check_live_string = $check_live ? 'true' : 'false';
        // check if previously generated (used a lot in the link blocks)
        if (!empty(self::$preloaded_catpages[$page_id])) {
            if (!empty(self::$preloaded_catpages[$page_id][$check_live_string])) {
                return self::$preloaded_catpages[$page_id][$check_live_string];
            }
        } else {
            self::$preloaded_catpages[$page_id] = array();
        }
        $pages = [];
        $page = self::preload($page_id);
        if ($page->exists && $page->group_container > 0) {
            $group = PageGroup::preload($page->group_container);
            if ($group->exists) {
                $group_pages = $group->itemPageIdsFiltered($page_id, $check_live, true);
                foreach ($group_pages as $group_page) {
                    $pages[] = self::preload($group_page);
                }
            }
        } else {
            $pages = self::getChildPages($page_id);
            if ($check_live) {
                foreach ($pages as $key => $page) {
                    if (!$page->is_live()) {
                        unset($pages[$key]);
                    }
                }
            }
        }
        self::$preloaded_catpages[$page_id][$check_live_string] = $pages;
        return $pages;
    }

    public static function get_category_list($options = array())
    {
        $default_options = array('links' => true, 'group_pages' => true, 'language_id' => Language::current(),'parent'=>null);

        $options = array_merge($default_options, $options);
        $pages = self::all();

        $pages_array = array();
        $max_link = $options['links'] ? 1 : 0;

        $min_parent = $options['group_pages'] ? -1 : 0;
        foreach ($pages as $page) {
            if (config('coaster::admin.advanced_permissions') && !Auth::action('pages', ['page_id' => $page->id])) {
                continue;
            }
            if ($page->link <= $max_link && $page->parent >= $min_parent) {
                if($page->template == 2){
                    $pages_array[] = $page->id;
                }
            }
        }
        $paths = Path::getFullPathsVariations($pages_array);
        $list = array();
        foreach ($paths as $page_id => $path) {
            if ((!isset($options['exclude_home']) || $path->fullUrl != '/') && !is_null($path->fullUrl)) {
                $list[$page_id] = html_entity_decode($path->fullName); // fix form selects which have another html encode on
            }
        }

        // order
        asort($list);
        return $list;
    }

    public static function get_paper_list($options = array())
    {
        $default_options = array('links' => true, 'group_pages' => true, 'language_id' => Language::current(),'parent'=>null);

        $options = array_merge($default_options, $options);
        $pages = Page::where('template',Page::TEMPLATE_ARTICLE_CATEGORY)->whereIn('parent',[117,118,108])->get();
        $pages_array = array();
        $max_link = $options['links'] ? 1 : 0;

        $min_parent = $options['group_pages'] ? -1 : 0;
        foreach ($pages as $page) {
            if (config('coaster::admin.advanced_permissions') && !Auth::action('pages', ['page_id' => $page->id])) {
                continue;
            }
            if ($page->link <= $max_link && $page->parent >= $min_parent) {
                if($page->template == 2){
                    $pages_array[] = $page->id;
                }
            }
        }
        $paths = Path::getFullPathsVariations($pages_array);
        $list = array();
        foreach ($paths as $page_id => $path) {
            if ((!isset($options['exclude_home']) || $path->fullUrl != '/') && !is_null($path->fullUrl)) {
                $list[$page_id] = html_entity_decode($path->fullName); // fix form selects which have another html encode on
            }
        }

        // order
        asort($list);
        return $list;
    }

    public static function get_news_list($options = array())
    {
        $default_options = array('links' => true, 'group_pages' => true, 'language_id' => Language::current(),'parent'=>null);

        $options = array_merge($default_options, $options);
        $pages = Page::where('template',Page::TEMPLATE_ARTICLE_CATEGORY)->where('parent',Page::TYPE_JOURNAL_NEWS)->get();
        $pages_array = array();
        $max_link = $options['links'] ? 1 : 0;

        $min_parent = $options['group_pages'] ? -1 : 0;
        foreach ($pages as $page) {
            if (config('coaster::admin.advanced_permissions') && !Auth::action('pages', ['page_id' => $page->id])) {
                continue;
            }
            if ($page->link <= $max_link && $page->parent >= $min_parent) {
                if($page->template == 2){
                    $pages_array[] = $page->id;
                }
            }
        }
        $paths = Path::getFullPathsVariations($pages_array);
        $list = array();
        foreach ($paths as $page_id => $path) {
            if ((!isset($options['exclude_home']) || $path->fullUrl != '/') && !is_null($path->fullUrl)) {
                $list[$page_id] = html_entity_decode($path->fullName); // fix form selects which have another html encode on
            }
        }

        // order
        asort($list);
        return $list;
    }

    public static function get_print_list($options = array())
    {
        $default_options = array('links' => true, 'group_pages' => true, 'language_id' => Language::current(),'parent'=>null);

        $options = array_merge($default_options, $options);
        $pages = [
            Page::find(self::TYPE_PRINT),
        ];
        $pages_array = array();
        $max_link = $options['links'] ? 1 : 0;

        $min_parent = $options['group_pages'] ? -1 : 0;
        foreach ($pages as $page) {
            if (config('coaster::admin.advanced_permissions') && !Auth::action('pages', ['page_id' => $page->id])) {
                continue;
            }
            if ($page->link <= $max_link && $page->parent >= $min_parent) {
                if($page->template == 2){
                    $pages_array[] = $page->id;
                }
            }
        }
        $paths = Path::getFullPathsVariations($pages_array);
        $list = array();
        foreach ($paths as $page_id => $path) {
            if ((!isset($options['exclude_home']) || $path->fullUrl != '/') && !is_null($path->fullUrl)) {
                $list[$page_id] = html_entity_decode($path->fullName); // fix form selects which have another html encode on
            }
        }

        // order
        asort($list);
        return $list;
    }

    public static function get_journal_list($options = array())
    {
        $default_options = array('links' => true, 'group_pages' => true, 'language_id' => Language::current(),'parent'=>null);

        $options = array_merge($default_options, $options);
        $pages = [
            Page::find(self::TYPE_MEDIA),
            Page::find(self::TYPE_CHUSHU),
            Page::find(106)
        ];
        $pages_array = array();
        $max_link = $options['links'] ? 1 : 0;

        $min_parent = $options['group_pages'] ? -1 : 0;
        foreach ($pages as $page) {
            if (config('coaster::admin.advanced_permissions') && !Auth::action('pages', ['page_id' => $page->id])) {
                continue;
            }
            if ($page->link <= $max_link && $page->parent >= $min_parent) {
                if($page->template == 2){
                    $pages_array[] = $page->id;
                }
            }
        }
        $paths = Path::getFullPathsVariations($pages_array);
        $list = array();
        foreach ($paths as $page_id => $path) {
            if ((!isset($options['exclude_home']) || $path->fullUrl != '/') && !is_null($path->fullUrl)) {
                $list[$page_id] = html_entity_decode($path->fullName); // fix form selects which have another html encode on
            }
        }

        // order
        asort($list);
        return $list;
    }

    public static function getCategoryView($parent)
    {
        $childPages = Page::where('template',2)->whereIn('parent',[117,118,108])->get();
        return static::getPageListView($childPages, true);
    }

    public static function getArticleView($parent)
    {
        $category = Page::find(Page::TYPE_PAPER);
        $writing = Page::find(Page::TYPE_WRITING);
        $down = Page::find(Page::TYPE_DOWN);
        $childPages = Page::where('template',Page::TEMPLATE_ARTICLE_CATEGORY)->whereIn('parent',[$category->id,$writing->id,$down->id])->get(['id']);
        $articles = Page::where('template',Page::TEMPLATE_ARTICLE)->whereIn('parent',$childPages)->paginate(15);
        return static::getArticleListView($articles, true);
    }

    public static function getJournalFrontierView($parent)
    {
        $ids = [
            119,102,106
        ];
        $childPages = Page::where('template',1)->whereIn('parent',$ids)->paginate(15);
        return static::getJournalFrontierListView($childPages, true);
    }

    public static function getPrintFrontierView($parent)
    {
        $ids = [
           120
        ];
        $childPages = Page::where('template',1)->whereIn('parent',$ids)->paginate(15);
        return static::getPrintFrontierListView($childPages, true);
    }

    public static function getNewsCategoryView($parent)
    {
        $childPages = Page::where('template',2)->where('parent',self::TYPE_JOURNAL_NEWS)->get();
        return static::getNewsCategoryListView($childPages, true);
    }

    public static function getNewsView($parent)
    {
        $category = Page::find(Page::TYPE_JOURNAL_NEWS);
        $categories = Page::where('template',Page::TEMPLATE_ARTICLE_CATEGORY)->where('parent',$category->id)->get(['id']);
        $childPages = Page::where('template',1)->whereIn('parent',$categories)->paginate(15);
        return static::getNewsListView($childPages, true);
    }


    public static function getPageListView($listPages, $tree = false, $level = 1, $cat_url = '')
    {
        $listPages = is_array($listPages) ? collect($listPages) : $listPages;

        if (!$listPages->isEmpty()) {
            $pages_li = '';
            foreach ($listPages as $page) {

                if (config('coaster::admin.advanced_permissions') && !Auth::action('pages', ['page_id' => $page->id])) {
                    continue;
                }

                $permissions = [];
                $permissions['add'] = Auth::action('pages.add', ['page_id' => $page->id]) && $page->parent != -1;
                $permissions['edit'] = Auth::action('pages.edit', ['page_id' => $page->id]);
                $permissions['delete'] = Auth::action('pages.delete', ['page_id' => $page->id]);
                $permissions['group'] = Auth::action('groups.pages', ['page_id' => $page->id]);
                $permissions['galleries'] = Auth::action('gallery.edit', ['page_id' => $page->id]);
                $permissions['forms'] = Auth::action('forms.submissions', ['page_id' => $page->id]);
                $permissions['blog'] = Auth::action('system.wp_login');

                $page_lang = $page->title;

                $li_info = new \stdClass;
                $li_info->leaf = '';
                $li_info->altName = '';
                $li_info->type = 'type_normal';
                $pages_li .= View::make('admin.partials.pages.li', array('page' => $page, 'page_lang' => $page_lang, 'li_info' => $li_info, 'permissions' => $permissions))->render();
            }
            return View::make('admin.partials.pages.ol', array('pages_li' => $pages_li, 'level' => $level))->render();
        }
        return null;
    }


    public static function getArticleListView($listPages, $tree = false, $level = 1, $cat_url = '')
    {
        $listPages = is_array($listPages) ? collect($listPages) : $listPages;

        if (!$listPages->isEmpty()) {
            $pages_li = '';
            foreach ($listPages as $page) {

                if (config('coaster::admin.advanced_permissions') && !Auth::action('pages', ['page_id' => $page->id])) {
                    continue;
                }

                $permissions = [];
                $permissions['add'] = Auth::action('pages.add', ['page_id' => $page->id]) && $page->parent != -1;
                $permissions['edit'] = Auth::action('pages.edit', ['page_id' => $page->id]);
                $permissions['delete'] = Auth::action('pages.delete', ['page_id' => $page->id]);
                $permissions['group'] = Auth::action('groups.pages', ['page_id' => $page->id]);
                $permissions['galleries'] = Auth::action('gallery.edit', ['page_id' => $page->id]);
                $permissions['forms'] = Auth::action('forms.submissions', ['page_id' => $page->id]);
                $permissions['blog'] = Auth::action('system.wp_login');

                $page_lang = $page->title;

                $li_info = new \stdClass;
                $li_info->leaf = '';
                $li_info->altName = '';
                $li_info->type = 'type_normal';

                $pages_li .= View::make('admin.partials.articles.li', array('page' => $page, 'page_lang' => $page_lang, 'li_info' => $li_info, 'permissions' => $permissions))->render();
            }
            return View::make('admin.partials.pages.ol', array('pages_li' => $pages_li, 'level' => $level))->render();
        }
        return null;
    }

    public static function getNewsListView($listPages, $tree = false, $level = 1, $cat_url = '')
    {
        $listPages = is_array($listPages) ? collect($listPages) : $listPages;

        if (!$listPages->isEmpty()) {
            $pages_li = '';
            foreach ($listPages as $page) {

                if (config('coaster::admin.advanced_permissions') && !Auth::action('pages', ['page_id' => $page->id])) {
                    continue;
                }

                $permissions = [];
                $permissions['add'] = Auth::action('pages.add', ['page_id' => $page->id]) && $page->parent != -1;
                $permissions['edit'] = Auth::action('pages.edit', ['page_id' => $page->id]);
                $permissions['delete'] = Auth::action('pages.delete', ['page_id' => $page->id]);
                $permissions['group'] = Auth::action('groups.pages', ['page_id' => $page->id]);
                $permissions['galleries'] = Auth::action('gallery.edit', ['page_id' => $page->id]);
                $permissions['forms'] = Auth::action('forms.submissions', ['page_id' => $page->id]);
                $permissions['blog'] = Auth::action('system.wp_login');

                $page_lang = $page->title;

                $li_info = new \stdClass;
                $li_info->leaf = '';
                $li_info->altName = '';
                $li_info->type = 'type_normal';

                $pages_li .= View::make('admin.partials.news.li', array('page' => $page, 'page_lang' => $page_lang, 'li_info' => $li_info, 'permissions' => $permissions))->render();
            }
            return View::make('admin.partials.news.ol', array('pages_li' => $pages_li, 'level' => $level))->render();
        }
        return null;
    }

    public static function getJournalFrontierListView($listPages, $tree = false, $level = 1, $cat_url = '')
    {
        $listPages = is_array($listPages) ? collect($listPages) : $listPages;

        if (!$listPages->isEmpty()) {
            $pages_li = '';
            foreach ($listPages as $page) {

                if (config('coaster::admin.advanced_permissions') && !Auth::action('pages', ['page_id' => $page->id])) {
                    continue;
                }

                $permissions = [];
                $permissions['add'] = Auth::action('pages.add', ['page_id' => $page->id]) && $page->parent != -1;
                $permissions['edit'] = Auth::action('pages.edit', ['page_id' => $page->id]);
                $permissions['delete'] = Auth::action('pages.delete', ['page_id' => $page->id]);
                $permissions['group'] = Auth::action('groups.pages', ['page_id' => $page->id]);
                $permissions['galleries'] = Auth::action('gallery.edit', ['page_id' => $page->id]);
                $permissions['forms'] = Auth::action('forms.submissions', ['page_id' => $page->id]);
                $permissions['blog'] = Auth::action('system.wp_login');

                $page_lang = $page->title;

                $li_info = new \stdClass;
                $li_info->leaf = '';
                $li_info->altName = '';
                $li_info->type = 'type_normal';

                $pages_li .= View::make('admin.partials.journal.li', array('page' => $page, 'page_lang' => $page_lang, 'li_info' => $li_info, 'permissions' => $permissions))->render();
            }
            return View::make('admin.partials.journal.ol', array('pages_li' => $pages_li, 'level' => $level))->render();
        }
        return null;
    }

    public static function getPrintFrontierListView($listPages, $tree = false, $level = 1, $cat_url = '')
    {
        $listPages = is_array($listPages) ? collect($listPages) : $listPages;

        if (!$listPages->isEmpty()) {
            $pages_li = '';
            foreach ($listPages as $page) {

                if (config('coaster::admin.advanced_permissions') && !Auth::action('pages', ['page_id' => $page->id])) {
                    continue;
                }

                $permissions = [];
                $permissions['add'] = Auth::action('pages.add', ['page_id' => $page->id]) && $page->parent != -1;
                $permissions['edit'] = Auth::action('pages.edit', ['page_id' => $page->id]);
                $permissions['delete'] = Auth::action('pages.delete', ['page_id' => $page->id]);
                $permissions['group'] = Auth::action('groups.pages', ['page_id' => $page->id]);
                $permissions['galleries'] = Auth::action('gallery.edit', ['page_id' => $page->id]);
                $permissions['forms'] = Auth::action('forms.submissions', ['page_id' => $page->id]);
                $permissions['blog'] = Auth::action('system.wp_login');

                $page_lang = $page->title;

                $li_info = new \stdClass;
                $li_info->leaf = '';
                $li_info->altName = '';
                $li_info->type = 'type_normal';

                $pages_li .= View::make('admin.partials.print.li', array('page' => $page, 'page_lang' => $page_lang, 'li_info' => $li_info, 'permissions' => $permissions))->render();
            }
            return View::make('admin.partials.print.ol', array('pages_li' => $pages_li, 'level' => $level))->render();
        }
        return null;
    }

    public static function getNewsCategoryListView($listPages, $tree = false, $level = 1, $cat_url = '')
    {
        $listPages = is_array($listPages) ? collect($listPages) : $listPages;

        if (!$listPages->isEmpty()) {
            $pages_li = '';
            foreach ($listPages as $page) {

                if (config('coaster::admin.advanced_permissions') && !Auth::action('pages', ['page_id' => $page->id])) {
                    continue;
                }

                $permissions = [];
                $permissions['add'] = Auth::action('pages.add', ['page_id' => $page->id]) && $page->parent != -1;
                $permissions['edit'] = Auth::action('pages.edit', ['page_id' => $page->id]);
                $permissions['delete'] = Auth::action('pages.delete', ['page_id' => $page->id]);
                $permissions['group'] = Auth::action('groups.pages', ['page_id' => $page->id]);
                $permissions['galleries'] = Auth::action('gallery.edit', ['page_id' => $page->id]);
                $permissions['forms'] = Auth::action('forms.submissions', ['page_id' => $page->id]);
                $permissions['blog'] = Auth::action('system.wp_login');

                $page_lang = $page->title;

                $li_info = new \stdClass;
                $li_info->leaf = '';
                $li_info->altName = '';
                $li_info->type = 'type_normal';

                $pages_li .= View::make('admin.partials.news_category.li', array('page' => $page, 'page_lang' => $page_lang, 'li_info' => $li_info, 'permissions' => $permissions))->render();
            }
            return View::make('admin.partials.news_category.ol', array('pages_li' => $pages_li, 'level' => $level))->render();
        }
        return null;
    }

    public function tabInfoCategory()
    {
        $contents = '';

        $publishingOn = config('coaster::admin.publishing') > 0;


        $canPublish = ($publishingOn && Auth::action('pages.version-publish', ['page_id' => $this->id])) || !$publishingOn;

        // page parent (only updated for new pages)
        if (!$this->id) {
            $parentPages = [Page::TYPE_PAPER => '-- 论文 --',117=>'-- 应用文 --',118=>'-- 资源下载 --'];
            if (!array_key_exists($this->parent, $parentPages)) {
                $this->parent = -1;
            }
        } else {
            $parentPages = null;
        }
        // beacons selection (only updated for existing pages)
        if ($this->id && Auth::action('themes.beacons-update')) {
            $beaconSelect = BlockBeacon::getDropdownOptions($this->id);
            $beaconSelect = empty($beaconSelect->options) ? null : $beaconSelect;
        } else {
            $beaconSelect = null;
        }

        // page name, url
        $pageLang = $this->id ? PageLang::where('page_id', '=', $this->id)->where('language_id', '=', Language::current())->first() : new PageLang;
        $fullUrls = [-1 => '?', 0 => '/'];

        foreach (Path::all() as $pageId => $details) {
            $fullUrls[$pageId] = rtrim($details->fullUrl, '/') . '/';
        }

        $urlPrefixes = $this->parentPathIds();
        foreach ($urlPrefixes as $pageId => $urlPrefix) {
            if (!key_exists($pageId, $fullUrls)) {
                $fullUrls[$pageId] = '?';
            }
        }
        $contents .= View::make('admin.page_info.page_info', ['page' => $this, 'page_lang' => $pageLang, 'parentPages' => $parentPages, 'beacon_select' => $beaconSelect, 'urlArray' => $fullUrls, 'urlPrefixes' => $urlPrefixes, 'publishing_on' => $publishingOn, 'can_publish' => $canPublish])->render();

        return ['论文分类', $contents];
    }


    public function tabInfoArticle()
    {
        $contents = '';

        $publishingOn = config('coaster::admin.publishing') > 0;


        $canPublish = ($publishingOn && Auth::action('pages.version-publish', ['page_id' => $this->id])) || !$publishingOn;

        // page parent (only updated for new pages)
        if (!$this->id) {
            $parentPages = static::get_paper_list(['links' => false, 'exclude_home' => true, 'group_pages' => false]);
            if (!array_key_exists($this->parent, $parentPages)) {
                $this->parent = -1;
            }
        } else {
            $parentPages = null;
        }

        // beacons selection (only updated for existing pages)
        if ($this->id && Auth::action('themes.beacons-update')) {
            $beaconSelect = BlockBeacon::getDropdownOptions($this->id);
            $beaconSelect = empty($beaconSelect->options) ? null : $beaconSelect;
        } else {
            $beaconSelect = null;
        }
        // page name, url
        $pageLang = $this->id ? PageLang::where('page_id', '=', $this->id)->where('language_id', '=', Language::current())->first() : new PageLang;
        $fullUrls = [-1 => '?', 0 => '/'];

        foreach (Path::all() as $pageId => $details) {
            $fullUrls[$pageId] = rtrim($details->fullUrl, '/') . '/';
        }
        $urlPrefixes = $this->parentPathIds();
        foreach ($urlPrefixes as $pageId => $urlPrefix) {
            if (!key_exists($pageId, $fullUrls)) {
                $fullUrls[$pageId] = '?';
            }
        }

        $contents .= View::make('admin.page_info.article_info', ['page' => $this, 'page_lang' => $pageLang, 'parentPages' => $parentPages, 'beacon_select' => $beaconSelect, 'urlArray' => $fullUrls, 'urlPrefixes' => $urlPrefixes, 'publishing_on' => $publishingOn, 'can_publish' => $canPublish])->render();
        return ['文章', $contents];
    }

    public function tabInfoJournal()
    {
        $contents = '';

        $publishingOn = config('coaster::admin.publishing') > 0;


        $canPublish = ($publishingOn && Auth::action('pages.version-publish', ['page_id' => $this->id])) || !$publishingOn;

        // page parent (only updated for new pages)
        if (!$this->id) {
            $parentPages = static::get_journal_list(['links' => false, 'exclude_home' => true, 'group_pages' => false]);
            if (!array_key_exists($this->parent, $parentPages)) {
                $this->parent = -1;
            }
        } else {
            $parentPages = null;
        }

        // beacons selection (only updated for existing pages)
        if ($this->id && Auth::action('themes.beacons-update')) {
            $beaconSelect = BlockBeacon::getDropdownOptions($this->id);
            $beaconSelect = empty($beaconSelect->options) ? null : $beaconSelect;
        } else {
            $beaconSelect = null;
        }
        // page name, url
        $pageLang = $this->id ? PageLang::where('page_id', '=', $this->id)->where('language_id', '=', Language::current())->first() : new PageLang;
        $fullUrls = [-1 => '?', 0 => '/'];

        foreach (Path::all() as $pageId => $details) {
            $fullUrls[$pageId] = rtrim($details->fullUrl, '/') . '/';
        }
        $urlPrefixes = $this->parentPathIds();
        foreach ($urlPrefixes as $pageId => $urlPrefix) {
            if (!key_exists($pageId, $fullUrls)) {
                $fullUrls[$pageId] = '?';
            }
        }

        $contents .= View::make('admin.page_info.journal_info', ['page' => $this, 'page_lang' => $pageLang, 'parentPages' => $parentPages, 'beacon_select' => $beaconSelect, 'urlArray' => $fullUrls, 'urlPrefixes' => $urlPrefixes, 'publishing_on' => $publishingOn, 'can_publish' => $canPublish])->render();
        return ['文章', $contents];
    }

    public function tabInfoPrint()
    {
        $contents = '';

        $publishingOn = config('coaster::admin.publishing') > 0;


        $canPublish = ($publishingOn && Auth::action('pages.version-publish', ['page_id' => $this->id])) || !$publishingOn;

        // page parent (only updated for new pages)
        if (!$this->id) {
            $parentPages = static::get_print_list(['links' => false, 'exclude_home' => true, 'group_pages' => false]);
            if (!array_key_exists($this->parent, $parentPages)) {
                $this->parent = -1;
            }
        } else {
            $parentPages = null;
        }

        // beacons selection (only updated for existing pages)
        if ($this->id && Auth::action('themes.beacons-update')) {
            $beaconSelect = BlockBeacon::getDropdownOptions($this->id);
            $beaconSelect = empty($beaconSelect->options) ? null : $beaconSelect;
        } else {
            $beaconSelect = null;
        }
        // page name, url
        $pageLang = $this->id ? PageLang::where('page_id', '=', $this->id)->where('language_id', '=', Language::current())->first() : new PageLang;
        $fullUrls = [-1 => '?', 0 => '/'];

        foreach (Path::all() as $pageId => $details) {
            $fullUrls[$pageId] = rtrim($details->fullUrl, '/') . '/';
        }
        $urlPrefixes = $this->parentPathIds();
        foreach ($urlPrefixes as $pageId => $urlPrefix) {
            if (!key_exists($pageId, $fullUrls)) {
                $fullUrls[$pageId] = '?';
            }
        }

        $contents .= View::make('admin.page_info.print_info', ['page' => $this, 'page_lang' => $pageLang, 'parentPages' => $parentPages, 'beacon_select' => $beaconSelect, 'urlArray' => $fullUrls, 'urlPrefixes' => $urlPrefixes, 'publishing_on' => $publishingOn, 'can_publish' => $canPublish])->render();
        return ['文章', $contents];
    }
    public function tabInfoNewsCategory()
    {
        $contents = '';

        $publishingOn = config('coaster::admin.publishing') > 0;


        $canPublish = ($publishingOn && Auth::action('pages.version-publish', ['page_id' => $this->id])) || !$publishingOn;

        // page parent (only updated for new pages)
        if (!$this->id) {
            $parentPages = [100=>'期刊快报'];
            if (!array_key_exists($this->parent, $parentPages)) {
                $this->parent = -1;
            }
        } else {
            $parentPages = null;
        }

        // beacons selection (only updated for existing pages)
        if ($this->id && Auth::action('themes.beacons-update')) {
            $beaconSelect = BlockBeacon::getDropdownOptions($this->id);
            $beaconSelect = empty($beaconSelect->options) ? null : $beaconSelect;
        } else {
            $beaconSelect = null;
        }
        // page name, url
        $pageLang = $this->id ? PageLang::where('page_id', '=', $this->id)->where('language_id', '=', Language::current())->first() : new PageLang;
        $fullUrls = [-1 => '?', 0 => '/'];

        foreach (Path::all() as $pageId => $details) {
            $fullUrls[$pageId] = rtrim($details->fullUrl, '/') . '/';
        }
        $urlPrefixes = $this->parentPathIds();
        foreach ($urlPrefixes as $pageId => $urlPrefix) {
            if (!key_exists($pageId, $fullUrls)) {
                $fullUrls[$pageId] = '?';
            }
        }

        $contents .= View::make('admin.page_info.news_category_info', ['page' => $this, 'page_lang' => $pageLang, 'parentPages' => $parentPages, 'beacon_select' => $beaconSelect, 'urlArray' => $fullUrls, 'urlPrefixes' => $urlPrefixes, 'publishing_on' => $publishingOn, 'can_publish' => $canPublish])->render();
        return ['分类', $contents];
    }


    public function tabInfoNews()
    {
        $contents = '';

        $publishingOn = config('coaster::admin.publishing') > 0;


        $canPublish = ($publishingOn && Auth::action('pages.version-publish', ['page_id' => $this->id])) || !$publishingOn;

        // page parent (only updated for new pages)
        if (!$this->id) {
            $parentPages = static::get_news_list(['links' => false, 'exclude_home' => true, 'group_pages' => false]);
            if (!array_key_exists($this->parent, $parentPages)) {
                $this->parent = -1;
            }
        } else {
            $parentPages = null;
        }

        // beacons selection (only updated for existing pages)
        if ($this->id && Auth::action('themes.beacons-update')) {
            $beaconSelect = BlockBeacon::getDropdownOptions($this->id);
            $beaconSelect = empty($beaconSelect->options) ? null : $beaconSelect;
        } else {
            $beaconSelect = null;
        }
        // page name, url
        $pageLang = $this->id ? PageLang::where('page_id', '=', $this->id)->where('language_id', '=', Language::current())->first() : new PageLang;
        $fullUrls = [-1 => '?', 0 => '/'];

        foreach (Path::all() as $pageId => $details) {
            $fullUrls[$pageId] = rtrim($details->fullUrl, '/') . '/';
        }
        $urlPrefixes = $this->parentPathIds();
        foreach ($urlPrefixes as $pageId => $urlPrefix) {
            if (!key_exists($pageId, $fullUrls)) {
                $fullUrls[$pageId] = '?';
            }
        }

        $contents .= View::make('admin.page_info.news_category_info', ['page' => $this, 'page_lang' => $pageLang, 'parentPages' => $parentPages, 'beacon_select' => $beaconSelect, 'urlArray' => $fullUrls, 'urlPrefixes' => $urlPrefixes, 'publishing_on' => $publishingOn, 'can_publish' => $canPublish])->render();
        return ['文章', $contents];
    }


    public function getFaceUrlAttribute()
    {
        $blocks = Block::where('name','content_image')->first();
        if($blocks){
            $page_block = PageBlock::where('block_id',$blocks->id)->where('page_id',$this->id)->orderByDesc('version')->first();
            if($page_block){
                $picture= explode('"',$page_block->content);
                return $picture[5];
            }
        }
        return '';
    }


    public function getTitleAttribute()
    {
        $lang = PageLang::where('page_id',$this->id)->first();
        if($lang){
            return $lang->name;
        }
        return '';
    }


    public function getAuthorAttribute()
    {
        $blocks = Block::where('name','meta_title')->first();
        if($blocks){
            $page_block = PageBlock::where('block_id',$blocks->id)->where('page_id',$this->id)->orderByDesc('version')->first();
            if($page_block){
                return $page_block->content;
            }
        }
        return '';
    }

    public function getDescriptionAttribute()
    {
        $blocks = Block::where('name','meta_description')->first();
        if($blocks){
            $page_block = PageBlock::where('block_id',$blocks->id)->where('page_id',$this->id)->orderByDesc('version')->first();
            if($page_block){
                return $page_block->content;
            }
        }
        return '';
    }

    public function getKeyWordsAttribute()
    {
        $blocks = Block::where('name','meta_keywords')->first();
        if($blocks){
            $page_block = PageBlock::where('block_id',$blocks->id)->where('page_id',$this->id)->orderByDesc('version')->first();
            if($page_block){
                return $page_block->content;
            }
        }
        return '';
    }


    public function getContentAttribute()
    {
        $blocks = Block::where('name','content')->first();
        if($blocks){
            $page_block = PageBlock::where('block_id',$blocks->id)->where('page_id',$this->id)->orderByDesc('version')->first();
            if($page_block){
                return $page_block->content;
            }
        }
        return '';
    }
    public static function PageParent($page){
        $parent = Page::find($page->parent);
        if($parent){
            if($parent->page_langs->first()){
                return $parent->page_langs->first()->name;
            }
        }
        return '暂无';
    }

    public function getCompetentAttribute()
    {
        $lang = PageLang::where('page_id',$this->id)->first();
        if($lang){
            return $lang->competent;
        }
        return '';
    }

    public function getEtitleAttribute()
    {
        $lang = PageLang::where('page_id',$this->id)->first();
        if($lang){
            return $lang->e_title;
        }
        return '';
    }

    public function getUnitAttribute()
    {
        $lang = PageLang::where('page_id',$this->id)->first();
        if($lang){
            return $lang->unit;
        }
        return '';
    }
    public function getIssnAttribute()
    {
        $lang = PageLang::where('page_id',$this->id)->first();
        if($lang){
            return $lang->issn;
        }
        return '';
    }

    public function getIssueAttribute()
    {
        $lang = PageLang::where('page_id',$this->id)->first();
        if($lang){
            return $lang->issue;
        }
        return '';
    }

    public function getPressAttribute()
    {
        $lang = PageLang::where('page_id',$this->id)->first();
        if($lang){
            return $lang->press;
        }
        return '';
    }

    public function getNumAttribute()
    {
        $lang = PageLang::where('page_id',$this->id)->first();
        if($lang){
            return $lang->num;
        }
        return '';
    }

    public function getPublishDateAttribute()
    {
        $lang = PageLang::where('page_id',$this->id)->first();
        if($lang){
            return $lang->start_publish_date;
        }
        return '';
    }

    public function getCycleAttribute()
    {
        $lang = PageLang::where('page_id',$this->id)->first();
        if($lang){
            return $lang->cycle;
        }
        return '';
    }


    public static function webSearch($q,$type)
    {
        if($type == 1){
            $where = [];
            $page = self::find(self::TYPE_PAPER);
            if($page){
                $where =self::where('parent',$page->id)->where('template',self::TEMPLATE_ARTICLE_CATEGORY)->get(['id']);
            }
            return static::join('page_lang', 'page_lang.page_id', '=', 'pages.id')
                ->where('page_lang.language_id', '=', Language::current())->where('link', '=', 0)
                ->where('page_lang.name', 'like', '%'.$q.'%')
                ->where('template', self::TEMPLATE_ARTICLE)
                ->whereIn('parent', $where)
                ->get(['pages.*']);

        }elseif($type == 2){
            $page = self::find(self::TYPE_PAPER);
            if($page){
                return static::join('page_lang', 'page_lang.page_id', '=', 'pages.id')
                    ->where('page_lang.language_id', '=', Language::current())->where('link', '=', 0)
                    ->where('page_lang.name', 'like', '%'.$q.'%')
                    ->where('template', self::TEMPLATE_ARTICLE_CATEGORY)
                    ->where('parent', $page->id)
                    ->get(['pages.*']);
            }
        }elseif($type == 3){
            $ids = [
                119,102,106
            ];
            if($ids){
                return static::join('page_lang', 'page_lang.page_id', '=', 'pages.id')
                    ->where('page_lang.language_id', '=', Language::current())->where('link', '=', 0)
                    ->where('page_lang.name', 'like', '%'.$q.'%')
                    ->where('template', self::TEMPLATE_ARTICLE)
                    ->whereIn('parent',$ids)
                    ->get(['pages.*']);
            }
        }elseif($type == 4){
            $page = self::find(self::TYPE_JOURNAL_NEWS);
            if($page){
                return static::join('page_lang', 'page_lang.page_id', '=', 'pages.id')
                    ->where('page_lang.language_id', '=', Language::current())->where('link', '=', 0)
                    ->where('page_lang.name', 'like', '%'.$q.'%')
                    ->where('template', self::TEMPLATE_ARTICLE_CATEGORY)
                    ->where('parent', $page->id)
                    ->get(['pages.*']);
            }
        }elseif($type == 5){
            $where = [];
            $page = self::find(self::TYPE_JOURNAL_NEWS);
            if($page){
                $where =self::where('parent',$page->id)->where('template',self::TEMPLATE_ARTICLE_CATEGORY)->get(['id']);
            }
            return static::join('page_lang', 'page_lang.page_id', '=', 'pages.id')
                ->where('page_lang.language_id', '=', Language::current())->where('link', '=', 0)
                ->where('page_lang.name', 'like', '%'.$q.'%')
                ->where('template', self::TEMPLATE_ARTICLE)
                ->whereIn('parent', $where)
                ->get(['pages.*']);

        }elseif($type == 6){
            $ids = [
                120
            ];
            if($ids){
                return static::join('page_lang', 'page_lang.page_id', '=', 'pages.id')
                    ->where('page_lang.language_id', '=', Language::current())->where('link', '=', 0)
                    ->where('page_lang.name', 'like', '%'.$q.'%')
                    ->where('template', self::TEMPLATE_ARTICLE)
                    ->whereIn('parent',$ids)
                    ->get(['pages.*']);
            }

        }
        return static::join('page_lang', 'page_lang.page_id', '=', 'pages.id')
            ->where('page_lang.language_id', '=', Language::current())->where('link', '=', 0)
            ->where('page_lang.name', 'like', '%'.$q.'%')
            ->get(['pages.*']);
    }



}
