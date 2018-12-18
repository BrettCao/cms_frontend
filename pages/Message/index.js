import React, {Component} from 'react';

import {Avatar, Icon, Tabs, List, Pagination } from 'antd';
import Layout from '../../components/Layout/Index';
import {aRequest} from "../../components/request";
import {SEOHeader} from "../../components/SEOHeader";
const TabPane = Tabs.TabPane;
const Item = List.Item;
import {EmptyModule} from "../../components/EmptyModule";
import Router from 'next/router';

const STATUS = {
    0: '全部信息',
    1: '系统信息',
    2: '福利信息'
}

class MessageList extends Component{
    state = {
        list: [],
        total: 0,
        page: 1,
        type: this.props.type
    };

    handlePage(page) {
        this.setState({
            page
        }, ()=> {
            this.parseData();
        })
    }
    componentDidMount() {
        this.handlePage(1);
    }
    async parseData() {
        try{
            const {type, page} = this.state;
            const {list, total} = await aRequest('get', '/notification_list', {
                params: {
                    type,
                    page
                }
            });
            this.setState({
                list,
                total
            })
        } catch (e) {
            Router.push({pathname: '/Login'});
            throw new Error(e);
        }
    }

    render() {
        const {list, page, total} = this.state;
        return (
            <div style={{minHeight: 640}}>
                {list.length>0?<List>
                    {list.map((item,i) => (
                        <Item key={`msg-${i}`}>
                            <div>
                                <div style={{marginBottom: 5}}>
                                    <Avatar src=""/>
                                    &nbsp;
                                    {/*{STATUS[item.type]}*/}
                                   <strong>系统消息</strong>
                                </div>
                                <p>
                                    {item.content}
                                </p>
                            </div>

                        </Item>
                    ))}
                </List>:EmptyModule}
                {total>0?<div style={{marginTop: 30, textAlign: 'center'}}>
                    <Pagination onChange={this.handlePage.bind(this)} defaultCurrent={page} current={page} pageSize={16} total={total} />
                </div>:null}
            </div>
        )
    }
}


class Index extends Component{
    render() {
        return (
            <Layout>
                <SEOHeader title="消息中心"/>
                <div className="container-sm" style={{marginTop: 30, marginBottom: 50}}>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="系统消息" key="1"><MessageList type={0}/></TabPane>
                    </Tabs>
                </div>
            </Layout>
        )
    }
}

export default Index