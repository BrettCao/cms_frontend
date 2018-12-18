import React, {Component} from 'react';

import {observable, action, runInAction} from 'mobx'
import {observer} from 'mobx-react';
import './index.module.css';
import {Button, Pagination, Popover, Icon } from 'antd';
import axios from 'axios';
import {ItemList} from '../ItemList/Index';

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
    }

    listDb(){
        const _this = this;
        return new Promise((resolve, reject)=> {
            axios.get(`./json/p.json`, {
                params: {
            
                    page: _this.currentPage,
                    sort: _this.sort?_this.sort.id:null
                }
            }).then( response => {
                return response.data.message;
            }).then( data => {
                resolve(data);
                return;
            }).catch(e => {
                reject(e);
            })
        })
    }

    async listSource() {
        try {
            const {lists, total} = await this.listDb();
            this.lists = lists;
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
            id: 'hot',
            title: '热门出版社'
        }, {
            id: 'rank',
            title: '综合排行'
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
                    <Pagination size="small" style={{marginTop: 30, marginBottom: 30}} onChange={(page, size)=>{this.store.changePage(page)}} defaultCurrent={this.store.currentPage} total={this.store.total} />
                </div>
            </div>
        )
    }
}

export default MonographsList;