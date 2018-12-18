import React, {Component} from 'react';
import Footer from '../../components/widgets/Footer';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';
import './index.module.css';
import {Popover, Icon} from 'antd';
import  MediaFilter from '../../components/MediaFilter';
import  MediaList from '../../components/MediaList';
import CommonHead from '../../components/CommonHead'
import {SEOHeader} from '../../components/SEOHeader';
import {aRequest} from '../../components/request';

class Store {
    @observable type = null; //刊物级别
    @observable area = null;//出版地区
    @observable switch = 2;//顶部分类
    @observable cycle = null;//出版周期
    @observable date = null;//创刊时间

    @observable lists = [];

    @observable currentPage = 1;
    @observable total = 1;

    @observable sort = null;

    @observable tArray = [];
    @observable aArray = [];
    dArray = [{
        id: '1',
        title: '1949-1957'
    }, {
        id: '2',
        title: '1958-1978'
    }, {
        id: '3',
        title: '1979-1999'
    }, {
        id: '4',
        title: '2000'
    }];
    cArray = [{
        id: 1,
        title: '周刊'
    }, {
        id: 2,
        title: '旬刊'
    }, {
        id: 3,
        title: '半月刊'
    }, {
        id: 4,
        title: '月刊'
    }, {
        id: 5,
        title: '双月刊'
    }, {
        id: 6,
        title: '季刊'
    }];

    constructor() {
        // this.inid();
    }

    renderTitle(id) {
        let title = '';
        this.cArray.map(item => {
            if(item.id == id) {
                title = item.title;
            }
        });
        return title;
    }

    // async inid() {
    //     try {
    //         this.tArray = await this.db('level');
    //         this.aArray = await this.db("area");
    //         this.listSource();
    //     } catch(e) {
    //         throw e;
    //     }
    // }

    async listSource() {
        try {
            const _this = this;
            const {list, total} = await aRequest('get', '/media_list', {
                params: {
                    publish_cycle: _this.renderTitle(_this.cycle),
                    publish_date: _this.date,
                    page: _this.currentPage,
                    type: _this.switch,
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
    changeType (value) {
        this.type = value;
        this.listSource();
    }

    @action
    changeArea (value) {
        this.area = value;
        this.listSource();
    }

    @action
    changeCycle (value) {
        this.cycle = value;
        this.listSource();
    }

    @action
    changeDate (value) {
        this.date = value;
        this.listSource();
    }

    @action
    changePage(page) {

        this.currentPage = page;
        this.listSource();
    }

    @action
    changeSort(sort) {
        this.sort = sort;
        this.total = null;
        this.listSource();
    }

    @action
    changeSwitch(val) {
        this.total = null;
        this.switch = val;
        this.listSource();
    }
}

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
class Index extends Component {
    constructor(props) {
        super(props);

        this.state = new Store();
    }

    componentDidMount() {
        this.state.listSource();
    }

    render() {
        const items = [{
            id: null,
            title: '默认排序'
        },{
            id: 1,
            title: '浏览量'
        }]
        return (
            <div>
                <SEOHeader title="其他纸媒"/>
                <CommonHead/>
                <div className="periodical-wrapper-dom">
                    <div className="img-wrapper">
                        <img src="/static/image/other.png"/>
                    </div>
                    <div className="periodical-list container-sm">
                        <span className={[this.state.switch===2?'active':'']} onClick={() => this.state.changeSwitch(2)} style={{fontSize: 16, fontWeight: 500, margin: '0 10px'}}>报纸</span>
                        <span className={[this.state.switch===1?'active':'']}  onClick={() => this.state.changeSwitch(1)} style={{fontSize: 16, fontWeight: 500, margin: '0 10px'}}>期刊</span>
                        <div className="sort">
                            <span>排序方式:
                                <Popover placement="bottom" content={<SortItem store={this.state} items={items}/>} trigger="click">
                                    <strong className="sort-text">{this.state.sort?this.state.sort.title: '默认排序'}<Icon type="down" /></strong>
                                </Popover>
                            </span>
                        </div>
                    </div>
                    <MediaFilter store = {this.state}/>
                    <MediaList store = {this.state}/>
                    <Footer/>
                </div>
            </div>
        )
    }
}

export default Index;