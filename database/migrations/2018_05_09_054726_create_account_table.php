<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAccountTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('account', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('user_id');
            $table->string('real_name')->nullable();
            $table->string('position')->nullable();
            $table->string('education')->nullable();
            $table->string('research')->nullable();
            $table->string('company')->nullable();
            $table->string('address')->nullable();
            $table->date('birth')->nullable();
            $table->string('id_type')->default('cnid')->nullable();
            $table->string('id_number')->nullable();
            $table->string('mobile')->nullable();
            $table->integer('sex')->default(0);
            $table->string('introduces')->nullable();
            $table->boolean('verified')->default(false);
            $table->softDeletes();
            $table->timestamps();

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
        Schema::dropIfExists('account');
    }
}
