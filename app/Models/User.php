<?php namespace BaseCms\Models;

use Carbon\Carbon;
use CoasterCms\Facades\FormMessage;
use CoasterCms\Notifications\NewAccount;
use CoasterCms\Notifications\PasswordReset;
use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Notifications\Notifiable;
use Auth;
use Eloquent;
use Hash;
use Ramsey\Uuid\Uuid;
use Request;
use Validator;
use File;
class User extends \CoasterCms\Models\User
{
    public static function toPath()
    {
        return public_path('uploads') . '/'.Carbon::today()->timestamp.'/';
    }

    public static function relativePath(){
        return '/uploads/'.Carbon::today()->timestamp.'/';
    }

    public function account()
    {
        return $this->belongsTo(Account::class);
    }

    public static function store_logo($files)
    {
        $uuid = Uuid::uuid4()->toString();
        $array = [];
        if (!is_dir(self::toPath())) {
            mkdir(self::toPath());
        }
        $file_name=self::toPath() . $uuid .'.'. File::extension($files->getClientOriginalName());
        $res = File::move($files, $file_name);
        if ($res) {
            $array[$uuid] = $file_name;
        }
        return $array;
    }

    public static function Logo($user){
        $url = asset('uploads/user_logo.png');
        if($user->url){
            $url = asset($user->url);
        }
       return $url;
    }
}