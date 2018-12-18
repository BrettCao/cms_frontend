<table class="table table-bordered">
    <tbody>
    <tr>
        <td>权限</td>
        <td>{!! $user->role->cn_name !!}</td>
    </tr>
    <tr>
        <td>登陆账号</td>
        <td>{!! $user->email !!}</td>
    </tr>
    <tr>
        <td>用户名</td>
        <td>{!! $user->name?:'暂无' !!}</td>
    </tr>
    @if($account)
        <tr>
            <td>手机号</td>
            <td>{!! $account->mobile?:'暂无' !!}</td>
        </tr>
    @endif
    <tr>
        <td>密码</td>
        <td>**********</td>
    </tr>
    <tr>
        <td>创建时间</td>
        <td>{!! $user->created_at !!}</td>
    </tr>
    <tr>
        <td>状态</td>
        <td>{!! !empty($user->active)?'启用':'禁用' !!}</td>
    </tr>
    </tbody>
</table>