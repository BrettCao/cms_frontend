<h1>修改用户权限: {!! $user->email !!}</h1>

<br/>

@if (isset($success))

    <p class="text-success">{!! $user->email !!}已更新成功！</p>
    <p><a href="{{ route('coaster.admin.user.edit', ['userId' => $user->id]) }}">&raquo; 返回到用户详情页</a></p>

    @else

    {!! Form::open(['url' => Request::url()]) !!}

            <!-- user role field -->
    <div class="form-group">
        {!! Form::label('role', '用户权限', ['class' => 'control-label']) !!}
        {!! Form::select('role', $roles, null, ['class' => 'form-control']) !!}
        <span class="help-block"></span>
    </div>

    <!-- submit button -->
    <button type="submit" class="btn btn-primary">修改权限</button>

    {!! Form::close() !!}

@endif