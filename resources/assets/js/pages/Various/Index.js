/**
 * Created by Smile on 2018/4/13.
 */
import React, {Component} from 'react';
import Footer from '../../components/widgets/Footer';
import {observable, action, runInAction} from 'mobx'
import {observer} from 'mobx-react';
import './index.module.css';
import VariousHeader from '../../components/VariousHeader';
import VariousLeftNav from '../../components/VariousLeftNav';
import axios from 'axios';
import CommonHead from '../../components/CommonHead';
import { Row, Col, Pagination } from 'antd';
import {VariousList} from '../../components/VariousList';
import {withRouter} from 'react-router-dom';

class Store {
    @observable sort = null;
    @observable tab = null;
    @observable list = null;
    @observable currentPage = null;
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
            const {list, total} = await this.listDb();
            this.list = list;
            this.total = total;
        } catch(e) {
            this.list = null;
            throw e;
        }
    }

    async dbSource() {
        try {
            this.categorys = await this.db();
            this.listSource();
        } catch(e) {
            this.categorys = null;
            throw e;
        }
    }

    @action
    changeSort(item) {
        this.sort = item;
        this.listSource();
    }

    @action
    triggerTab(item) {
        this.tab = item;
        this.listSource();
    }

    @action
    triggerLeft(item) {
        this.li = item
        this.listSource();
    }


    @action
    changePage(page) {
        this.currentPage = page;
        this.listSource();
    }
}
@observer
class VariousPage extends Component {
    constructor(props) {
        super(props);   
        this.store = new Store()

    }
    componentDidMount() {
        
        console.log(this.store)
    }
    render() {
        const {history} = this.props
        return (
            <div className="">
                <CommonHead/>
                <div className="periodical-wrapper-dom">
                    <div className="img-wrapper">
                        <img src="desktop/image/p-img.png"/>
                    </div>
                    <div className="container-sm">
                        <VariousHeader store={this.store}/>
                        <div style={{paddingTop: 10, marginBottom:30}}>
                            <Row>
                                <Col span={21} push={3}>
                                    {this.store.list?<VariousList history={history} list={this.store.list}/>:<div style={{padding: 30, textAlign: 'center'}}>暂无信息</div>}
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

export default withRouter(VariousPage);