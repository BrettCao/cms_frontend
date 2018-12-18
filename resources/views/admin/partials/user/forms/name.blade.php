{!! Form::open() !!}

<div class="form-group {!! FormMessage::getErrorClass('name') !!}">
    {!! Form::label('name', '用户名', ['class' => 'control-label']) !!}
    {!! Form::text('name', $user->name, ['class' => 'form-control']) !!}
    <span class="help-block">{!! FormMessage::getErrorMessage('name') !!}</span>
</div>
<div class="form-group" style="color: red">
    {!! $error !!}
</div>
{!! Form::submit('确认修改', ['class' => 'btn btn-primary']) !!}

{!! Form::close() !!}