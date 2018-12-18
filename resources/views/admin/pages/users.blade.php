<div class="row textbox">
    <div class="col-sm-6">
        <h1>用户列表</h1>
    </div>
    <div class="col-sm-6 text-right">
        @if ($can_add == true)
            <a href="{{ route('coaster.admin.user.add') }}" class="btn btn-warning addButton"><i class="fa fa-plus"></i> &nbsp;
                新增用户</a>
        @endif
    </div>
</div>

<div class="table-responsive">
    <table class="table table-bordered table-striped">
        <thead>
        <tr>
            <th>用户</th>
            <th>用户名</th>
            <th>手机号</th>
            <th>所有权限</th>
            @if ($can_edit || $can_delete)
                <th>操作</th>
            @endif
        </tr>
        </thead>
        <tbody>
        @foreach ($users as $user)
            <tr id="user_{!! $user->id !!}">
                <td>{!! $user->email !!}</td>
                <td>{!! $user->name !!}</td>
                <td>{!! $user->mobile !!}</td>
                <td>{!! $user->cn_name !!}</td>
                @if ($can_edit || $can_delete)
                    <td data-uid="{!! $user->id !!}">
                        @if ($can_edit)
                            <?php $enable = ($user->active == 0) ? null : ' hide'; ?>
                            <?php $disable = ($user->active == 0) ? ' hide' : null; ?>
                            <i class="glyphicon glyphicon-stop itemTooltip{!! $enable !!}" title="启用这个用户"></i>
                            <i class="glyphicon glyphicon-play itemTooltip{!! $disable !!}" title="禁用这个用户"></i>
                            <a class="glyphicon glyphicon-pencil itemTooltip" href="{{ route('coaster.admin.user.edit', ['userId' => $user->id]) }}" title="修改用户信息"></a>
                        @endif
                        @if ($can_delete)
                            <i class="glyphicon glyphicon-remove itemTooltip" title="删除用户"
                               data-name="{!! $user->email !!}"></i>
                        @endif
                    </td>
                @endif
            </tr>
        @endforeach
        </tbody>
    </table>
</div>
{!! $users->links() !!}
@section('scripts')
    <script type="text/javascript">

        function disable_user(user_id, active) {
            if (user_id == {{ Auth::user()->id }}) {
                cms_alert('danger', '不能禁用自己的账户');
            }
            else {
                $.ajax({
                    url: route('coaster.admin.users.edit', {userId: user_id, action: 'status'}),
                    type: 'POST',
                    data: {set: active},
                    success: function (r) {
                        if (r == 1) {
                            if (active == 0) {
                                $("#user_" + user_id + " .glyphicon-play").addClass('hide');
                                $("#user_" + user_id + " .glyphicon-stop").removeClass('hide');
                            }
                            else {
                                $("#user_" + user_id + " .glyphicon-stop").addClass('hide');
                                $("#user_" + user_id + " .glyphicon-play").removeClass('hide');
                            }
                        }
                        else {
                            cms_alert('danger', 'Can\'t disable this user.');
                        }
                    }
                });
            }
        }

        $(document).ready(function () {
            $('.glyphicon-play').click(function () {
                disable_user($(this).parent().attr('data-uid'), 0);
            });
            $('.glyphicon-stop').click(function () {
                disable_user($(this).parent().attr('data-uid'), 1);
            });

            watch_for_delete('.glyphicon-remove', 'user', function (el) {
                var user_id = el.parent().attr('data-uid');
                if (user_id == {!! Auth::user()->id !!}) {
                    alert('不能删除自己的用户');
                    return false;
                } else {
                    return 'user_' + user_id;
                }
            });
        });

    </script>
@stop