import React from 'react';
import {SEOHeader} from "../../components/SEOHeader";
import {aRequest} from "../../components/request";
import CommonHead from '../../components/CommonHead';
import {Pagination, Row, Col, List} from 'antd';
import {observer} from 'mobx-react';
import {observable, action} from 'mobx';
import styles from './index.module.css';
import {EmptyModule} from "../../components/EmptyModule";
const Item = List.Item;
import Link from 'next/link';
import Truncate from 'react-truncate';
class Store  {
    @observable total = 0;
    @observable list = [];
    @observable page = 1;

    @action
    handlePage(page) {
        this.page = page;
    }

    @action
    async parseData() {
        try {
            const {page} = this;
            const {list, total} = await aRequest('get', '/question_list', {
                params: {
                    page
                }
            });
            this.list = list;
            this.total = total;
        } catch (e) {
           throw new Error(e);
        }
    }
}

@observer
class Index extends React.Component{
    constructor(props) {
        super(props);
        this.state = new Store();
    }
    componentDidMount() {
        this.state.parseData(1);
    }
    render() {
        const {page, total, list} = this.state;
        const createMarkup = html => {
            return {__html: html};
        };
        return (
            <div>
                <SEOHeader title="发表常识"/>
                <CommonHead/>
                <div className="container-sm" style={{marginTop: 30, marginBottom: 50}}>
                    {list.length>0?
                        <List>
                            {list.map((item,i) => (
                                <Item key={`question-${i}`}>
                                    <article className={styles.item}>
                                        <Row>
                                            <Col span={1}>
                                                <span className={styles.question}>问</span>
                                            </Col>
                                            <Col span={22} push={1}>
                                                {item.title}
                                            </Col>
                                        </Row>
                                        <Row style={{marginTop: 10}}>
                                            <Col span={1}>
                                                <span className={styles.answer}>答</span>
                                            </Col>
                                            <Col style={{color: '#888888', fontSize: 12}} span={22} push={1}>
                                                <Truncate
                                                    lines={2}
                                                    ellipsis={<span>...<Link href={{pathname: '/Paper', query: {id: item.id}}}><a style={{fontSize: 12}} href="javascript: void(0)">查看详情</a></Link></span>}
                                                >
                                                    <div dangerouslySetInnerHTML={createMarkup(item.content)}></div>
                                                </Truncate>
                                            </Col>
                                        </Row>
                                    </article>
                                </Item>
                            ))}
                        </List>:EmptyModule}
                    {total>0?<div style={{marginTop: 30, textAlign: 'center'}}>
                        <Pagination defaultCurrent={page} pageSize={16} total={total} onChange={this.state.handlePage} current={page}/>
                    </div>:null}
                </div>

            </div>
        )
    }
}

export default Index;