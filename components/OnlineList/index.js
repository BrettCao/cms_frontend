import React, {Component} from 'react';

import {observable, action} from 'mobx'
import {observer} from 'mobx-react';
import '../MonographsList/index.module.css';
import {Button, Pagination, Popover, Icon } from 'antd';
import {ItemList} from '../ItemList/Index';
import {aRequest} from '../../components/request';

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
class MonographsStore {
    @observable sort = null;

    @observable currentPage = 1;

    @observable lists = [];

    @observable total = 0;

    constructor(){
        this.listSource();
        this.total = 1;
    }
    async listSource() {
        const _this = this;
        try {
            const {list, total} = await aRequest('get', '/book_list', {
                params: {
                    type: 2,
                    page: _this.currentPage,
                    sort: _this.sort?_this.sort.id:null
                }
            });
            this.lists = list;
            this.total = total;
        } catch (e) {
            this.lists = [];
            throw new Error(e);

        }
    }

    @action
    changePage(page) {
        this.currentPage = page;
        this.listSource();
    }

    @action
    changeSort(sort) {
        this.sort = sort;
        this.listSource();
    }
}

@observer
class MonographsList extends Component {
    constructor(props) {
        super(props);
        this.store = new MonographsStore();
    }

    componentDidMount() {

    }

    render() {
        const items = [{
            id: null,
            title: '默认排序'
        },{
            id: 1,
            title: '浏览量排序'
        }, {
            id: 2,
            title: '时间排行'
        }]
        return (
            <div className="container-sm monographs-list">
                <div className="sort">
                    <span>排序方式:
                        <Popover placement="bottom" content={<SortItem store={this.store} items={items}/>} trigger="click">
                            <strong className="sort-text">{this.store.sort?this.store.sort.title: '默认排序'}<Icon type="down" /></strong>
                        </Popover>
                    </span>
                </div>
                <ItemList list={this.store.lists}/>
                <div style={{textAlign: 'right'}}>
                    <Pagination size="small" pageSize={16} style={{marginTop: 30, marginBottom: 30}} onChange={(page, size)=>{this.store.changePage(page)}} defaultCurrent={this.store.currentPage} total={this.store.total} />
                </div>
            </div>
        )
    }
}

export default MonographsList;