<?php namespace BaseCms\Models;

use Auth;
use CoasterCms\Libraries\Traits\DataPreLoad;
use Eloquent;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use PhpParser\Comment;

class Follow extends Eloquent
{
    protected $table = 'followup';

    //关联模型
    public function followup()
    {
        return $this->morphTo('followupable');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public static function addFollow(Model $model)
    {
        if (Auth::check()){
            $user_id = Auth::user()->id;
            $follow=$model->followup()->whereUserId($user_id)->first();
            if($follow){
                if($follow->type==1){
                    $type=0;
                }else{
                    $type=1;
                }
                $follow->type=$type;
            }else{
                $type=1;
                $follow=new Follow();
                $follow->type=$type;
                $follow->usage = $usage??class_basename($model);
                $follow->user()->associate(Auth::user());
                $follow->followup()->associate($model);
            }
            $follow->save();
            return true;
        }
    }

    /**
     * @param Model $model
     * @return int
     * 判断XX是否已关注
     */
    public static function isFollowup(Model $model){
        $is=0;
        if(Auth::check()){
            $user_id = Auth::user()->id;
            $follow=$model->followup()->whereUserId($user_id)->first();
            if($follow){
                if($follow->type==1){
                    $is=1;
                }
            }
        }
        return $is;
    }



}