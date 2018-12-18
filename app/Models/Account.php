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
use Request;
use Validator;

class Account extends Eloquent{
    protected $table = 'account';


    public function user()
    {
        return $this->belongsTo(User::class);
    }

    const SEX_MAN = 1;#男
    const SEX_WOMAN = 0;#女
}