/**
 * Created by Smile on 2018/4/24.
 */
import React, {Component} from 'react';
import {Row, Col, Button} from 'antd';
import Footer from '../widgets/Footer';
import CommonHead from '../CommonHead';
import MemberMenu from  '../MemberMenu';
import {aRequest} from "../request";
import Link from 'next/link';

class Layout extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        data: {}
    };

    async componentDidMount() {
        try {
            const data = await aRequest('get', '/ajax_logo');
            console.log(data);
            this.setState({
                data
            })
        }
        catch (e) {
            <Link href="/"/>;
            throw new Error(e);
        }
    }

    render() {
        const {data} = this.state;
        return (
            <div {...this.props}>
                <CommonHead/>
                <div className="container-sm">
                    <Row style={{marginBottom: 40, marginTop: 40}}>
                        <Col span={4}>
                            <img style={{height: 150,width: 150}} src={data.url}/>
                        </Col>
                        <Col span={19} push={1}>
                            <h1>{data.name} <Link href="/Member"><Button>编辑资料</Button></Link></h1>
                            <div style={{marginTop: 30}}>发表数{data.topic_num || 0} &nbsp; 参与话题{data.comment_num || 0}</div>
                        </Col>
                    </Row>
                    <Row style={{marginBottom: 30}}>
                        <Col span={4}>
                            <MemberMenu/>
                        </Col>
                        <Col span={19} push={1}>
                            {this.props.children}
                        </Col>
                    </Row>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Layout;