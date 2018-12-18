<?php
namespace BaseCms\Http\Controllers;

use Auth;
use BaseCms\Models\Account;
use CoasterCms\Facades\FormMessage;
use CoasterCms\Http\Controllers\AdminController as Controller;
use CoasterCms\Models\AdminLog;
use CoasterCms\Models\User;
use CoasterCms\Models\UserRole;
use Hash;
use Mail;
use Request;
use Response;
use Validator;
use View;

class UsersController extends Controller
{

    public function getIndex()
    {
        $users = User::Leftjoin('user_roles', 'user_roles.id', '=', 'users.role_id')->Leftjoin('account', 'account.user_id', '=', 'users.id')->select(array('users.id', 'users.email', 'user_roles.cn_name', 'users.active', 'account.mobile', 'users.name'))->paginate(15);
        $this->layoutData['modals'] = View::make('coaster::modals.general.delete_item');
        $this->layoutData['content'] = View::make('admin.pages.users', array('users' => $users, 'can_add' => Auth::action('users.add'), 'can_delete' => Auth::action('users.delete'), 'can_edit' => Auth::action('users.edit')));
    }

    public function postEdit($userId = 0, $action = null)
    {
        $user = User::find($userId);
        $authUser = Auth::user();
        if (!empty($user) && $authUser->role->admin >= $user->role->admin) {
            switch ($action) {
                case 'password':
                    $data = [];
                    $data['user'] = $user;
                    $data['level'] = 'admin';
                    $data['form'] = View::make('admin.partials.user.forms.password', array('current_password' => ($authUser->id == $userId)));
                    $data['success'] = $user->change_password();
                    AdminLog::new_log('User \'' . $user->email . '\' updated, password changed');
                    $this->layoutData['content'] = View::make('admin.pages.password', $data);
                    break;
                case 'name':
                    $is_user = [];
                    if($user->name != Request::input('name')){
                        $is_user = User::where('name',Request::input('name'))->first();
                    }
                    if (!$is_user){
                        $user->name = Request::input('name');
                        $user->save();
                        return  redirect()->route('coaster.admin.user.edit', ['userId' => $userId]);
                    }else{
                        $this->getEdit($userId, $action,'用户名已存在');
                    }
                    break;
                case 'role':
                    $user_role = UserRole::find(Request::input('role'));
                    if (!empty($user_role) && $user_role->admin <= $authUser->role->admin) {
                        $user->role_id = Request::input('role');
                        AdminLog::new_log('User \'' . $user->email . '\' updated, role change');
                        $user->save();
                        $this->layoutData['content'] = View::make('admin.pages.user_role', array('user' => $user, 'success' => true));
                    } else {
                        $this->getEdit($userId, $action);
                    }
                    break;
                case 'account':
                    $is_account = [];
                    $account = Account::where('user_id', $authUser->id)->first();
                    if($account->mobile != Request::input('mobile')){
                        $is_account = Account::where('mobile', Request::input('mobile'))->first();
                    }
                    if (!$is_account) {
                        $account->mobile = Request::input('mobile');
                        $account->save();
                        return redirect()->route('coaster.admin.user.edit', ['userId' => $userId]);
                    }else{
                        $this->getEdit($userId, $action,'手机号已存在');
                    }
                    break;
                case 'status':
                    // stop admins disabling super admins
                    if ($authUser->id != $user->id) {
                        $v = Validator::make(Request::all(), array(
                                'set' => 'integer|min:0|max:1'
                            )
                        );
                        if ($v->passes()) {
                            $user->active = Request::input('set');
                            $user->save();
                            AdminLog::new_log('User \'' . $user->email . '\' updated, status changed');
                            return 1;
                        }
                    }
                    return 0;
                    break;
            }
        } else {
            return 'Can\'t edit this user';
        }
        return null;
    }

    public function getEdit($userId = 0, $action = null,$error = null)
    {
        $user = User::find($userId);
        $authUser = Auth::user();
        if (!empty($user)) {
            switch ($action) {
                case 'password':
                    $data = [];
                    $data['user'] = $user;
                    $data['level'] = 'admin';
                    $data['form'] = View::make('admin.partials.user.forms.password', array('current_password' => ($authUser->id == $userId)));
                    $this->layoutData['content'] = View::make('admin.pages.password', $data);
                    break;
                case 'name':
                    $data = [];
                    $data['user'] = $user;
                    $data['level'] = 'admin';
                    $data['form'] = View::make('admin.partials.user.forms.name', array('user' => $user,'error'=>$error));
                    $this->layoutData['content'] = View::make('admin.pages.user_name', $data);
                    break;
                case 'role':
                    $all_roles = UserRole::where('admin', '<=', $authUser->role->admin)->get();
                    $roles = array();
                    foreach ($all_roles as $role) {
                        $roles[$role->id] = $role->cn_name;
                    }
                    $this->layoutData['content'] = View::make('admin.pages.user_role', array('user' => $user, 'roles' => $roles));
                    break;
                case 'account':
                    $account = Account::where('user_id',$user->id)->first();
                    if($account){
                        $data = [];
                        $data['user'] = $user;
                        $data['level'] = 'admin';
                        $data['form'] = View::make('admin.partials.user.forms.account', array('user' => $user,'account'=>$account,'error'=>$error));
                        $this->layoutData['content'] = View::make('admin.pages.user_account', $data);
                    }else {
                        $this->layoutData['content'] = '用户没有找到';
                    }
                    break;
                default:
                    $details = View::make('admin.partials.user.info', array('user' => $user,'account'=>Account::where('user_id',$user->id)->first()));
                    if ($authUser->role->admin >= $user->role->admin) {
                        $can_edit = true;
                    } else {
                        $can_edit = false;
                    }
                    $this->layoutData['content'] = View::make('admin.pages.user_edit', array('user' => $user, 'account' => $details, 'can_edit' => $can_edit));
            }
        } else {
            $this->layoutData['content'] = '用户没有找到';
        }
    }

    public function getAdd($error = null)
    {
        $authUser = Auth::user();
        $all_roles = UserRole::where('admin', '<=', $authUser->role->admin)->get();
        $roles = array();
        foreach ($all_roles as $role) {
            $roles[$role->id] = $role->cn_name;
        }
        $this->layoutData['content'] = View::make('admin.pages.user_add', array('roles' => $roles,'error'=>$error));
    }

    public function postAdd()
    {
        $error = '';
        $is_account = [];
        $is_user = [];
        $authUser = Auth::user();
        $v = Validator::make(Request::all(), array(
                'email' => 'required|email|unique:users,email',
                'role' => 'required|integer',
            ),array(  'email.required'      => '邮箱必须填写',
                'email.email'      => '邮箱格式不正确',
                'email.unique'      => '邮箱已经存在',
                'role.required'      => '权限必须选择',
                'role.integer'      => '权限错误',

             )
        );
        if(Request::input('name')){
            $is_user = User::where('name',Request::input('name'))->first();
            if($is_user){
                $error = '用户名已存在';
            }
        }else{
            $error = '用户名必须填写';
        }
        if(Request::input('mobile')){
            $is_account = Account::where('mobile',Request::input('mobile'))->first();
            if($is_account){
                $error = '手机号已存在';
            }
        }else{
            $error = '手机号必须填写';
        }

        $perm_issue = true;
        $role = UserRole::find(Request::input('role'));
        if (!empty($role) && $role->admin <= $authUser->role->admin) {
            $perm_issue = false;
        }

        if ($v->passes() && !$perm_issue &&!$is_account &&!$is_user) {

            $password = str_random(8);
            $new_user = new User;
            $new_user->email = Request::input('email');
            $new_user->role_id = Request::input('role');
            $new_user->password = Hash::make($password);
            $new_user->name =Request::input('name');
            $new_user->save();

            $account = new Account;
            $account->user_id = $new_user->id;
            $account->mobile = Request::input('mobile');
            $account->save();

            AdminLog::new_log('User \'' . $new_user->email . '\' added');

            $email_message = '';
            $email_status = '';

            $this->layoutData['content'] = View::make('admin.pages.user_add', array('success' => true, 'password' => $password, 'email_message' => $email_message, 'email_status' => $email_status));
        } else {
            FormMessage::set($v->messages());
            if ($perm_issue) {
                FormMessage::add('role', 'Don\'t have permission to create user with this role, or doesn\'t exist');
            }
            $this->getAdd($error);
        }
    }

    public function postDelete($userId = 0)
    {
        $error = '用户ID是'.$userId.'没有找到';
        if ($user = User::find($userId)) {
            if (Auth::user()->role->admin >= $user->role->admin && Auth::user()->id != $user->id) {
                return json_encode($user->delete());
            }
            $error = '无法删除超级管理员或您自己的帐户';
        }
        return Response::make($error, 500);
    }

}