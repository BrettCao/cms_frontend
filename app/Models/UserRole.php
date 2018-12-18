<?php namespace BaseCms\Models;

use Closure;
use Eloquent;

class UserRole extends \CoasterCms\Models\UserRole
{
    const SUPERUSER =1;#超管
    const ADMIN =2;#后台管理员
    const EDITOR =3;#编辑
    const ACCOUNT = 4;#后台用户
    const FRONTEND = 5;#会员
}