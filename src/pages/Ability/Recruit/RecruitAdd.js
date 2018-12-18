import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Form, Input, Radio, Select, Button } from 'antd';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import styles from './RecruitAdd.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select;
const { TextArea } = Input;

function handleChange(value) {
  console.log(`selected${value}`);
}

@Form.create()
class RecruitAdd extends Component {
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
        <h3>添加招聘</h3>
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
            <FormItem label="职位：">
              {getFieldDecorator('columnproperty')(<Input className={styles.ipt} />)}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="学历要求：">
              {getFieldDecorator('navname')(
                <Select defaultValue="本科" style={{ width: 150 }} onChange={handleChange}>
                  <Option value="jack">本科</Option>
                  <Option value="lucy">专科</Option>
                  <Option value="disabled">硕士</Option>
                </Select>
              )}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="简介：">{getFieldDecorator('columnproperty')(<TextArea />)}</FormItem>
          </Row>
          <Row>
            <FormItem label="内容：">
              {getFieldDecorator('mainordeputy')(
                <BraftEditor style={{ border: '1px solid #bababb', borderRadius: 10 }} />
              )}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="招聘邮箱：">
              {getFieldDecorator('navorder')(<Input className={styles.ipt} />)}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="薪资待遇：">
              {getFieldDecorator('navorder')(<Input className={styles.ipt} />)}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="招聘人数：">
              {getFieldDecorator('navorder')(<Input className={styles.ipt} />)}
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

export default RecruitAdd;
