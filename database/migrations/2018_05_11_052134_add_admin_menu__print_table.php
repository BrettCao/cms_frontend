<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddAdminMenuPrintTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('admin_menu')->insert([
            [
                'action_id' => 1,
                'parent' => 0,
                'order' => 1,
                'icon' => 'fa fa-file-text-o',
                'item_name' => 'Print',
                'cn_name' => '其他纸媒',
                'route_url'=>'admin/print'
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
