import React, {Component} from 'react';

import {observer} from 'mobx-react';
import './index.module.css';
import {Button, Pagination, Row, Col } from 'antd';
import {QQ, PQQ} from '../../components/config';
import {EmptyModule} from '../../components/EmptyModule';
import Link from 'next/link';

export const ArticleList = ({list}) => (
    <div className="periodical-list-wrapper">
        {list.map((item, key)=>(
            <Link  key={key} href={{pathname: '/Media', query: {uuid: item.id}}}><article>
                <div className="img-wrapper">
                    <img src={item.url}/>
                </div>
                <div className="r-body">
                    <h3>{item.title}<span className="en">{item.e_title}</span></h3>
                    <Row style={{margin: 0}}>
                        <Col span={8}>
                            <p>主管单位: <span>{item.competent}</span></p>
                            <p>主办单位: <span>{item.unit}</span></p>
                            <p>发行方式: <span>{item.issue}</span></p>
                            <p>日行量: <span>{item.num}</span></p>
                        </Col>
                        <Col span={8}>
                            <p>国内刊号: <span>{item.issn}</span></p>
                            <p>创刊时间: <span>{item.start_publish_date}</span></p>
                            <p>发行周期: <span>{item.cycle}</span></p>
                            <p>报刊版式: <span>{item.press}</span></p>
                        </Col>
                        <Col span={8}>
                            <div className="btn-wrapper">
                                <div><Button type="primary" onClick={() => window.location.href=`http://wpa.qq.com/msgrd?v=3&uin=${PQQ}&site=qq&menu=yes`}>我要发表</Button></div>
                                <div><Button onClick={() => window.location.href=`http://wpa.qq.com/msgrd?v=3&uin=${QQ}&site=qq&menu=yes`}>咨询客服</Button></div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </article>
            </Link>
        ))}
    </div>
);
export const SortItem = ({items, store}) => (
    <ul className="popover-sort">
        {items.map((item, i)=>(
            <li className={[
                store.sort&&store.sort.id == item.id?'active':''
            ].join(' ')} key={i} onClick={()=>{store.changeSort(item)}}>
                {item.title}
            </li>
        ))}
    </ul>
);

@observer
class PeriodicalList extends Component {
    constructor(props) {
        super(props);
        this.store = this.props.store;
    }

    componentDidMount() {

    }

    render() {
        const items = [{
            id: 0,
            title: '默认排序'
        },{
            id: 1,
            title: '浏览量'
        }]
        return (
            <div className="container-sm periodical-list">

                {this.store.lists.length>0?<ArticleList list={this.store.lists}/>:EmptyModule}

                <div style={{textAlign: 'right'}}>
                    <Pagination size="small" style={{marginTop: 30, marginBottom: 30}} onChange={(page, size)=>{this.store.changePage(page)}} defaultCurrent={this.store.currentPage} total={this.store.total} />
                </div>
            </div>
        )
    }
}

export default PeriodicalList;