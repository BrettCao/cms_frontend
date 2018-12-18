<h1>修改密码</h1>

@if (isset($success) && $success)

    @if ($level == 'admin')
        <p class="text-success">{!! $user->email !!} 的密码已更新！</p>
        <p><a href="{{ route('coaster.admin.user.edit', ['userId' => $user->id]) }}">&raquo;返回到用户详情页</a></p>
    @elseif ($level == 'user')
        <p class="text-success">密码修改成功</p>
        <p><a href="{{ route('coaster.admin.account') }}">&raquo;返回帐户设置</a></p>
    @else
        <p class="text-success">密码修改成功</p>
        <p><a href="{!! route('coaster.admin.login') !!}">&raquo; 您现在可以在这里登录</a></p>
    @endif

@else

    <div class="form-group">
        <div class="input-group">
            <span class="input-group-addon"><i class="glyphicon glyphicon-envelope"></i></span>
            <input class="form-control" value="{!! $user->email !!}" id="inputIcon" type="text" title="email" disabled/>
        </div>
    </div>

    {!! $form !!}

@endif

