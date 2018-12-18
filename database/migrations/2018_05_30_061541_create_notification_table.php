<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNotificationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notification', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('notificationable_id')->default(0);
            $table->string('notificationable_type')->default('');
            $table->integer('user_id')->default(0);
            $table->nullableMorphs('ratingable');
            $table->string('title')->nullable()->default('');
            $table->string('published')->default(0);
            $table->string('is_pending')->default(0);
            $table->text('content')->nullable();
            $table->integer('sort')->default(0);
            $table->integer('status')->default(0);
            $table->integer('type')->default(0);
            $table->integer('is_read')->default(0);
            $table->integer('level')->default(0);
            $table->timestamps();
            $table->text('extra_data')->nullable();

            $table->index('id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('notification');
    }
}
