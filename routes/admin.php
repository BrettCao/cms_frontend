<?php
/**
 * Created by PhpStorm.
 * User: brett
 * Date: 2018/4/11
 * Time: 5:44 PM
 */
    Route::get('admin/category', ['uses' => 'CategoryController@getIndex', 'as' => 'coaster.admin.category']);
    Route::get('admin/category_add/add/{pageId?}/{groupId?}', ['uses' => 'CategoryController@getAdd', 'as' => 'coaster.admin.category_add']);
    Route::post('admin/category_add/add/{pageId?}/{groupId?}', ['uses' => 'CategoryController@postAdd', 'as' => 'coaster.admin.category_add.post']);

    Route::get('admin/category/edit/{pageId}/{version?}', ['uses' => 'CategoryController@getEdit', 'as' => 'coaster.admin.category.edit'])->where(['pageId' => '\w+', 'version' => '\w+']);
    Route::post('admin/category/edit/{pageId}/{version?}', ['uses' => 'CategoryController@postEdit', 'as' => 'coaster.admin.category.edit.post']);

    Route::get('admin/category/delete/{pageId}', ['uses' => 'CategoryController@postDelete', 'as' => 'coaster.admin.category.delete']);


    Route::get('admin/article', ['uses' => 'ArticleController@getIndex', 'as' => 'coaster.admin.article']);
    Route::get('admin/article/add/{pageId?}/{groupId?}', ['uses' => 'ArticleController@getAdd', 'as' => 'coaster.admin.article.add']);
    Route::post('admin/article/add/{pageId?}/{groupId?}', ['uses' => 'ArticleController@postAdd', 'as' => 'coaster.admin.article.add.post']);
    Route::get('admin/article/edit/{pageId}/{version?}', ['uses' => 'ArticleController@getEdit', 'as' => 'coaster.admin.article.edit'])->where(['pageId' => '\w+', 'version' => '\w+']);
    Route::post('admin/article/edit/{pageId}/{version?}', ['uses' => 'ArticleController@postEdit', 'as' => 'coaster.admin.article.edit.post']);

    Route::get('admin/article/delete/{pageId}', ['uses' => 'ArticleController@postDelete', 'as' => 'coaster.admin.article.delete']);


    Route::get('admin/journal', ['uses' => 'JournalController@getIndex', 'as' => 'coaster.admin.journal']);
    Route::get('admin/journal/add/{pageId?}/{groupId?}', ['uses' => 'JournalController@getAdd', 'as' => 'coaster.admin.journal.add']);
    Route::post('admin/journal/add/{pageId?}/{groupId?}', ['uses' => 'JournalController@postAdd', 'as' => 'coaster.admin.journal.add.post']);
    Route::get('admin/journal/edit/{pageId}/{version?}', ['uses' => 'JournalController@getEdit', 'as' => 'coaster.admin.journal.edit'])->where(['pageId' => '\w+', 'version' => '\w+']);
    Route::post('admin/journal/edit/{pageId}/{version?}', ['uses' => 'JournalController@postEdit', 'as' => 'coaster.admin.journal.edit.post']);

    Route::get('admin/journal/delete/{pageId}', ['uses' => 'JournalController@postDelete', 'as' => 'coaster.admin.journal.delete']);



Route::get('admin/news_category', ['uses' => 'NewsCategoryController@getIndex', 'as' => 'coaster.admin.news_category']);
Route::get('admin/news_category/add/{pageId?}/{groupId?}', ['uses' => 'NewsCategoryController@getAdd', 'as' => 'coaster.admin.news_category.add']);
Route::post('admin/news_category/add/{pageId?}/{groupId?}', ['uses' => 'NewsCategoryController@postAdd', 'as' => 'coaster.admin.news_category.add.post']);
Route::get('admin/news_category/edit/{pageId}/{version?}', ['uses' => 'NewsCategoryController@getEdit', 'as' => 'coaster.admin.news_category.edit'])->where(['pageId' => '\w+', 'version' => '\w+']);
Route::post('admin/news_category/edit/{pageId}/{version?}', ['uses' => 'NewsCategoryController@postEdit', 'as' => 'coaster.admin.news_category.edit.post']);

Route::get('admin/news_category/delete/{pageId}', ['uses' => 'NewsCategoryController@postDelete', 'as' => 'coaster.admin.news_category.delete']);




Route::get('admin/news', ['uses' => 'NewsController@getIndex', 'as' => 'coaster.admin.news']);
Route::get('admin/news/add/{pageId?}/{groupId?}', ['uses' => 'NewsController@getAdd', 'as' => 'coaster.admin.news.add']);
Route::post('admin/news/add/{pageId?}/{groupId?}', ['uses' => 'NewsController@postAdd', 'as' => 'coaster.admin.news.add.post']);
Route::get('admin/news/edit/{pageId}/{version?}', ['uses' => 'NewsController@getEdit', 'as' => 'coaster.admin.news.edit'])->where(['pageId' => '\w+', 'version' => '\w+']);
Route::post('admin/news/edit/{pageId}/{version?}', ['uses' => 'NewsController@postEdit', 'as' => 'coaster.admin.news.edit.post']);

Route::get('admin/news/delete/{pageId}', ['uses' => 'NewsController@postDelete', 'as' => 'coaster.admin.news.delete']);


Route::get('admin/print', ['uses' => 'PrintController@getIndex', 'as' => 'coaster.admin.print']);
Route::get('admin/print/add/{pageId?}/{groupId?}', ['uses' => 'PrintController@getAdd', 'as' => 'coaster.admin.print.add']);
Route::post('admin/print/add/{pageId?}/{groupId?}', ['uses' => 'PrintController@postAdd', 'as' => 'coaster.admin.print.add.post']);
Route::get('admin/print/edit/{pageId}/{version?}', ['uses' => 'PrintController@getEdit', 'as' => 'coaster.admin.print.edit'])->where(['pageId' => '\w+', 'version' => '\w+']);
Route::post('admin/print/edit/{pageId}/{version?}', ['uses' => 'PrintController@postEdit', 'as' => 'coaster.admin.print.edit.post']);

Route::get('admin/print/delete/{pageId}', ['uses' => 'PrintController@postDelete', 'as' => 'coaster.admin.print.delete']);

Route::post('admin/api/search', ['uses' => 'ApiController@search', 'as' => 'coaster.admin.api.search']);


Route::get('admin/user', ['uses' => 'UsersController@getIndex', 'as' => 'coaster.admin.user']);
Route::get('admin/user/add/{pageId?}/{groupId?}', ['uses' => 'UsersController@getAdd', 'as' => 'coaster.admin.user.add']);
Route::post('admin/user/add/{pageId?}/{groupId?}', ['uses' => 'UsersController@postAdd', 'as' => 'coaster.admin.user.add.post']);
Route::get('admin/user/edit/{pageId}/{version?}', ['uses' => 'UsersController@getEdit', 'as' => 'coaster.admin.user.edit'])->where(['pageId' => '\w+', 'version' => '\w+']);
Route::post('admin/user/edit/{pageId}/{version?}', ['uses' => 'UsersController@postEdit', 'as' => 'coaster.admin.user.edit.post']);

Route::get('admin/user/delete/{pageId}', ['uses' => 'UsersController@postDelete', 'as' => 'coaster.admin.user.delete']);