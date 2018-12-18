import React from 'react';
import styles from './index.module.css';
import {Icon, Badge, Row, Col, Input } from 'antd';
import {auth} from "../Auth";
const Search = Input.Search
import {forum} from "../models/forum";
import Router from 'next/router';
import {aRequest} from "../request";
import Bell from '../Bell';
export default class Index extends React.Component{
    constructor(props){
        super(props);
    }

    async componentDidMount() {
        const data = await aRequest('get', '/is_login');
        if(!!!data) {
            auth.setLogin();
        }
    }

    handleSearch = (value) => {
        Router.push({pathname: '/Forum', query: {value: value}})
    };
    renderLogin() {
        if(!auth.login) {
            Router.push('/Login')
        } else {
            Router.push('/Member');
        }
    }
    render() {
        return (
            <div style={{backgroundColor: '#fff', borderBottom: '1px solid #dedede'}}>
            <div className="container-sm">
                <Row gutter={16}>
                    <Col span={16}>
                        <div className={styles.component}>
                            <div>
                                <img style={{height: 30}} src="/static/image/logo.png"/>
                            </div>
                            <div>
                                <Search enterButton onSearch={this.handleSearch} defaultValue={forum.value} placeholder="输入关键字搜索"/>
                            </div>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className={styles.right}>
                            {auth.login?<Bell/>:null}
                            <img  onClick={() => this.renderLogin()} style={{width: 32, height: 32, marginLeft: 10}} src="/static/image/face.png"/>
                        </div>
                    </Col>
                </Row>
            </div>
            </div>
        )
    }
}