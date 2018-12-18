import React, {Component} from 'react';

import {observable, action} from 'mobx'
import {observer} from 'mobx-react';
import Layout from '../../components/Layout/Index';
import { Row, Col, Button } from 'antd';
import Footer from '../../components/widgets/Footer';
import CommonHead from '../../components/CommonHead';
import './index.module.css';

class Store {

}

const state = new Store();

@observer
class Index extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <CommonHead/>
                <section style={{marginBottom: 40, marginTop: 50, width: '80%', margin: 'auto'}}>
                    <h2 style={{marginBottom: 20, width: '80%'}}>什么学榨汁 <span>en</span></h2>
                    <Row>
                        <Col span={16}>
                            <Row>
                                <Col span={8}>
                                    <img style={{height: '100%', width: '100%', maxHeight: 250}} src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2740658110,3259139712&fm=58&bpow=732&bpoh=1000"/>
                                </Col>
                                <Col style={{padding: 10}} span={8}>
                                    <p>主管单位: </p>
                                    <p>主办单位: </p>
                                    <p>中国分类: </p>
                                    <p>出版地去: </p>
                                    <p>期刊级别: </p>
                                    <p>国际刊号: </p>
                                </Col>
                                <Col style={{padding: 10}} span={8}>
                                    <p>国内期刊号: </p>
                                    <p>创刊时间: </p>
                                    <p>发行时间: </p>
                                    <p>期刊开本: </p>
                                    <p>审核时间: </p>
                                    <p>影响因子: </p>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={8}>
                            <h4>生物血炸至</h4>
                            <p>主编: name</p>
                            <p>地址: </p>
                            <p>邮编: </p>
                            <p>咨询: </p>
                            <p>授权: </p>
                            <p>发表: </p>
                            <p>网址: </p>
                        </Col>
                    </Row>
                </section>
                <div className="periodical-tool" style={{textAlign: 'center', padding: 10, width: '80%', margin: 'auto', marginTop: 30}}>
                    <a onClick={() => document.getElementById("top1").scrollIntoView()} style={{margin: '0 10px', color: "#444", fontSize: 16, fontWeight: 600}}>期刊介绍</a>
                    <a onClick={() => document.getElementById("top2").scrollIntoView()} style={{margin: '0 10px', color: "#444", fontSize: 16, fontWeight: 600}}>栏目介绍</a>
                    <a onClick={() => document.getElementById("top3").scrollIntoView()} style={{margin: '0 10px', color: "#444", fontSize: 16, fontWeight: 600}}>征稿要求</a>
                    <div className="ps-tool">
                        <Button>咨询客服</Button>
                        <Button type="primary">我要发表</Button>
                    </div>
                </div>
                <div style={{height: 1, width: '100%', backgroundColor: '#eeeeee', marginBottom: 20}}></div>
                <div className="container-sm" style={{paddingBottom: 30}}>
                    <section id="top1" style={{marginBottom: 20}}>
                        <h3 style={{marginBottom: 10}}>期刊介绍</h3>
                        <div style={{height: 1000}}>
                            质量与市场.个
                        </div>
                    </section>
                    <section id="top2" style={{marginBottom: 20}}>
                        <h3 style={{marginBottom: 10}}>栏目介绍</h3>
                        <div>
                            质量与市场.个
                        </div>
                    </section>
                    <section id="top3" style={{marginBottom: 20}}>
                        <h3 style={{marginBottom: 10}}>征稿要求</h3>
                        <div>
                            质量与市场.个
                        </div>
                    </section>

                </div>
                <Footer/>
            </div>
        )
    }
}

export default Index;