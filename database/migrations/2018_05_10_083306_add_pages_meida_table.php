<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddPagesMeidaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('pages')->insert([
            [
                'id'=>117,
                'template' => 2,
                'parent' => 0,
                'order' => 1,
                'group_container' => 0,
                'live'=>1,
                'sitemap'=>1,
            ],
        ]);

        DB::table('page_versions')->insert([
            [
                'page_id' => 117,
                'version_id' => 1,
                'template' => '2',
                'preview_key' =>'1l9bdazgadsa',
                'user_id'=>1
            ],
        ]);

        DB::table('page_lang')->insert([
            [
                'page_id' => 117,
                'language_id' => 1,
                'url' => '应用文',
                'name' =>'应用文',
                'live_version'=>1,
            ],
        ]);


        DB::table('pages')->insert([
            [
                'id'=>118,
                'template' => 2,
                'parent' => 0,
                'order' => 1,
                'group_container' => 0,
                'live'=>1,
                'sitemap'=>1,
            ],
        ]);

        DB::table('page_versions')->insert([
            [
                'page_id' => 118,
                'version_id' => 1,
                'template' => '2',
                'preview_key' =>'1l9uoiuggdge',
                'user_id'=>1
            ],
        ]);

        DB::table('page_lang')->insert([
            [
                'page_id' => 118,
                'language_id' => 1,
                'url' => '资源下载',
                'name' =>'资源下载',
                'live_version'=>1,
            ],
        ]);

        DB::table('pages')->insert([
            [
                'id'=>119,
                'template' => 2,
                'parent' => 0,
                'order' => 1,
                'group_container' => 0,
                'live'=>1,
                'sitemap'=>1,
            ],
        ]);

        DB::table('page_versions')->insert([
            [
                'page_id' => 119,
                'version_id' => 1,
                'template' => '2',
                'preview_key' =>'1l9uoigjasde',
                'user_id'=>1
            ],
        ]);

        DB::table('page_lang')->insert([
            [
                'page_id' => 119,
                'language_id' => 1,
                'url' => '线上媒体',
                'name' =>'线上媒体',
                'live_version'=>1,
            ],
        ]);

        DB::table('pages')->insert([
            [
                'id'=>120,
                'template' => 2,
                'parent' => 0,
                'order' => 1,
                'group_container' => 0,
                'live'=>1,
                'sitemap'=>1,
            ],
        ]);

        DB::table('page_versions')->insert([
            [
                'page_id' => 120,
                'version_id' => 1,
                'template' => '2',
                'preview_key' =>'1ldasdfasde',
                'user_id'=>1
            ],
        ]);

        DB::table('page_lang')->insert([
            [
                'page_id' => 120,
                'language_id' => 1,
                'url' => '其他纸媒',
                'name' =>'其他纸媒',
                'live_version'=>1,
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
