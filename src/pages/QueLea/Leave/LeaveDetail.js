import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Form, Input, Radio, Button } from 'antd';
import 'braft-editor/dist/index.css';
import styles from './LeaveDetail.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

function handleChange(value) {
  console.log(`selected${value}`);
}

@Form.create()
class LeaveDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <div background="#fff">
        <h3>留言详情</h3>
        <Form className={styles.form} layout="inline">
          <Row>
            <FormItem label="用户账号：">{getFieldDecorator('columnproperty')(<Input />)}</FormItem>
          </Row>
          <Row>
            <FormItem label="用户名称：">
              {getFieldDecorator('navorder')(<Input className={styles.ipt} />)}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="联系手机号：">
              {getFieldDecorator('navorder')(<Input className={styles.ipt} />)}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="联系邮箱：">
              {getFieldDecorator('navorder')(<Input className={styles.ipt} />)}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="联系邮箱：">
              {getFieldDecorator('navorder')(<Input className={styles.ipt} />)}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="留言时间：">
              {getFieldDecorator('columnproperty')(<TextArea />)}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="处理状态：">
              {getFieldDecorator('showstate')(
                <RadioGroup>
                  <Radio value={9}>已处理</Radio>
                  <Radio value={10}>未处理</Radio>
                </RadioGroup>
              )}
            </FormItem>
          </Row>
        </Form>
        <div style={{ marginTop: 20 }}>
          <Button>保存</Button>
          <Button style={{ marginLeft: 20 }}>返回</Button>
        </div>
      </div>
    );
  }
}

export default LeaveDetail;
