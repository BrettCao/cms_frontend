<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddSeederUserRolesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('user_roles')->where('id',1)->update(['cn_name'=>'超级管理员']);
        DB::table('user_roles')->where('id',2)->update(['cn_name'=>'管理员']);
        DB::table('user_roles')->where('id',3)->update(['cn_name'=>'编辑']);
        DB::table('user_roles')->where('id',4)->update(['cn_name'=>'后台用户（只能登陆）']);
        DB::table('user_roles')->where('id',5)->update(['cn_name'=>'普通会员']);
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
