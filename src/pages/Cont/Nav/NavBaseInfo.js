import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Form, Input, Radio } from 'antd';
import PicturesWell from '@/components/PicturesWell';
import 'braft-editor/dist/index.css';
import styles from './NavAdd.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

@Form.create()
class NavBaseInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Fragment>
        <Form layout="inline" className={styles.form}>
          <Row>
            <Col>
              <FormItem label="导航名称：">
                {getFieldDecorator('navname')(
                  <Input placeholder="请输入导航名称" className={styles.ipt} />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormItem label="栏目属性：">
                {getFieldDecorator('columnproperty')(
                  <RadioGroup>
                    <Radio value={1}>列表栏目(允许在本栏目发布)</Radio>
                    <br />
                    <Radio value={2}>单页栏目(生成单页，可使用seo及高级功能)</Radio>
                    <br />
                    <Radio value={3}>外部链接(在`文件保存目录`处填写网址)</Radio>
                  </RadioGroup>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormItem label="导航图片：">
                {getFieldDecorator('navpic')(
                  <Fragment>
                    <PicturesWell />
                    <span>(允许格式：git、jpg、jpeg、bmp、png)</span>
                  </Fragment>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormItem label="target方式：">
                {getFieldDecorator('targetmode')(
                  <RadioGroup>
                    <Radio value={4}>_blank</Radio>
                    <Radio value={5}>_self</Radio>
                  </RadioGroup>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormItem label="主导航副导航：">
                {getFieldDecorator('mainordeputy')(
                  <RadioGroup>
                    <Radio value={6}>主导航</Radio>
                    <Radio value={7}>副导航</Radio>
                    <Radio value={8}>跟随上级</Radio>
                  </RadioGroup>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormItem label="显示状态：">
                {getFieldDecorator('showstate')(
                  <RadioGroup>
                    <Radio value={9}>显示</Radio>
                    <Radio value={10}>不显示</Radio>
                  </RadioGroup>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormItem label="导航顺序：">
                {getFieldDecorator('navorder')(<Input className={styles.ipt} />)}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Fragment>
    );
  }
}

export default NavBaseInfo;
