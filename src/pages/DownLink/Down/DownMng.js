import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Button,
  DatePicker,
  Divider,
  Menu,
  Dropdown,
  Icon,
} from 'antd';

import 'braft-editor/dist/index.css';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import router from 'umi/router';
import styles from './DownMng.less';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const main = ['主', '副'];

@connect(({ down, loading }) => ({
  down,
  loading: loading.models.down,
}))
@Form.create()
class DownMng extends PureComponent {
  state = {
    selectedRows: [],
    formValues: {},
  };

  columns = [
    {
      title: 'ID',
      dataIndex: 'category_name',
    },
    {
      title: '所属类别',
      dataIndex: 'category_name',
    },
    {
      title: '标题名称',
      dataIndex: 'category_name',
    },
    {
      title: '文件',
      dataIndex: 'category_name',
    },
    {
      title: '下载禁制',
      dataIndex: 'category_name',
    },
    {
      title: '排序',
      dataIndex: 'category_name',
      sorter: true,
    },
    {
      title: '添加时间',
      dataIndex: 'created_at',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '操作',
      render: (text, record, index) => (
        <Fragment>
          <a href="" onClick={this.showDetail(record)}>
            查看
          </a>
          <Divider type="vertical" />
          <a href="" onClick={this.editthisLine(record, index)}>
            编辑
          </a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'down/fetch',
    });
  }

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'down/fetch',
        payload: values,
      });
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'down/fetch',
      payload: {},
    });
  };

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'down/fetch',
      payload: params,
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  // 渲染表单
  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
            <FormItem label="输入搜索：">
              {getFieldDecorator('keyword')(<Input placeholder="请输入关键字" />)}
            </FormItem>
          </Col>
          <Col md={7} sm={24}>
            <FormItem label="时间选择：">{getFieldDecorator('date')(<RangePicker />)}</FormItem>
          </Col>
          <Col md={4} sm={24}>
            <FormItem label="显示状态：">
              {getFieldDecorator('status')(
                <Select style={{ width: '100%' }}>
                  <Option value="关闭">全部</Option>
                  <Option value="运行中">显示</Option>
                  <Option value="全部">未显示</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <FormItem label="下载禁制：">
              {getFieldDecorator('status')(
                <Select style={{ width: '100%' }}>
                  <Option value="关闭">全部</Option>
                  <Option value="运行中">会员下载</Option>
                  <Option value="全部">一级</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={3} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                搜索
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const {
      down: { down },
      loading,
    } = this.props;
    const { selectedRows } = this.state;
    const title = () => 'down数据列表';
    const optionMenu = (
      <Menu>
        <Menu.Item key="1">无下载禁制</Menu.Item>
        <Menu.Item key="2">会员下载</Menu.Item>
        <Menu.Item key="3">一级</Menu.Item>
      </Menu>
    );
    console.info(down);
    return (
      <PageHeaderWrapper title="down管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <div className={styles.tableListOperator}>
              <Button.Group>
                <Button icon="toggle" onClick={this.toggle} style={{ marginLeft: '10px' }}>
                  添加下载文件
                </Button>
                <Button icon="toggle" onClick={this.toggle} style={{ marginLeft: '10px' }}>
                  显隐
                </Button>
                <Dropdown overlay={optionMenu}>
                  <Button>
                    无下载禁制
                    <Icon type="down" />
                  </Button>
                </Dropdown>
                <Button icon="delete" onClick={this.deleteRow}>
                  删除
                </Button>
                <Button icon="reload" onClick={this.refresh}>
                  刷新
                </Button>
              </Button.Group>
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              title={title}
              data={down}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default DownMng;
