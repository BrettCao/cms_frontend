/**
 * Created by Smile on 2018/4/13.
 */
import React, {Component} from 'react';
import Footer from '../../components/widgets/Footer';
import {observable, action, runInAction} from 'mobx'
import {observer} from 'mobx-react';
import '../../pages/Periodical/index.module.css';
import VariousHeader from '../../components/VariousHeader';
import VariousLeftNav from '../../components/VariousLeftNav';
import axios from 'axios';
import CommonHead from '../../components/CommonHead';
import { Row, Col, Pagination } from 'antd';
import {VariousList} from '../../components/VariousList';
import {aRequest} from "../../components/request";
import {SEOHeader} from "../../components/SEOHeader";
import Document from 'next/document';
class Store {
    @observable sort = null;
    @observable tab = null;
    @observable list = null;
    @observable currentPage = 1;
    @observable total = 1;

    @observable categorys = null;
    @observable li = null;

    constructor() {
        this.dbSource();
    }


    db() {
        return new Promise((resolve, reject)=> {
            axios.get(`./json/type.json`).then( response => {
                return response.data.message;
            }).then( data => {
                resolve(data);
                return
            }).catch(e => {
                reject(e);
            })
        })
    }

    listDb() {
        return new Promise((resolve, reject)=> {
            axios.get(`./json/lists.json`).then( response => {
                return response.data.message;
            }).then( data => {
                resolve(data);
                return
            }).catch(e => {
                reject(e);
            })
        })
    }

    async listSource() {
        try {
            const {list, total} = await aRequest('get', '/paper_list', {
                params: {
                page: this.currentPage,
                type: this.tab?this.tab.id:null,
                sort: this.sort,
                id: this.li?this.li.id:null
            }
            });
            this.list = list;
            this.total = total;
        } catch(e) {
            this.list = null;
            throw e;
        }
    }

    async dbSource(type) {
        try {
            this.categorys = await aRequest('get', '/ajax_paper_type', {
                params: {
                    type
                }
            });
            // this.listSource();
        } catch(e) {
            this.categorys = null;
            throw e;
        }
    }

    @action
    changeSort(item) {
        this.sort = item;

        this.currentPage = 1;
        this.listSource();
    }

    @action
    triggerTab(item) {
        this.tab = item;

        this.currentPage = 1;
        this.dbSource(item.id);
    }

    @action
    triggerLeft(item) {
        this.li = item;
        this.currentPage = 1;
        this.listSource();

    }


    @action
    changePage(page) {
        this.currentPage = page;
        this.currentPage = 1;
        this.listSource();

    }
}
@observer
class VariousPage extends Document {
    constructor(props) {
        super(props);   
        this.store = new Store()

    }
    static async getInitialProps({query}) {
        return { type: query.id };
    }
    componentDidMount() {
        
    }
    render() {
        const {history} = this.props;
        return (
            <div className="">
                <SEOHeader title="论文大全"/>
                <CommonHead/>
                <div className="periodical-wrapper-dom">
                    <div className="img-wrapper">
                        <img src="/static/image/re.png"/>
                    </div>
                    <div className="container-sm">
                        <VariousHeader type={this.props.type} store={this.store}/>
                        <div style={{paddingTop: 10, marginBottom:30}}>
                            <Row>
                                <Col span={21} push={3}>
                                    {this.store.list && this.store.list.length> 0?<VariousList history={history} list={this.store.list}/>:<div style={{padding: 30, marginLeft: '-110px', textAlign: 'center'}}>暂无信息</div>}
                                    <div style={{textAlign: 'right'}}>
                                        <Pagination size="small" style={{marginTop: 30, marginBottom: 30}} onChange={(page, size)=>{this.store.changePage(page)}} defaultCurrent={this.store.currentPage} total={this.store.total} />
                                    </div>
                                </Col>
                                <Col span={3} pull={21}>
                                    <VariousLeftNav  store={this.store}/>
                                </Col>
                            </Row>
                        </div>
                    </div>

                    
                </div>
                <Footer/>
            </div>
        )
    }
}

export default VariousPage;