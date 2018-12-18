/**
 * Created by Smile on 2018/4/23.
 */
import React, {Component} from 'react';

import '../Login/index.module.css';
import {Input, Button} from 'antd';
import Layout from '../../components/Layout/Index';
import FaQq from 'react-icons/lib/fa/qq';
import FaWeibo from 'react-icons/lib/fa/weibo';
import FaWechat from 'react-icons/lib/fa/wechat';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';
import axios from 'axios';
const Search = Input.Search;

class Store {
    @observable username = '';
    @observable password = '';
    @observable code = '';
    @observable mobile = '';
    constructor() {

    }

    @action
    handleChangeUserName(e, val) {
        console.log(e);
        this.username = e.target.value;
    }

    @action
    handleChangePassword(e, val) {
        console.log(e);
        this.password = e.target.value;
    }

    @action
    handleChangeMobile(e, val) {
        console.log(e);
        this.mobile = e.target.value;
    }

    @action
    handleChangeCode(e, val) {
        this.code = e.target.value;
    }

    @action
    handleSubmit() {
        axios.post('')
    }

    @action
    sendCode() {
        console.log('x');
    }
}

@observer
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = new Store();
    }

    componentDidMount() {

    }

    render() {
        const {history} = this.props;
        return (
            <Layout>
                <div className="container-sm" style={{marginBottom: 30}}>
                    <div style={{height: 640, display: 'flex'}}>
                        <div className="" style={{width: '40%'}}>
                            <img src="./desktop/image/register-l.png" style={{width: '100%', height: '100%', objectFit: 'contain'}}/>
                        </div>
                        <div className="" style={{flex: 1, padding: '0 40px', display: 'flex',alignItems: 'center', flexDirection: 'column', justifyContent: 'center'}}>
                            <h3 style={{textAlign: 'center', marginBottom: 30}}>注册</h3>
                            <Input value={this.state.username} onChange={this.state.handleChangeUserName.bind(this.state)} style={{marginBottom: 20}} placeholder="昵称或手机号"/>
                            <Input style={{marginBottom: 20}}
                                   value={this.state.password}
                                   onChange={this.state.handleChangePassword.bind(this.state)}
                                   placeholder="密码"/>
                            <Input
                                style={{marginBottom: 20}}
                                   value={this.state.password}
                                   onChange={this.state.handleChangeMobile.bind(this.state)}
                                   placeholder="手机号"/>
                            <Search onChange={this.state.handleChangeCode.bind(this.state)} placeholder="验证码" style={{marginBottom: 20}} type="number" onSearch={this.state.sendCode.bind(this.state)} enterButton={<Button>获取验证码</Button>} size="large" />
                            <div style={{marginBottom: 20, width: '100%'}}>
                                <Button type="primary" style={{width: '100%'}}>登录</Button>
                            </div>
                            <div style={{marginBottom: 20, textAlign: 'center', color: '#444'}}>
                                注册用户表明您接受本站 <a href="/">用户协议和条款隐私</a>
                            </div>
                            <div style={{marginBottom: 20, textAlign: 'center', color: '#444'}}>
                                已经拥有账户 <a href="javascript:void(0)" onClick={() => history.push('/login')}>登录</a>
                            </div>
                            <p className="social-login" style={{textAlign: 'center'}}>
                                社交账户登录
                            </p>
                            <div>
                                <FaQq style={{fontSize: 24, margin: '30px 40px'}}/>
                                <FaWeibo style={{fontSize: 24, margin: '30px 40px'}}/>
                                <FaWechat style={{fontSize: 24, margin: '30px 40px'}}/>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}

export default Index;