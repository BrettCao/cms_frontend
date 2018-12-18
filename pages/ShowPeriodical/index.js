import React, {Component} from 'react';
import { Row, Col, Button } from 'antd';
import Footer from '../../components/widgets/Footer';
import CommonHead from '../../components/CommonHead';
import styles from  './index.module.css';
import {SEOHeader} from '../../components/SEOHeader';
import {aRequest} from '../../components/request';
import Document from 'next/document';
import {QQ, PQQ} from '../../components/config';

class Index extends Document {
    constructor(props) {
        super(props);
    }

    static async getInitialProps({query: {uuid}}) {
        const {data} = await aRequest('get', `/show/${uuid}`);
        return { periodical: data };
    }
    render() {
        const {periodical} = this.props;
        function createMarkup(html) {
            return {__html: html}
        }
        return (
            <div>
                <SEOHeader title={periodical.title}/>
                <CommonHead/>
                <section className="container-sm" style={{marginBottom: 40, marginTop: 60, margin: 'auto'}}>
                    <h2 style={{marginBottom: 20, width: '80%'}}>{periodical.title} <span style={{fontSize: 12}}>{periodical.en_title}</span></h2>
                    <Row className={styles.component}>
                        <Col span={24}>
                            <Row>
                                <Col span={4}>
                                    <img style={{height: '100%', width: '100%', maxHeight: 250, objectFit: 'contain'}} src={periodical.face_img}/>
                                </Col>
                                <Col style={{padding: 10}} span={7}>
                                    <p>主管单位: {periodical.competent_unit || '暂无'}</p>
                                    <p>主办单位: {periodical.host_unit}</p>
                                    <p>中图分类: </p>
                                    <p>出版地区: {periodical.publish_area}</p>
                                    <p>知网收录: {periodical.is_include?'是':'否'}</p>
                                    <p>国际刊号: {periodical.CN}</p>
                                </Col>
                                <Col style={{padding: 10}} span={7}>
                                    <p>国内期刊号: {periodical.ISSN}</p>
                                    <p>创刊时间: {periodical.start_publish_date}</p>
                                    <p>发行周期: {periodical.publish_cycle}</p>
                                    <p>期刊开本: {periodical.folio}</p>
                                    <p>语种: {periodical.languages}</p>
                                    <p>来源期刊: {periodical.source_journals}</p>
                                    <p>影响因子: {periodical.comprehensive}</p>
                                    <p>复合因子: {periodical.compound}</p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </section>
                <div className={styles.periodicalTool} style={{textAlign: 'center', padding: 10, width: '80%', margin: 'auto', marginTop: 30}}>
                    <a onClick={() => document.getElementById("top1").scrollIntoView()} style={{margin: '0 10px', color: "#444", fontSize: 16, fontWeight: 600}}>期刊介绍</a>
                    <div className={styles.psTool}>
                        <Button onClick={() => window.location.href=`http://wpa.qq.com/msgrd?v=3&uin=${QQ}&site=qq&menu=yes`}>咨询客服</Button>
                        <Button onClick={() => window.location.href=`http://wpa.qq.com/msgrd?v=3&uin=${PQQ}&site=qq&menu=yes`} type="primary">我要发表</Button>
                    </div>
                </div>
                <div style={{height: 1, width: '100%', backgroundColor: '#eeeeee', marginBottom: 20}}></div>
                <div className="container-sm" style={{paddingBottom: 30}}>
                    <section id="top1" style={{marginBottom: 20}}>
                        <h3 style={{marginBottom: 10}}>期刊要求</h3>
                        <div style={{minHeight: 1000}} dangerouslySetInnerHTML={createMarkup(periodical.notice)}>
                        </div>
                    </section>

                </div>
                <Footer/>
            </div>
        )
    }
}

export default Index;