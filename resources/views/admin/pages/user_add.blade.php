<h1>新增用户</h1>

<br/>

@if (isset($success))

    <p class="text-success">
        {!! Request::input('email') !!}' 的用户已成功激活<br/>
        该用户的密码是: {!! $password !!}
    </p>
    @if (!empty($email_message))
        <p class="text-{!! $email_status !!}">{!! $email_message !!}</p>
    @endif

    <p>
        <a href="{{ route('coaster.admin.user.add') }}">添加其他用户</a><br />
        <a href="{{ route('coaster.admin.user') }}">返回用户列表</a>
    </p>

    @else

    {!! Form::open() !!}

    <div class="form-group {!! FormMessage::getErrorClass('name') !!}">
        {!! Form::label('name', '用户名', ['class' => 'control-label']) !!}
        {!! Form::text('name', Request::input('name'), ['class' => 'form-control']) !!}
        <span class="help-block">{!! FormMessage::getErrorMessage('name') !!}</span>
    </div>

            <!-- user email field -->
    <div class="form-group {!! FormMessage::getErrorClass('email') !!}">
        {!! Form::label('email', '邮箱', ['class' => 'control-label']) !!}
        {!! Form::text('email', Request::input('email'), ['class' => 'form-control']) !!}
        <span class="help-block">{!! FormMessage::getErrorMessage('email') !!}</span>
    </div>

    <!-- user role field -->
    <div class="form-group {!! FormMessage::getErrorClass('role') !!}">
        {!! Form::label('role', '权限', ['class' => 'control-label']) !!}
        {!! Form::select('role', $roles, Request::input('role'), ['class' => 'form-control']) !!}
        <span class="help-block">{!! FormMessage::getErrorMessage('role') !!}</span>
    </div>


    <div class="form-group {!! FormMessage::getErrorClass('mobile') !!}">
        {!! Form::label('mobile', '手机号', ['class' => 'control-label']) !!}
        {!! Form::number('mobile', Request::input('mobile'), ['class' => 'form-control']) !!}
        <span class="help-block">{!! FormMessage::getErrorMessage('mobile') !!}</span>
    </div>

    {{--<!-- send email -->--}}
    {{--<div class="form-group">--}}
        {{--{!! Form::label('send_email', '发送至邮箱', ['class' => 'control-label']) !!}--}}
        {{--{!! Form::checkbox('send_email', 1, true, ['class' => 'form-control']) !!}--}}
    {{--</div>--}}
    <div class="form-group" style="color: red">
        {!! $error !!}
    </div>
    <!-- submit button -->
    <button type="submit" class="btn btn-primary addButton"><i class="fa fa-plus"></i> &nbsp; 新增用户</button>

    {!! Form::close() !!}

@endif