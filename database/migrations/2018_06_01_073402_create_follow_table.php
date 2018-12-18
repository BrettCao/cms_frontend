<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFollowTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('followup', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->default(0);//点赞人
            $table->Morphs('followupable');          //多态
            $table->string('usage')->default('');   //用途标识
            $table->integer('type')->default(0);   //0 点赞 1取消点赞
            $table->integer('status')->default(0);
            $table->text('extra_data')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();
            $table->softDeletes();


            $table->index('id');
            $table->index('usage');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('follow');
    }
}
