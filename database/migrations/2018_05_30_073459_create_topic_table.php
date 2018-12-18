<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTopicTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('topic', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->default(0);
            $table->string('title')->default(0);
            $table->text('content'); //评论内容
            $table->integer('sort')->default(0);          //同级排序  越大越靠前
            $table->integer('status')->default(0);
            $table->integer('type')->default(0);
            $table->integer('is_hot')->default(0);
            $table->integer('is_anonymous')->default(0);//是否匿名
            $table->text('extra_data')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('topic');
    }
}
