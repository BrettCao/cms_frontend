<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCommentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->default(0);
            $table->integer('floor')->default(0);
            $table->integer('parent_id')->default(0);
            $table->integer('top_parent')->default(0);
            $table->text('content'); //评论内容
            $table->string('ip',50)->default(0);
            $table->nullableMorphs('ownerable'); //comment所有者是什么类型
            $table->integer('sort')->default(0);          //同级排序  越大越靠前
            $table->integer('status')->default(0);
            $table->integer('type')->default(0);
            $table->text('extra_data')->nullable();
            $table->integer('is_anonymous')->default(0);//是否匿名
            $table->integer('view_num')->default(0);//浏览量
            $table->timestamps();

            $table->index('id');
            $table->index('user_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('comments');
    }
}
