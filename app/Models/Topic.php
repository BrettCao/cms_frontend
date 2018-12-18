<?php namespace BaseCms\Models;

use Auth;
use CoasterCms\Libraries\Traits\DataPreLoad;
use Eloquent;
use Illuminate\Database\Eloquent\Collection;

class Topic extends Eloquent
{
    protected $table = 'topic';


    protected $dates = ['created_at','updated_at'];

    const STATUS_SHOW = 0;#显示
    const STATUS_HIDDEN = 1;#影藏

    const HOT_YES = 1;//热门
    const HOT_NO = 0;//普通


    const ANONYMOUS_NO = 0;//否
    const ANONYMOUS_YES = 1;//是

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function comments()
    {
        return $this->morphMany(Comments::class,'ownerable')->orderByDesc('id');
    }

    public function followup(){
        return $this->morphMany(Follow::class,'followupable');
    }

    public function getAuthorAttribute(){
        $a = '匿名';
        if($this->is_anonymous == self::ANONYMOUS_NO){
            $user = $this->user;
            if($user){
                $a = $user->name;
            }
        }
        return $a;
    }


    public function getCommentNumAttribute(){
       $count = $this->comments()->count();
        return $count;
    }
}