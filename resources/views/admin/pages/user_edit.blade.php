<h1>用户详情: {!! $user->email !!}</h1>

<br/>

{!! $account !!}

@if ($can_edit)
    <a href="{{ route('coaster.admin.user.edit', ['userId' => $user->id, 'action' => 'password']) }}" class="btn btn-warning"><i class="fa fa-lock"></i> &nbsp;修改密码</a> &nbsp;
    <a href="{{ route('coaster.admin.user.edit', ['userId' => $user->id, 'action' => 'name']) }}" class="btn btn-warning"><i class="fa fa-users"></i> &nbsp; 修改用户名</a> &nbsp;
    <a href="{{ route('coaster.admin.user.edit', ['userId' => $user->id, 'action' => 'role']) }}" class="btn btn-warning"><i class="fa fa-bullhorn"></i> &nbsp; 修改权限</a>
    <a href="{{ route('coaster.admin.user.edit', ['userId' => $user->id, 'action' => 'account']) }}" class="btn btn-warning"><i class="fa fa-bullhorn"></i> &nbsp; 修改个人信息</a>
@endif