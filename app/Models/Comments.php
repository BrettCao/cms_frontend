<?php namespace BaseCms\Models;

use Auth;
use CoasterCms\Libraries\Traits\DataPreLoad;
use Eloquent;
use Illuminate\Database\Eloquent\Collection;
use PhpParser\Comment;

class Comments extends Eloquent
{
    protected $table = 'comments';

    const STATUS_SHOW = 0;#显示
    const STATUS_HIDDEN = 1;#影藏

    const ANONYMOUS_NO = 0;//否
    const ANONYMOUS_YES = 1;//是

    protected $dates = ['created_at','updated_at'];

    /**
     * 获得创建者
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    //关联评论
    public function owner()
    {
        return $this->morphTo('ownerable');
    }


    public function childComments()
    {
        return $this->hasMany(self::class,'parent_id');
    }

    public function parentComment()
    {
        return $this->belongsTo(self::class,'parent_id','id');
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

    public function getAnswererNumAttribute(){
        $count = Comments::where('status',self::STATUS_SHOW)->where('top_parent',$this->id)->count();
        return $count;
    }


    public function getLastAnswererAttribute(){
        $comment = Comments::where('status',self::STATUS_SHOW)->where('top_parent',$this->id)->orderByDesc('id')->first();
        return $comment;
    }



}