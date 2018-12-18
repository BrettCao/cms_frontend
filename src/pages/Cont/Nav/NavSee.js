import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Form, Button } from 'antd';
import Link from 'umi/link';
import 'braft-editor/dist/index.css';
import styles from './NavSee.less';

const FormItem = Form.Item;

// @connect(({ navedit }) => ({}))
@Form.create()
class NavSee extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.navesee}>
        <h3>导航内容</h3>
        <Form className={styles.form} layout="inline">
          <Row>
            <FormItem label="导航名称：">{}</FormItem>
          </Row>
          <Row>
            <FormItem label="导航图片：">
              <img href="baidu.com" alt="navpic" />
            </FormItem>
          </Row>
          <Row>
            <Button>
              <Link to="/cms/nav/navedit">去编辑</Link>
            </Button>
          </Row>
        </Form>
        <h3>导航属性</h3>
        <Form className={styles.form} layout="inline">
          <Row>
            <FormItem label="栏目属性：">{}</FormItem>
          </Row>
          <Row>
            <FormItem label="target方式：">{}</FormItem>
          </Row>
          <Row>
            <FormItem label="主导航副导航：">{}</FormItem>
          </Row>
          <Row>
            <FormItem label="显示状态：">{}</FormItem>
          </Row>
          <Row>
            <FormItem label="导航顺序：">{}</FormItem>
          </Row>
        </Form>
      </div>
    );
  }
}

export default NavSee;
