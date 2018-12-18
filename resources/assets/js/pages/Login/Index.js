/**
 * Created by Smile on 2018/4/12.
 */
import React, {Component} from 'react';

import './index.module.css';
import {Input, Button} from 'antd';
import Layout from '../../components/Layout/Index';
import FaQq from 'react-icons/lib/fa/qq';
import FaWeibo from 'react-icons/lib/fa/weibo';
import FaWechat from 'react-icons/lib/fa/wechat';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class Store {
    @observable username = '';
    @observable password = '';
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
    handleSubmit() {
        axios.post('')
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
                            <img style={{width: '100%', height: '100%', objectFit: 'contain'}} src="./desktop/image/login-l.png"/>
                        </div>
                        <div className="" style={{flex: 1, padding: '0 40px', display: 'flex',alignItems: 'center', flexDirection: 'column', justifyContent: 'center'}}>
                            <h3 style={{textAlign: 'center', marginBottom: 30}}>登录</h3>
                            <Input value={this.state.username} onChange={this.state.handleChangeUserName.bind(this.state)} style={{marginBottom: 20}} placeholder="昵称或手机号"/>
                            <Input style={{marginBottom: 10}} value={this.state.password} onChange={this.state.handleChangePassword.bind(this.state)} placeholder="密码"/>
                            <div className="clearfix" style={{marginBottom: 20, width: '100%'}}>
                                <div className="float-left">
                                    记住账号
                                </div>
                                <div className="float-right" style={{color: '#888'}}>
                                    忘记密码?
                                </div>
                            </div>
                            <div style={{marginBottom: 20, width: '100%'}}>
                                <Button type="primary" style={{width: '100%'}}>登录</Button>
                            </div>
                            <div style={{marginBottom: 20, textAlign: 'center', color: '#444'}}>
                                尚未注册账户 <a href="javascript:void(0)" onClick={() => history.push('/register')}>注册</a>
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

export default withRouter(Index);