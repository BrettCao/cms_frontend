<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
//Route::group(['middleware' => ['auth']],function (){
//    Route::get('index', ['uses' => 'IndexController@index', 'as' => 'index']);
//});
Route::post('/api/login', ['uses' => 'IndexController@login', 'as' => 'login']);
Route::get('/api/hot_journal', ['uses' => 'IndexController@hot_journal', 'as' => 'hot_journal']);//热门期刊
Route::get('/api/show/{uuid?}', ['uses' => 'IndexController@show', 'as' => 'show']);//热门期刊
Route::get('/api/journal_search', ['uses' => 'IndexController@journal_search', 'as' => 'journal_search']);//期刊搜索
Route::get('/api/choose', ['uses' => 'IndexController@choose', 'as' => 'choose']);//期刊列表sort 0 按照时间排序  1按照复合因子
Route::get('/api/journal_type_list', ['uses' => 'IndexController@journal_type_list', 'as' => 'journal_type_list']);//期刊分类
Route::get('/api/journal_list', ['uses' => 'IndexController@journal_list', 'as' => 'journal_list']);//首页期刊

Route::get('paper_hot', ['uses' => 'IndexController@paper_hot', 'as' => 'paper_hot']);//热门论文了列表页面
Route::get('/api/media_detail', ['uses' => 'IndexController@media_detail', 'as' => 'media_detail']);//其他纸媒详情
Route::get('paper_hot', ['uses' => 'IndexController@paper_hot', 'as' => 'paper_hot']);//热门论文
Route::get('/api/article_detail', ['uses' => 'IndexController@article_detail', 'as' => 'article_detail']);//其他文章单页详情
Route::get('/api/paper_detail', ['uses' => 'IndexController@paper_detail', 'as' => 'paper_detail']);//论文单页详情
Route::get('/api/media_list', ['uses' => 'IndexController@media_list', 'as' => 'media_list']);//  其他纸媒列表type 1期刊  2是报纸sort排序  1按浏览量  0常规publish_date 发布时间publish_cycle 出版周期

Route::get('/api/book_list', ['uses' => 'IndexController@book_list', 'as' => 'book_list']);//出书列表接口  type 1出书 2线上媒体 sort 1按照浏览量 2按时间 page分页

Route::get('/api/ajax_paper_type', ['uses' => 'IndexController@ajax_paper_type', 'as' => 'ajax_paper_type']);//首页论文 应用文  资源下载 分类type  1论文  2应用文  3资源下载

Route::get('/api/ajax_paper', ['uses' => 'IndexController@ajax_paper', 'as' => 'ajax_paper']);//根据论文分类  或是  应用文分类  或是 资源下载分类 返回文章题目和id

Route::get('/api/ajax_media', ['uses' => 'IndexController@ajax_media', 'as' => 'ajax_media']);//type  1 专注出书 2线上媒体  3  纸质媒体的期刊  4 纸质媒体的报纸

Route::get('/api/paper_list', ['uses' => 'IndexController@paper_list', 'as' => 'paper_list']);//type 1论文  2应用文  3资源下载 sort  1按浏览量  0常规 page分页 id是分类id

Route::post('/api/update_info', ['uses' => 'IndexController@update_info', 'as' => 'update_info']);//保存修改信息
Route::get('/api/get_info', ['uses' => 'IndexController@get_info', 'as' => 'get_info']);//会员信息

Route::get('/api/register', ['uses' => 'IndexController@register', 'as' => 'register']);//注册
Route::get('/api/validate_mobile', ['uses' => 'IndexController@validate_mobile', 'as' => 'validate_mobile']);//验证手机号
Route::get('/api/validate_name', ['uses' => 'IndexController@validate_name', 'as' => 'validate_name']);//验证昵称


Route::get('/api/is_login', ['uses' => 'IndexController@is_login', 'as' => 'is_login']);//判断登陆


Route::get('/api/search', ['uses' => 'IndexController@search', 'as' => 'search']);//   0期刊 1出书  2其他纸媒 3线上媒体 4论文范文 5应用文  6资源下载 搜索接口

Route::get('/api/notification_list', ['uses' => 'IndexController@notification_list', 'as' => 'notification_list']);// 消息列表
Route::get('/api/ajax_notifiaction', ['uses' => 'IndexController@ajax_notifiaction', 'as' => 'ajax_notifiaction']);// 小铃铛的消息
Route::get('/api/follow', ['uses' => 'IndexController@follow', 'as' => 'follow']);// 关注

Route::get('/api/my_topic', ['uses' => 'IndexController@my_topic', 'as' => 'my_topic']);// 个人中心的话题   我的话题  type 1 我关注的话题 type 0其他的两个没有了  她忘记去掉了吧
Route::post('/api/update_logo', ['uses' => 'IndexController@update_logo', 'as' => 'update_logo']);// 上传头像
Route::delete('/api/delete_topic', ['uses' => 'IndexController@delete_topic', 'as' => 'delete_topic']);// 删除话题

Route::get('/api/ajax_logo', ['uses' => 'IndexController@ajax_logo', 'as' => 'ajax_logo']);// 回复话题  发表话题数目 用户头像
Route::post('/api/store_topic', ['uses' => 'IndexController@stroe_topic', 'as' => 'stroe_topic']);//添加话题

Route::post('/api/comment_topic', ['uses' => 'IndexController@comment_topic', 'as' => 'comment_topic']);//回复话题

Route::post('/api/comment_reply', ['uses' => 'IndexController@comment_reply', 'as' => 'comment_reply']);//回复评论

Route::get('/api/topic_list', ['uses' => 'IndexController@topic_list', 'as' => 'topic_list']);//话题列表

Route::get('/api/topic_detail', ['uses' => 'IndexController@topic_detail', 'as' => 'topic_detail']);//话题详情

Route::get('/api/hot_topic', ['uses' => 'IndexController@hot_topic', 'as' => 'hot_topic']);//热门话题
Route::get('/api/comment_list', ['uses' => 'IndexController@comment_list', 'as' => 'comment_list']);//评论回复的列表
Route::get('/api/search_topic', ['uses' => 'IndexController@search_topic', 'as' => 'search_topic']);// 搜索页面  title
Route::get('/api/topic_comment', ['uses' => 'IndexController@topic_comment', 'as' => 'topic_comment']);// 第一条回复


Route::get('/api/question_list', ['uses' => 'IndexController@question_list', 'as' => 'question_list']);// 发表常识列表

Route::get('/api/store_plan', ['uses' => 'IndexController@store_plan', 'as' => 'store_plan']);// 发表计划添加

