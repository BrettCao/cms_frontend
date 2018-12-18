import React, {Component} from 'react';

// import './index.module.css';
import {Input, Button, Avatar, Icon, Tabs, List, Pagination } from 'antd';
import Layout from '../../components/Layout/Index';
import {aRequest} from "../../components/request";
import {SEOHeader} from "../../components/SEOHeader";
const TabPane = Tabs.TabPane;
const Item = List.Item;
import {EmptyModule} from "../../components/EmptyModule";
import Document from 'next/document';
import moment from 'moment';
moment.locale('zh-cn');
import PropTypes from 'prop-types';

class ArticleList extends Component{
    state = {
        page: 1,
        total: 0,
        list: [],
        value: this.props.value,
        type: this.props.type
    };
    async parseData() {
        const {page, type,value} = this.state;
        try {
            const {list, total} = await aRequest('get', '/search', {
                params: {
                    page,
                    type,
                    value
                }
            });
            this.setState({
                list,
                total
            })
        } catch (e) {
            throw new Error(e);
        }
    }
    handlePage(page) {
        this.setState({
            page
        }, () => {
            this.parseData();
        })
    }
    componentDidMount() {
        this.parseData();
    }
    render() {
        const {total, page, list, handlePage} = this.state;
        return (
           <div style={{minHeight: 810}}>
               {list.length>0?<List>
                   {list.map((item, i) => (
                       <Item key={`article-${i}`}>
                          <div style={{width: '100%'}}>
                              <h3>
                                {item.title}
                              </h3>
                              <p>
                                 {item.content}
                              </p>
                              {item.url?<div style={{margin: '10px 0'}}>
                                  <img style={{maxHeight: 200}} src={item.url}/>
                              </div>:null}
                              <p style={{fontSize: 12}}>
                                  {item.time}
                              </p>
                          </div>
                       </Item>
                   ))}
               </List>:EmptyModule}
               {total>0?<div style={{textAlign: 'center', marginTop: 30, marginBottom: 50}}>
                  <Pagination pageSize={16} current={page} total={total} onChange={handlePage} defaultCurrent={page}/>

               </div>:null}
           </div>
        )
    }
}

class Index extends Document{
    static async getInitialProps({query: {value=''}}) {
        return {value}
    }

     componentWillReceiveProps(nextProps) {;
        if(this.props.value !== nextProps.value) {
            // forum.handleValue(nextProps.value);
            window.location.reload();
        }
    }

    render() {
        const {value} = this.props;

        console.log(value);
        return (
            <Layout>
                <SEOHeader title="搜索列表"/>
                <div className="container-sm">
                    <Tabs defaultActiveKey="0">
                        <TabPane tab="学术期刊" key="0"><ArticleList value={value} type={0}/></TabPane>
                        <TabPane tab="专著出书" key="1"><ArticleList value={value} type={1}/></TabPane>
                        <TabPane tab="其他纸媒" key="2"><ArticleList value={value} type={2}/></TabPane>
                        <TabPane tab="线上纸媒" key="3"><ArticleList value={value} type={3}/></TabPane>
                        <TabPane tab="论文范文" key="4"><ArticleList value={value} type={4}/></TabPane>
                        <TabPane tab="应用文" key="5"><ArticleList value={value} type={5}/></TabPane>
                        <TabPane tab="资料下载" key="6"><ArticleList value={value} type={6}/></TabPane>
                    </Tabs>
                </div>
            </Layout>
        )
    }
}

export default Index;