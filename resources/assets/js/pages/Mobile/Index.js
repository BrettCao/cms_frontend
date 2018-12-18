import React, {Component} from 'react';
import {observable, action, autorun} from 'mobx'
import {observer} from 'mobx-react';
import MemberLayout from '../../components/MemberLayout';
import {Modal, Input, Button} from 'antd';
import '../Password/index.module.css';
const Search = Input.Search;

class Info {
    @observable confirm_password = '';
    @observable password = '';

    @observable code = '';
    @observable time = 60;

    @action
    changePassword (val) {
        this.password = val;
    }

    @action
    changeConfirm (val) {
        this.confirm_password = val;
    }

    @action
    changeCode (val) {
        this.code = val;
    }

    @action
    sendCode() {
        const _this = this;
        this.time = 60;
        const inter = setInterval(() => {
            if(--this.time === 0) {
                clearInterval(inter);
                this.time = 60;
            }
        }, 1000);
    }

    @action
    handleSubmit() {
        if(this.code === '') {
            Modal.error({
                title:'错误',
                content:'验证码不能为空'
            });
            return ;
        }
        if(this.password === '') {
            Modal.error({
                title:'错误',
                content:'原手机号不能为空'
            });
            return ;
        }
        if(this.confirm_password === '') {
            Modal.error({
                title:'错误',
                content:'新手机号不能为空'
            });
            return ;
        }
    }
}

@observer
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = new Info();
    }

    render() {
        return (
            <MemberLayout >
                <div className="member-details">
                    <h5 style={{fontWeight: 600}}>换绑手机</h5>
                    <div>原手机号</div>
                    <Input onChange={this.state.changePassword.bind(this.state)} placeholder="原手机号"/>
                    <div>新手机号</div>
                    <Input type="password" onChange={this.state.changeConfirm.bind(this.state)} placeholder="新手机号"/>
                    <div>验证码</div>
                    <Search onChange={this.state.changeCode.bind(this.state)} placeholder="输入验证码" onSearch={this.state.sendCode.bind(this.state)} enterButton={<Button disabled={this.state.time<60}>获取验证码{this.state.time!==60?this.state.time:''}</Button>} size="large" />
                    <div>
                        <Button onClick={this.state.handleSubmit.bind(this.state)} style={{width: '100%'}} type="primary">修改密码</Button>
                    </div>
                </div>
            </MemberLayout>
        )
    }
}

export default Index;