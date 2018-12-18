import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Form, Input, Radio, Select, Button } from 'antd';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import styles from './PageAdd.less';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

function handleChange(value) {
  console.log(`selected${value}`);
}

@Form.create()
class PageAdd extends Component {
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
        <h3>添加单页</h3>
        <Form className={styles.form} layout="inline">
          <Row>
            <FormItem label="标题：">
              {getFieldDecorator('navname')(<Input className={styles.ipt} />)}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="模板：">
              {getFieldDecorator('navname')(
                <Select defaultValue="模板一" style={{ width: 150 }} onChange={handleChange}>
                  <Option value="jack">模板一</Option>
                  <Option value="lucy">模板二</Option>
                  <Option value="disabled">模板三</Option>
                </Select>
              )}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="关键词：">
              {getFieldDecorator('columnproperty')(<Input className={styles.ipt} />)}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="摘要：">{getFieldDecorator('targetmode')(<TextArea />)}</FormItem>
          </Row>
          <Row>
            <FormItem label="内容：">
              {getFieldDecorator('mainordeputy')(
                <BraftEditor
                  style={{
                    border: '1px solid #bababb',
                    borderRadius: 10,
                  }}
                />
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

export default PageAdd;
