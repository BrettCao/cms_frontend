import React, {Component} from 'react';
import { Row, Col, Button } from 'antd';
import Footer from '../../components/widgets/Footer';
import CommonHead from '../../components/CommonHead';
import styles from  '../../pages/ShowPeriodical/index.module.css';
import {SEOHeader} from '../../components/SEOHeader';
import {aRequest} from '../../components/request';
import Document from 'next/document';
import {QQ, PQQ} from '../../components/config';

class Index extends Document {
    constructor(props) {
        super(props);
    }

    static async getInitialProps({query: {uuid}}) {
        const data = await aRequest('get', `/media_detail/`, {
            params: {
                id: uuid
            }
        });
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
                    <h2 style={{marginBottom: 20, width: '80%'}}>{periodical.title} <span style={{fontSize: 12}}>{periodical.e_title}</span></h2>
                    <Row className={styles.component}>
                        <Col span={24}>
                            <Row>
                                <Col span={4}>
                                    <img style={{height: '100%', width: '100%', maxHeight: 250, objectFit: 'contain'}} src={periodical.url}/>
                                </Col>
                                <Col style={{padding: 10}} span={7}>
                                    <p>主管单位: {periodical.competent || '暂无'}</p>
                                    <p>主办单位: {periodical.unit}</p>
                                    <p>发行方式: <span>{periodical.issue}</span></p>
                                    <p>日行量: <span>{periodical.num}</span></p>
                                </Col>
                                <Col style={{padding: 10}} span={7}>
                                    <p>国内刊号: <span>{periodical.issn}</span></p>
                                    <p>创刊时间: <span>{periodical.start_publish_date}</span></p>
                                    <p>发行周期: <span>{periodical.cycle}</span></p>
                                    <p>报刊版式: <span>{periodical.press}</span></p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </section>
                <div className={styles.periodicalTool} style={{textAlign: 'center', padding: 10, width: '80%', margin: 'auto', marginTop: 30}}>
                    <a onClick={() => document.getElementById("top1").scrollIntoView()} style={{margin: '0 10px', color: "#444", fontSize: 16, fontWeight: 600}}>介绍</a>
                    <div className={styles.psTool}>
                        <Button onClick={() => window.location.href=`http://wpa.qq.com/msgrd?v=3&uin=${QQ}&site=qq&menu=yes`}>咨询客服</Button>
                        <Button onClick={() => window.location.href=`http://wpa.qq.com/msgrd?v=3&uin=${PQQ}&site=qq&menu=yes`} type="primary">我要发表</Button>
                    </div>
                </div>
                <div style={{height: 1, width: '100%', backgroundColor: '#eeeeee', marginBottom: 20}}></div>
                <div className="container-sm" style={{paddingBottom: 30}}>
                    <section id="top1" style={{marginBottom: 20}}>
                        <h3 style={{marginBottom: 10}}>介绍</h3>
                        <div style={{minHeight: 1000}} dangerouslySetInnerHTML={createMarkup(periodical.content)}>
                        </div>
                    </section>

                </div>
                <Footer/>
            </div>
        )
    }
}

export default Index;