import React, {Component} from 'react';

import {observable, action, runInAction} from 'mobx'
import {observer} from 'mobx-react';
import './index.module.css';
import {Button, Pagination, Popover, Icon, Row, Col } from 'antd';
import {EmptyModule} from '../../components/EmptyModule';
import {QQ, PQQ} from '../../components/config';
import Link from 'next/link';

export const ArticleList = ({list}) => (
    <div className="periodical-list-wrapper">
        {list.map((item, key)=>(
            <Link href={{ pathname: '/ShowPeriodical', query: { uuid: item.uuid } }} key={key}><article >
                <div className="img-wrapper">
                    <img style={{height: '100%'}} src={item.url}/>
                </div>
                <div className="r-body">
                    <h3>{item.title}<span className="en">{item.en_title}</span></h3>
                    <Row  style={{margin: 0}}>
                        <Col span={8}>
                            <p>主管单位: <span>{item.competent_unit || '暂无'}</span></p>
                            <p>主办单位: <span>{item.host_unit}</span></p>
                            <p>中国分类: <span>xxx</span></p>
                            <p>出版地区: <span>{item.publish_area}</span></p>
                            <p>国内刊号: <span>{item.ISSN}</span></p>
                            <p>国际刊号: <span>{item.CN}</span></p>
                        </Col>
                        <Col span={8}>

                            <p>创刊时间: <span>{item.start_publish_date}</span></p>
                            <p>发行周期: <span>{item.publish_cycle}</span></p>
                            <p>期刊开本: <span>{item.folio}</span></p>
                            <p>语种: <span>{item.languages}</span></p>
                            <p>影响分子: <span>{item.compound}</span></p>
                        </Col>
                        <Col span={8}>
                            <div className="btn-wrapper">
                                <div><Button type="primary" onClick={() => window.location.href=`http://wpa.qq.com/msgrd?v=3&uin=${PQQ}&site=qq&menu=yes`}>我要发表</Button></div>
                                <div><Button onClick={() => window.location.href=`http://wpa.qq.com/msgrd?v=3&uin=${QQ}&site=qq&menu=yes`}>咨询客服</Button></div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </article></Link>
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
            id: null,
            title: '默认排序'
        },{
            id: 1,
            title: '热门期刊'
        }, {
            id: 2,
            title: '影响因子'
        }];
        return (
            <div className="container-sm periodical-list" style={{padding: 0}}>
                <div className="sort">
                    <span>排序方式:
                        <Popover placement="bottom" content={<SortItem store={this.store} items={items}/>} trigger="click">
                            <strong className="sort-text">{this.store.sort?this.store.sort.title: '默认排序'}<Icon type="down" /></strong>
                        </Popover>
                    </span>
                </div>
                {this.store.lists.length>0?<ArticleList list={this.store.lists}/>:EmptyModule}

                <div style={{textAlign: 'right'}}>
                    <Pagination pageSize={16} size="small" style={{marginTop: 30, marginBottom: 30}} onChange={(page, size)=>{this.store.changePage(page)}} defaultCurrent={this.store.currentPage} total={this.store.total} />
                </div>
            </div>
        )
    }
}

export default PeriodicalList;