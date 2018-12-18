import React from 'react';
import { List, Pagination, Avatar, Row, Col, Icon, Modal, Form, Input, Button, Switch} from 'antd';
import ForumLayout from '../../components/ForumLayout';
import {SEOHeader} from "../../components/SEOHeader";
import styles from './index.module.css';
import HeadTab from '../../components/HeadTab';
import ReplyList from "../../components/ForumReplyWidget";
import {forum} from "../../components/models/forum";
import {observer} from 'mobx-react';
import moment from 'moment';
import Link from 'next/link';
const FormItem = Form.Item;
const {TextArea} = Input;
import Document from 'next/document';
moment.locale('zh-cn');
import {aRequest} from "../../components/request";
import {auth} from "../../components/Auth";

const CreateForm = Form.create()(props => {
    const {modalVisible, handleModalVisible} = props;
    const { getFieldDecorator } = props.form;
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 3 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 21 },
        },
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                try {
                    await aRequest('post', '/store_topic', {
                        ...values
                    })
                    props.form.resetFields();
                    handleModalVisible();
                    forum.handlePage(1);
                } catch (e) {
                    throw new Error(e)
                }
            }
        });
    }
    return (
        <Modal
            title="发表内容"
            visible={modalVisible}
            footer={null}
            onCancel={() => handleModalVisible(false)}
        >
          <Form onSubmit={handleSubmit}>
              <FormItem
                  {...formItemLayout}
                  label="标题"
              >
                  {getFieldDecorator('title', {
                      rules: [{
                          required: true, message: '标题不能为空',
                      }],
                  })(
                      <Input placeholder="请输入标题"/>
                  )}
              </FormItem>
             <FormItem
                  {...formItemLayout}
                  label="标题"
              >
                  {getFieldDecorator('content', {
                      rules: [{
                          required: true, message: '内容不能为空',
                      }],
                  })(
                      <TextArea rows={8} placeholder="简单描述一下问题"/>
                  )}
              </FormItem>
              <FormItem
                  {...formItemLayout}
                  label="是否匿名"
              >
                  {getFieldDecorator('is_anonymous', { valuePropName: 'checked' })(
                      <Switch />
                  )}
              </FormItem>
              <div style={{padding: 10, textAlign: 'center'}}>
                <Button type="primary" htmlType="submit">立即提交</Button>

            </div>
          </Form>

        </Modal>
    )
});

const Info = ({info}) => (
    <div className={styles.info}>
        <span>{info.author || '暂无'}</span>
        <span>{moment(info.created_at, 'YYYY-MM-DD HH:mm:ss').fromNow()}</span>
        <span>回复: {info.num || 0}</span>
        <span>浏览: {info.eye || 0}</span>
    </div>
);

const ItemList = ({list}) => (
    <List
        className={styles.list}
        itemLayout="horizontal"
        dataSource={list}
        locale={{
            emptyText: "暂无更多"
        }}
        renderItem={item => (
            <List.Item>
               <Link href={{pathname: '/f', query: {id: item.id}}}><div className={styles.item}>
                   <div>
                       <Avatar src={item.url} />
                   </div>
                   <div>
                       <div className={styles.title}>{item.title}</div>
                       <Info info={item}/>
                   </div>
               </div></Link>
            </List.Item>
        )}
    />
);
const tabs = [{
    id: 0,
    label: '全站最新'
}, {
    id: 1,
    label: '为你推荐'
}, {
    id: 2,
    label: '热门话题'
}];


@observer
class Index extends Document {
    // constructor(props) {
    //     super(props);
    // }
    static async getInitialProps({query}) {
        const value = query.value || '';
        forum.value = value;
        return {value}
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.value !== nextProps.value) {
            forum.handleValue(nextProps.value);
        }
    }
    componentDidMount() {
        forum.handleTab(tabs[0]);
    };
    state = {
        visible: false,
    };

    handleChange(page) {

    }

    handleModalVisible(flag) {
        if(!!flag && !auth.login) {
           alert('还未登录');
           return;
        }
        this.setState({
            visible: !!flag
        })
    }
    render() {
        const parentMode = {
            modalVisible: this.state.visible,
            handleModalVisible: this.handleModalVisible.bind(this)
        };
        return (
            <ForumLayout>
                <SEOHeader title="微社区"/>

                <Row gutter={16}>
                    <Col span={16}>
                        <HeadTab onClick={(item) => forum.handleTab(item)} tabs={tabs}/>
                        <ItemList list={forum.list}/>

                        {forum.total>0?<div style={{marginTop: 40, textAlign: 'center'}}>
                            <Pagination pageSize={16} onChange={forum.handlePage.bind(forum)} current={forum.page} defaultCurrent={forum.page} total={forum.total} pageSize={16}/>
                        </div>:null}
                    </Col>
                    <Col span={8}>
                        <section onClick={this.handleModalVisible.bind(this, true)}  className={styles.publish}>
                            发布
                            <Icon style={{fontSize: 18}} type="edit"/>
                        </section>
                        <ReplyList />
                    </Col>
                </Row>
                <CreateForm {...parentMode}/>
            </ForumLayout>
        )
    }
}
export default Index;