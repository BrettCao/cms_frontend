import React, {Component} from 'react';
import {observable, action, autorun} from 'mobx'
import {observer} from 'mobx-react';
import MemberLayout from '../../components/MemberLayout';
import {Modal, Input, Button} from 'antd';
import styles from './index.module.css';
const Search = Input.Search;
import {SEOHeader} from "../../components/SEOHeader";
import {aRequest} from "../../components/request";

class Info {
    @observable confirm_password = '';
    @observable password = '';

    @observable code = '';
    @observable time = 60;


    @action
    changePassword (val) {
        console.log(val);
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
    async sendCode() {
        const _this = this;
        this.time = 60;
        const info = await aRequest('get', '/ajax_logo');

        await aRequest('get', '/sms/verify-code', {
            params: {
                mobile_rule: 'mobile_required',
                mobile: info.mobile
            }
        })
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
                content:'密码不能为空'
            });
            return ;
        }
        if(this.confirm_password === '') {
            Modal.error({
                title:'错误',
                content:'新密码不能为空'
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
        console.log(this.context);
        return (
            <MemberLayout >
                <SEOHeader title="修改密码"/>
                <div className="member-details">
                    <h3 style={{fontWeight: 600}}>修改密码 </h3>
                    <div>密码</div>
                    <Input onChange={this.state.changePassword.bind(this.state)} placeholder="密码"/>
                    <div>验证码</div>
                    <Search onChange={this.state.changeCode.bind(this.state)} placeholder="输入验证码"
                            onSearch={this.state.sendCode.bind(this.state)}
                            enterButton={<Button className={styles.btn} disabled={this.state.time<60}>获取验证码{this.state.time!==60?this.state.time:''}</Button>} size="large" />
                    <div>新密码</div>
                    <Input type="password" onChange={this.state.changeConfirm.bind(this.state)} placeholder="新密码"/>
                    <div>
                        <Button onClick={this.state.handleSubmit.bind(this.state)} style={{width: '100%', backgroundColor: '#43a8e0'}} type="primary">修改密码</Button>
                    </div>
                </div>
            </MemberLayout>
        )
    }
}

export default Index;