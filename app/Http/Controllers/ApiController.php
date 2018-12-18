<?php

namespace BaseCms\Http\Controllers;


use Auth;
use CoasterCms\Http\Controllers\AdminController as Controller;
use CoasterCms\Models\AdminLog;
use CoasterCms\Models\Backup;
use Illuminate\Http\Request;
use CoasterCms\Models\Page;
use CoasterCms\Models\PageBlock;
use CoasterCms\Models\PageGroup;
use CoasterCms\Models\PageGroupPage;
use CoasterCms\Models\PageLang;
use CoasterCms\Models\Language;

class ApiController extends Controller
{
    function search(Request $request)
    {
        $q = $request->get('q');
        $type = $request->get('type',0);
        if(!$type){
            $searchEntity = $request->get('search_entity');
            $searchres = $searchEntity::adminSearch($q);
        }else{
            $searchres = \BaseCms\Models\Page::webSearch($q,$type);
        }

        if ($searchres->count() == 0)
        {
            return '<p>搜索不到任何内容</p>';
        }
        if($type == 1){
            return \BaseCms\Models\Page::getArticleListView($searchres);
        }elseif($type == 2){
            return \BaseCms\Models\Page::getPageListView($searchres);
        }elseif($type == 3){
            return \BaseCms\Models\Page::getJournalFrontierListView($searchres);
        }elseif($type == 4){
            return \BaseCms\Models\Page::getNewsCategoryListView($searchres);
        }elseif($type == 5){
            return \BaseCms\Models\Page::getNewsListView($searchres);
        }elseif($type == 6){
            return \BaseCms\Models\Page::getPrintFrontierListView($searchres);
        }else{
            return Page::getPageListView($searchres);
        }
    }
}
