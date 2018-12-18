import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Form, Input, Radio, Select, Button } from 'antd';
import PicturesWell from '@/components/PicturesWell';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import styles from './CaseAdd.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select;
const { TextArea } = Input;

function handleChange(value) {
  console.log(`selected${value}`);
}

@Form.create()
class CaseAdd extends Component {
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
        <h3>添加案例</h3>
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
            <FormItem label="类别：">
              {getFieldDecorator('navname')(
                <Select defaultValue="类别一" style={{ width: 150 }} onChange={handleChange}>
                  <Option value="jack">类别一</Option>
                  <Option value="lucy">类别二</Option>
                  <Option value="disabled">类别三</Option>
                </Select>
              )}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="XX标题：">
              {getFieldDecorator('columnproperty')(<Input className={styles.ipt} />)}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="XX简介：">{getFieldDecorator('targetmode')(<TextArea />)}</FormItem>
          </Row>
          <Row>
            <FormItem label="XX内容：">
              {getFieldDecorator('mainordeputy')(
                <BraftEditor style={{ border: '1px solid #bababb', borderRadius: 10 }} />
              )}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="XX相关图片：">
              {getFieldDecorator('navpic')(
                <Fragment>
                  <PicturesWell />
                  <span>(允许格式：git、jpg、jpeg、bmp、png)</span>
                </Fragment>
              )}
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
            <FormItem label="是否首页显示：">
              {getFieldDecorator('showstate')(
                <RadioGroup>
                  <Radio value={9}>是</Radio>
                  <Radio value={10}>否</Radio>
                </RadioGroup>
              )}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="是否导航显示：">
              {getFieldDecorator('showstate')(
                <RadioGroup>
                  <Radio value={9}>是</Radio>
                  <Radio value={10}>否</Radio>
                </RadioGroup>
              )}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="新闻顺序：">
              {getFieldDecorator('navorder')(<Input className={styles.ipt} />)}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="Seo Title：">
              {getFieldDecorator('navorder')(<Input className={styles.ipt} />)}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="Seo Keywords：">
              {getFieldDecorator('navorder')(<Input className={styles.ipt} />)}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="Seo Description：">
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

export default CaseAdd;
