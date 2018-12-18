/**
 * Created by Smile on 2018/4/12.
 */
import React, {Component} from 'react';

import './index.module.css';
import {Input, Button, Form, Icon} from 'antd';
import Layout from '../../components/Layout/Index';
import FaQq from 'react-icons/lib/fa/qq';
import FaWeibo from 'react-icons/lib/fa/weibo';
import FaWechat from 'react-icons/lib/fa/wechat';
import {observer} from 'mobx-react';
import {aRequest} from "../../components/request";
import {auth} from "../../components/Auth";
import {SEOHeader} from "../../components/SEOHeader";
const FormItem  = Form.Item;
import Router from 'next/router'

@observer
class Index extends Component {
    constructor(props) {
        super(props);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                try {
                    const data = await aRequest('post', '/login', {
                        name: values.username,
                        password: values.password
                    });
                    Router.push('/Member');
                } catch (e) {
                    throw new Error(e);
                }
            }

        });
    }

    render() {
        const {history} = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <Layout>
                <SEOHeader title="登录"/>
                <div className="container-sm" style={{marginBottom: 30}}>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                    <div style={{height: 640, display: 'flex'}}>
                        <div className="" style={{width: '40%'}}>
                            <img style={{width: '100%', height: '100%', objectFit: 'contain'}} src="/static/image/login-l.png"/>
                        </div>
                        <div className="" style={{flex: 1, padding: '0 40px', display: 'flex',alignItems: 'center', flexDirection: 'column', justifyContent: 'center'}}>
                            <h2 style={{textAlign: 'center', marginBottom: 30}}>登录</h2>
                            <FormItem style={{width: '100%'}}>
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: '请输入用户名!' }],
                                })(
                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="输入昵称或者手机号" />
                                )}
                            </FormItem>
                            <FormItem style={{width: '100%'}}>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: '请输入密码!' }],
                                })(
                                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="输入密码" />
                                )}
                            </FormItem>
                            <div className="clearfix" style={{marginBottom: 20, width: '100%'}}>
                                {/*<div className="float-left">*/}
                                    {/*记住账号*/}
                                {/*</div>*/}
                                <div className="float-right" style={{color: '#888'}}>
                                    忘记密码?
                                </div>
                            </div>
                            <div style={{marginBottom: 20, width: '100%'}}>
                                <Button htmlType="submit" type="primary" style={{width: '100%'}}>登录</Button>
                            </div>
                            <div style={{marginBottom: 20, textAlign: 'center', color: '#444'}}>
                                尚未注册账户 <a href="javascript:void(0)" onClick={() => history.push('/register')}>注册</a>
                            </div>
                            <p className="social-login" style={{textAlign: 'center'}}>
                                社交账户登录
                            </p>
                            <div style={{color: '#888888'}}>
                                <FaQq style={{fontSize: 24, margin: '30px 40px'}}/>
                                <FaWeibo style={{fontSize: 24, margin: '30px 40px'}}/>
                                <FaWechat style={{fontSize: 24, margin: '30px 40px'}}/>
                            </div>
                        </div>
                    </div>
                    </Form>
                </div>
            </Layout>
        )
    }
}

export default Form.create()(Index);