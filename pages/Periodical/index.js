import React, {Component} from 'react';
import Footer from '../../components/widgets/Footer';
import {observable, action, runInAction} from 'mobx';
import {observer} from 'mobx-react';
import styles from './index.module.css';
import  PeriodicalFilter from '../../components/PeriodicalFilter/Index';
import  PeriodicalList from '../../components/PeriodicalList/Index';
import CommonHead from '../../components/CommonHead'
import Layout from '../../components/Layout/Index';
import {SEOHeader} from '../../components/SEOHeader';
import Document from 'next/document';
import {aRequest} from '../../components/request';

class Store {
    @observable type = null; //刊物级别
    @observable area = null;//出版地区
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

    constructor(types, pro) {
        this.tArray = types;
        this.aArray = pro;
    }

    async inid() {
        try {
            this.listSource();
        } catch(e) {
            throw e;
        }
    }

    renderCycle(id) {
        let title = null;
        this.cArray.map(item => {
           if(item.id == id) {
               title = item.title;
           }
        });
        return title;
    }
    async listSource() {
        const _this = this;
        try {
            const {list, total} = await aRequest('get', '/choose', {
                params: {
                    category_one: _this.type?_this.type:null,
                    publish_area_id: _this.area,
                    publish_cycle: _this.renderCycle( _this.cycle),
                    publish_date: _this.date,
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
        this.listSource();
    }
}



@observer
class Index extends Document {
    constructor(props) {
        super(props);
        this.state = new Store(this.props.categories, this.props.provinces,);

    }

    static async getInitialProps() {
        const {categories, provinces} = await aRequest('get', '/journal_type_list');
        return { categories, provinces };
    }

    componentDidMount() {
        this.state.inid();
    }

    render() {
        return (
            <div>
                <CommonHead/>
                <SEOHeader title="学术期刊"/>
                <div className="periodical-wrapper-dom">
                    <div className="img-wrapper">
                        <img src="/static/image/journal.png"/>
                    </div>
                    <PeriodicalFilter store = {this.state}/>
                    <PeriodicalList store = {this.state}/>
                    <Footer/>
                </div>
            </div>
        )
    }
}

export default Index;