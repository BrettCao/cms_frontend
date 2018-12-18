import React, {Component} from 'react';

import {observable, action, runInAction} from 'mobx'
import {observer} from 'mobx-react';
import './index.module.css';
import {Button, Pagination, Popover, Icon } from 'antd';

export const ArticleList = ({list}) => (
    <div className="periodical-list-wrapper">
        {list.map((item, key)=>(
            <article key={key}>
                <div className="img-wrapper">
                    <img src={item.uri}/>
                </div>
                <div className="r-body">
                    <h3>生物学期刊<span className="en">english</span></h3>
                    <div className="row" style={{margin: 0}}>
                        <div className="col-md-4">
                            <p>主管单位: <span>xxx</span></p>
                            <p>主办单位: <span>xxx</span></p>
                            <p>发行方式: <span>xxx</span></p>
                            <p>日行量: <span>xxx</span></p>
                        </div>
                        <div className="col-md-4">
                            <p>国内刊号: <span>xxx</span></p>
                            <p>创刊时间: <span>xxx</span></p>
                            <p>发行日报: <span>xxx</span></p>
                            <p>报刊版式: <span>xxx</span></p>
                        </div>
                        <div className="col-md-4">
                            <div className="btn-wrapper">
                                <div><Button type="primary">我要发表</Button></div>
                                <div><Button>咨询客服</Button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
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
            id: 'hot',
            title: '热门期刊'
        }, {
            id: 'effect',
            title: '影响因子'
        }]
        return (
            <div className="container-sm periodical-list">

                {this.store.lists?<ArticleList list={this.store.lists}/>:null}

                <div style={{textAlign: 'right'}}>
                    <Pagination size="small" style={{marginTop: 30, marginBottom: 30}} onChange={(page, size)=>{this.store.changePage(page)}} defaultCurrent={this.store.currentPage} total={this.store.total} />
                </div>
            </div>
        )
    }
}

export default PeriodicalList;