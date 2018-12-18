import React from 'react';
import MemberLayout from '../../components/MemberLayout';
import {List, Button, Pagination , Popover } from 'antd';
import styles from  './index.module.css';
import {SEOHeader} from "../../components/SEOHeader";
import {aRequest} from "../../components/request";
import {EmptyModule} from "../../components/EmptyModule";
import Link from 'next/link';
const Item  = List.Item;

const ForumList = ({list}) => (
    <section>
        {list&&list.length>0?<List>
            {list.map((item, i) => (
                <Item key={`forum-${i}`}>
                   <Link href={{pathname: '/f', query: {id: item.id}}}><div style={{width: '100%'}}>
                       <div style={{marginBottom: 10, fontWeight: 500}}><span style={{fontSize: 18, color: '#0d88c1', fontWeight: 600}}>#</span>
                           <span style={{fontWeight: 600, fontSize: 16}}>{item.title}</span>
                       </div>
                      <div className="clearfix">
                          <p className="float-left">
                           发布于{item.created_at}
                       </p>
                       <p className="float-right">
                           回复: {item.num || 0}
                       </p>
                      </div>
                   </div></Link>
                </Item>
            ))}
        </List>:EmptyModule}
    </section>
)

class Index extends React.Component{
    state = {
        type: 1,
        total: 0,
        list: [],
        page: 1
    }
    async parseData() {
        try {
            const {page, type} = this.state;
            const {list, total} = await aRequest('get', '/my_topic', {
                params: {
                    page,
                    type
                }
            });

            this.setState({
               list,
               total
            })
        } catch(e) {
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
    handleType (type) {
        this.setState({
            type,
            page: 1
        }, () => {
            this.parseData();
        })
    }
    render() {
        const content = (
            <div className={styles.popover}>
                <p onClick={this.handleType.bind(this, 1)} className={[
                    this.state.type == 1? 'active': ''
                ].join(' ')}>发布话题</p>
                <p onClick={this.handleType.bind(this, 0)} className={[
                    this.state.type == 0?'active':''
                ].join(' ')}>关注话题</p>
            </div>
        );
        const {list, total, page} = this.state;
        return (
            <MemberLayout >
                <SEOHeader title="参与话题"/>
                <div style={{minHeight: 640}}>
                    <h3 className="clearfix">
                        参与话题
                        <div className={[
                            "float-right",

                        ].join(' ')} style={{fontSize: 14}}>
                            话题筛选: &nbsp;
                            <Popover placement="bottomRight" content={content} trigger="click">
                                <Button>{this.state.type==0?'关注话题':'发布话题'}</Button>
                            </Popover>
                        </div>
                    </h3>
                    <ForumList list={list}></ForumList>

                    {total>0?<div style={{textAlign: 'center', marginTop: 30}}>
                        <Pagination total={total} current={page} pageSize={16} onChange={this.handlePage}/>
                    </div>:null}
                </div>
            </MemberLayout>
        )
    }
}


export default Index;