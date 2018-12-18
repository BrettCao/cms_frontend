import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Form, Input, Radio, Select, Button } from 'antd';
import PicturesWell from '@/components/PicturesWell';
import styles from './DownAdd.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select;
const { TextArea } = Input;

function handleChange(value) {
  console.log(`selected${value}`);
}

@Form.create()
class DownAdd extends Component {
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
        <h3>添加下载文件</h3>
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
            <FormItem label="文件类别：">
              {getFieldDecorator('navname')(
                <Select defaultValue="类别一" style={{ width: 150 }} onChange={handleChange}>
                  <Option value="lucy">类别一</Option>
                  <Option value="disabled">类别二</Option>
                  <Option value="jack">类别三</Option>
                </Select>
              )}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="文件标题：">
              {getFieldDecorator('columnproperty')(<Input className={styles.ipt} />)}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="文件内容：">
              {getFieldDecorator('navpic')(
                <Fragment>
                  <PicturesWell />
                  <span>(允许格式：gif、jpg、jpeg、bmp、png)</span>
                </Fragment>
              )}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="关联产品：">
              {getFieldDecorator('navname')(
                <Select defaultValue="产品一" style={{ width: 150 }} onChange={handleChange}>
                  <Option value="lucy">产品一</Option>
                  <Option value="disabled">产品二</Option>
                  <Option value="jack">产品三</Option>
                </Select>
              )}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="下载禁制：">
              {getFieldDecorator('navname')(
                <Select defaultValue="全部" style={{ width: 150 }} onChange={handleChange}>
                  <Option value="lucy">全部</Option>
                  <Option value="disabled">会员下载</Option>
                  <Option value="jack">一级</Option>
                </Select>
              )}
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

export default DownAdd;
