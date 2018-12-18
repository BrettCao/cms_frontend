import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Form, Input, Radio, Select, Button } from 'antd';
import PicturesWell from '@/components/PicturesWell';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import styles from './PicAdd.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select;

function handleChange(value) {
  console.log(`selected${value}`);
}

@Form.create()
class PicAdd extends Component {
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
        <h3>添加图片</h3>
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
            <FormItem label="图片位置：">
              {getFieldDecorator('navname')(
                <Select defaultValue="首页banner图" style={{ width: 150 }} onChange={handleChange}>
                  <Option value="jack">首页banner图</Option>
                  <Option value="lucy">类别一</Option>
                  <Option value="disabled">类别二</Option>
                </Select>
              )}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="图片标题：">
              {getFieldDecorator('columnproperty')(<Input className={styles.ipt} />)}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="内容：">
              {getFieldDecorator('mainordeputy')(
                <BraftEditor style={{ border: '1px solid #bababb', borderRadius: 10 }} />
              )}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="图片：">
              {getFieldDecorator('navpic')(
                <Fragment>
                  <PicturesWell />
                  <span>(允许格式：gif、jpg、jpeg、bmp、png)</span>
                </Fragment>
              )}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="跳转链接：">
              {getFieldDecorator('navorder')(<Input className={styles.ipt} />)}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="是否显示：">
              {getFieldDecorator('showstate')(
                <RadioGroup>
                  <Radio value={9}>是</Radio>
                  <Radio value={10}>否</Radio>
                </RadioGroup>
              )}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="图片顺序：">
              {getFieldDecorator('navorder')(<Input className={styles.ipt} />)}
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

export default PicAdd;
