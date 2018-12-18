<?php namespace BaseCms\Models;

use Auth;
use CoasterCms\Libraries\Traits\DataPreLoad;
use Eloquent;
use Illuminate\Database\Eloquent\Collection;

class Notification extends Eloquent
{
    protected $table = 'notification';


    protected $dates = ['created_at','updated_at'];

    /**
     * type类型
     */
    const TYPE_COMMENT_ARTICLE =1;#评论文章
    const TYPE_COMMENT_USER =6;#回复评论的人


    /**
     * is_read
     */
    const READ_NO =0;#未读
    const READ_YES =1;#已读

    const PAPER_SERVICE='order';//论文服务推送(订单服务)

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    //关联被操作的事物
    public function notification()
    {
        return $this->morphTo('notificationable');
    }


    //关联操作者
    public function rating()
    {
        return $this->morphTo('ratingable');
    }

    public static function AddNotification($type,$model){
        if(Auth()->check()){
            if($model->count()){
                $user = Auth()->user();
                $notification = new self;
                if($type == Notification::TYPE_COMMENT_ARTICLE && $user->id != $model->user_id){
                    $notification->user_id = $model->user_id;
                    $notification->rating()->associate($user);
                    $notification->notification()->associate($model);
                    $notification->title = '评论';
                    $notification->content = $user->name. '评论了你发表的'.$model->title;
                    $notification->type =$type;
                    $notification->save();
                }elseif($type == Notification::TYPE_COMMENT_USER && $user->id != $model->id) {
                    $notification->user_id = $model->user_id;
                    $notification->rating()->associate($user);
                    $notification->notification()->associate($model);
                    $notification->title = '回复';
                    $notification->content = $user->name . '回复了你的评论';
                    $notification->type = $type;
                    $notification->save();
                }
                return true;
            }
        }
        return false;
    }
}