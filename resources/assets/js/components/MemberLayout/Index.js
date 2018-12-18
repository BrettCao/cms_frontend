/**
 * Created by Smile on 2018/4/24.
 */
import React, {Component} from 'react';
import {Row, Col, Button} from 'antd';
import Footer from '../widgets/Footer';
import CommonHead from '../CommonHead';
import MemberMenu from  '../MemberMenu';

class Layout extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div {...this.props}>
                <CommonHead/>
                <div className="container-sm">
                    <Row style={{marginBottom: 40, marginTop: 40}}>
                        <Col span={4}>
                            <img style={{height: 150,width: 150}} src="./desktop/image/face.png"/>
                        </Col>
                        <Col span={19} push={1}>
                            <h1>LCAY <Button>编辑资料</Button></h1>
                            <div style={{marginTop: 30}}>拥有积分 213 发表数123 参与话题181</div>
                        </Col>
                    </Row>
                    <Row style={{marginBottom: 30}}>
                        <Col span={4}>
                            <MemberMenu/>
                        </Col>
                        <Col span={20}>
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