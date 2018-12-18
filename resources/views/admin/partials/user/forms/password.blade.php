{!! Form::open() !!}

@if ($current_password)
        <!-- current password field -->
<div class="form-group {!! FormMessage::getErrorClass('current_password') !!}">
    {!! Form::label('current_password', '原密码', ['class' => 'control-label']) !!}
    {!! Form::password('current_password', ['class' => 'form-control']) !!}
    <span class="help-block">{!! FormMessage::getErrorMessage('current_password') !!}</span>
</div>
@endif

        <!-- password field -->
<div class="form-group {!! FormMessage::getErrorClass('new_password') !!}">
    {!! Form::label('new_password', '新密码', ['class' => 'control-label']) !!}
    {!! Form::password('new_password', ['class' => 'form-control']) !!}
    <span class="help-block">{!! FormMessage::getErrorMessage('new_password') !!}</span>
</div>

<!-- confirm password field -->
<div class="form-group ">
    {!! Form::label('new_password_confirmation', '再次输入密码', ['class' => 'control-label']) !!}
    {!! Form::password('new_password_confirmation', ['class' => 'form-control']) !!}
</div>

<!-- submit button -->
{!! Form::submit('修改密码', ['class' => 'btn btn-primary']) !!}

{!! Form::close() !!}