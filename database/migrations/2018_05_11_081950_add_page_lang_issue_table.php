<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddPageLangIssueTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('page_lang', function ($table) {
            $table->string('e_title')->default('')->nallable();
            $table->string('competent')->default('')->nallable();
            $table->string('unit')->default('')->nallable();
            $table->string('issn')->default('')->nallable();
            $table->string('issue')->default('')->nallable();
            $table->string('press')->default('')->nallable();
            $table->string('num')->default('')->nallable();
            $table->string('cycle')->default('')->nallable();
            $table->string('start_publish_date')->default('')->nallable();
        });
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
