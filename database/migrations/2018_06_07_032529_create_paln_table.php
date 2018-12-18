<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePalnTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('paln', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('name')->default(0);//点赞人
            $table->string('mobile')->default('')->nullable();
            $table->string('we_chat')->default('')->nullable();
            $table->text('content')->nullable();
            $table->integer('type')->default(0);
            $table->integer('status')->default(0);
            $table->text('extra_data')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('paln');
    }
}
