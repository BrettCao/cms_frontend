{!! Form::open() !!}

<div class="form-group {!! FormMessage::getErrorClass('name') !!}">
    {!! Form::label('mobile', '手机号', ['class' => 'control-label']) !!}
    {!! Form::text('mobile', $account->mobile, ['class' => 'form-control']) !!}
    <span class="help-block">{!! FormMessage::getErrorMessage('mobile') !!}</span>
</div>
<div class="form-group" style="color: red">
    {!! $error !!}
</div>
{!! Form::submit('确认修改', ['class' => 'btn btn-primary']) !!}

{!! Form::close() !!}