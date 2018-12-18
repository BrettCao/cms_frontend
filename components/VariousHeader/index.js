import React, {Component} from 'react';
import {Popover, Icon} from 'antd';

import {observer} from 'mobx-react';
import {SortItem} from '../SortItem/Index';
import './index.module.css';

export const Tabs = ({items, store}) => {
    return (
        <div className="header-tabs">
        <ul>
            {items.map((tab, i)=>(
                <li
                className={[
                    store.tab&&store.tab.id===tab.id?'active':''
                ].join(' ')}
                 onClick={()=>{store.triggerTab(tab)}} key={i}>{tab.title}</li>
            ))}
        </ul> 
    </div>)
};
const tabs = [{
            id: '0',
            title: ''
        },{
            id: 1,
            title: '论文范文',
        }, {
            id: 2,
            title: '应用文',
        }, {
            id: 3,
            title: '资料下载'
        }];

@observer
class VariousHeader extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.store.triggerTab(tabs[Number(this.props.type)]);
        this.store.listSource();
    }

    render() {
        this.store = this.props.store;

        const items = [{
            id: null,
            title: '默认排序'
        },{
            id: 1,
            title: '浏览量'
        }];
        return (
            <div className="various-header">
                <div data-id={this.store.tab?this.store.tab.id: ''}>
                    <Tabs  store={this.store} items={tabs}/>
                    <span className="sort-way">排序方式: 
                        <Popover placement="bottom" content={<SortItem items={items} store={this.store}/>} trigger="click">
                            <strong  className="sort-text">{this.store.sort?this.store.sort.title: '默认排序'}<Icon type="down" /></strong>
                        </Popover>
                    </span>
                    
                </div>
            </div>
        )
    }
}

export default VariousHeader;