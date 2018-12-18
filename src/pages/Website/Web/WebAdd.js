import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Form, Input, Radio, Select, Button } from 'antd';
import 'braft-editor/dist/index.css';
import styles from './WebAdd.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select;
const { TextArea } = Input;

function handleChange(value) {
  console.log(`selected${value}`);
}

@Form.create()
class WebAdd extends Component {
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
        <h3>添加网点</h3>
        <Form className={styles.form} layout="inline">
          <Row>
            <FormItem label="语言：">
              {getFieldDecorator('navname')(
                <Select defaultValue="中文" style={{ width: 150 }} onChange={handleChange}>
                  <Option value="jack">中文</Option>
                  <Option value="lucy">English</Option>
                  <Option value="disabled">日语</Option>
                </Select>
              )}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="网点名称：">
              {getFieldDecorator('columnproperty')(<Input className={styles.ipt} />)}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="网点城市：">
              {getFieldDecorator('navname')(
                <Fragment>
                  <Select defaultValue="省份" style={{ width: 150 }} onChange={handleChange}>
                    <Option value="lucy">类别一</Option>
                    <Option value="disabled">类别二</Option>
                    <Option value="jack">类别三</Option>
                  </Select>
                  <Select defaultValue="城市" style={{ width: 150 }} onChange={handleChange}>
                    <Option value="lucy">类别一</Option>
                    <Option value="disabled">类别二</Option>
                    <Option value="jack">类别三</Option>
                  </Select>
                </Fragment>
              )}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="网点具体地址：">
              {getFieldDecorator('mainordeputy')(<TextArea />)}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="营业时间：">
              {getFieldDecorator('mainordeputy')(<Input className={styles.ipt} />)}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="排序：">
              {getFieldDecorator('navorder')(<Input className={styles.ipt} />)}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="显示状态：">
              {getFieldDecorator('showstate')(
                <RadioGroup>
                  <Radio value={9}>是</Radio>
                  <Radio value={10}>否</Radio>
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

export default WebAdd;
