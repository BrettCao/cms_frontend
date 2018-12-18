import React from 'react';
import { List, Pagination, Button, Avatar, Row, Col, Input} from 'antd';
import ForumLayout from '../../components/ForumLayout';
import {SEOHeader} from "../../components/SEOHeader";
import ReplyList from "../../components/ForumReplyWidget";
import {observer} from 'mobx-react';
import Document from 'next/document';
import styles from './index.module.css';
import moment from 'moment';
const {TextArea} = Input;
import {aRequest} from "../../components/request";
moment.locale('zh-cn');
class Reply extends React.Component{

    render() {
        return (
            <article className={styles.reply}>
                <div>
                    title
                </div>
                <p className="clearfix" style={{marginBottom: 0}}>
                    <span className="float-left">
                        时间
                    </span>
                    <span className="float-right">
                        回复
                    </span>
                </p>
            </article>
        )
    }
}

const CommentReplyList = ({list = []}) => (
    <div>
        {list.map((item,i) => (
            <Reply reply={item} key={`reply-${i}`}/>
        ))}
    </div>
);


class Comment extends React.Component{
    constructor(props) {
        super(props);
    }
    async handleSubmit() {
        try {
            await aRequest('post', '/comment_reply', {
                content: this.state.content,
                id: this.props.item.id
            })
            this.setState({
                reply: false
            })
        } catch (e) {
            throw new Error(e);
        }
    }
    state = {
        reply: false,
        content: ''
    };
    reply() {
        const {reply} = this.state;
        this.setState({
            reply: !reply
        });
    };
    render() {
        const createMarkup = (html) => {
            return {__html: html};
        };
        const {reply} = this.state;
        const {item} = this.props;
        return(
            <section>
                <div style={{marginBottom: 10}}>
                   <Avatar shape="square" src={item.url} style={{marginRight: 10}}/>
                   &nbsp;
                    {item.author || ''}
                </div>
                <div style={{marginBottom: 10}} dangerouslySetInnerHTML={createMarkup(item.content)}></div>
                <p style={{marginBottom: 10}} className="clearfix">
                    <span className="float-left">
                        {moment(item.created_at, 'YYYY-MM-DD HH:mm:ss').fromNow()}
                    </span>
                    <span className="float-right">
                        <span onClick={this.reply.bind(this)}>回复 </span>
                    </span>
                </p>
                <CommentReplyList list={[]}/>
                {reply?<div>
                    <TextArea onChange={obj => this.setState({
                        content: obj.target.value
                    })} rows={6}/>
                    <div style={{textAlign: 'right', marginTop: 10}}>
                        <Button onClick={this.handleSubmit.bind(this)} type="primary">提交发表</Button>
                    </div>
                </div>:null}
            </section>
        )
    }
}


const ItemList = ({list}) => (
    <List
        itemLayout="horizontal"
        dataSource={list}
        locale={{
            emptyText: "暂无更多"
        }}
        renderItem={item => (
            <List.Item>
               <div className={styles.item}>
                    <Comment item={item}/>
               </div>
            </List.Item>
        )}
    />
);

@observer
class Index extends Document {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            page: 1,
            total: 0,
            reply: false,
            content: '',
            focus: false,
        };
    }

    static async getInitialProps({query: {id = ''}}) {
        const data = await aRequest('get', '/topic_detail', {
            params: {
                id
            }
        });
        console.log(data);
        return {forum: data};
    }

    handleReply() {
        const {reply} = this.state;
        this.setState({
            reply: !reply
        })
    }
    async handleFocus(focus) {
        const {forum:{id}} = this.props;
        try {
            await aRequest('get', '/follow', {
                params: {
                    id
                }
            })
            this.setState({
                focus
            })
        } catch (e) {
            throw new Error(e);
        }
    }
    async comments(id) {
        const {list, total} = await aRequest('get', '/topic_comment', {
            params: {
                id,
                page: this.state.page
            }
        });
        this.setState({
            list,
            total
        })
    }

    async handleComment() {
        const _this = this;
        const {forum} = this.props;
        try{
            await aRequest('post', '/comment_topic', {
                content: _this.state.content,
                id: _this.props.forum.id
            });
            this.setState({
                reply: false,
                content: ''
            }, () => {
                _this.comments(forum.id);
            })
        } catch (e) {
            throw new Error(e);
        }
    }
    handlePage(page) {
        this.setState({
            page
        }, () => {
            this.comments(this.props.forum.id);
        })
    }
    componentDidMount() {
        this.comments(this.props.forum.id);

         this.setState({
            focus: !!this.props.forum.is_follow
        })
    }
    render() {
        const createMarkup = (html) => {
            return {__html: html};
        };
        const {forum} = this.props;
        const {list, reply, focus, total, page} = this.state;
        return (
            <ForumLayout>
                <SEOHeader title="微社区"/>

                <Row gutter={16}>
                    <Col span={16}>
                        <div className={styles.content}>
                            <h1>{forum.title}</h1>
                            <p dangerouslySetInnerHTML={createMarkup(forum.content)}></p>
                            <div style={{fontSize: 12}}>
                               <Avatar src={forum.url}/>
                                &nbsp; {forum.author} {moment(forum.created_at, 'YYYY-MM-DD HH:mm').fromNow()} 回复 {forum.num} 浏览 {forum.eye}
                            </div>
                            <div style={{marginBottom: 0}}>
                                {!focus ? <Button onClick={this.handleFocus.bind(this, true)} type="primary"
                                                      style={{marginRight: 10}}>关注话题</Button> :
                                    <Button style={{marginRight: 10}} onClick={this.handleFocus.bind(this, false)}>取消关注</Button>
                                }
                                <Button style={{marginRight: 10}} onClick={this.handleReply.bind(this)} type="inline">回复话题</Button>
                            </div>
                        </div>
                        {reply?<section style={{marginTop: 15}}>
                            <TextArea onChange={content => this.setState({content: content.target.value})} rows={6}/>
                            <div style={{padding: 15, textAlign: 'right'}}>
                                <Button onClick={this.handleComment.bind(this)} type="primary">回复</Button>
                            </div>
                        </section>:null}
                        <div className={styles.comments} style={{marginTop: 20}}>
                            <ItemList list={list}/>
                        </div>
                        <div style={{marginTop: 30, textAlign: 'center'}}>
                            <Pagination current={page} defaultCurrent={page} onChange={this.handlePage} total={total}/>
                        </div>
                    </Col>
                    <Col span={8}>
                        <ReplyList/>
                    </Col>
                </Row>
            </ForumLayout>
        )
    }
}
export default Index;