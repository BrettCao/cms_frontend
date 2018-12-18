import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Form, Input, Radio, Select, Button, Table } from 'antd';
import styles from './CaseClaMng.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select;

function handleChange(value) {
  console.log(`selected${value}`);
}

const columns = [
  {
    title: '分类名称',
    dataIndex: 'fenlei',
    key: '',
  },
  {
    title: 'HTML名称',
    dataIndex: '',
    key: 'htmlname',
  },
  {
    title: '排序',
    dataIndex: 'order',
    key: '',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: '',
  },
  {
    title: '操作',
    dataIndex: '',
    key: '',
    render: () => <Button>编辑</Button>,
  },
];

const dataSource = [
  {
    key: '1',
    fenlei: '分类1',
    htmlname: '类别1',
    order: '2',
    status: '显示',
  },
];

@Form.create()
class CaseClaMng extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const pagination = {
      size: 'small',
      total: 50,
      showSizeChanger: true,
      showQuickJumper: true,
    };
    return (
      <div background="#fff">
        <h3>案例分类管理</h3>
        <Table dataSource={dataSource} columns={columns} pagination={pagination} />
        <h3>新增案例分类</h3>
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
            <FormItem label="分类名称：">
              {getFieldDecorator('columnproperty')(<Input className={styles.ipt} />)}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="HTML名称：">
              {getFieldDecorator('targetmode')(<Input className={styles.ipt} />)}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="排序：">
              {getFieldDecorator('targetmode')(<Input className={styles.ipt} />)}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="状态：">
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

export default CaseClaMng;
