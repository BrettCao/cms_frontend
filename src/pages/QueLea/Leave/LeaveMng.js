import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Button, DatePicker, Divider } from 'antd';

import 'braft-editor/dist/index.css';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import router from 'umi/router';
import styles from './LeaveMng.less';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const main = ['主', '副'];

@connect(({ leave, loading }) => ({
  leave,
  loading: loading.models.leave,
}))
@Form.create()
class LeaveMng extends PureComponent {
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
      title: '用户账号',
      dataIndex: 'category_name',
    },
    {
      title: '用户名称',
      dataIndex: 'category_name',
    },
    {
      title: '联系号码',
      dataIndex: 'category_name',
    },
    {
      title: '联系邮箱',
      dataIndex: 'category_name',
    },
    {
      title: '留言内容',
      dataIndex: 'category_name',
    },
    {
      title: '留言时间',
      dataIndex: 'created_at',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '处理状态', // 根据接口显示已处理or未处理
      dataIndex: 'main',
      filters: [
        {
          text: main[0],
          value: 1,
        },
        {
          text: main[1],
          value: 0,
        },
      ],
      render(val) {
        return <span>{main[val]}</span>;
      },
    },
    {
      title: '排序',
      dataIndex: 'category_name',
      sorter: true,
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
            {/* 此处根据处理状态显示标记已处理/标记未处理 */}
            编辑
          </a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'leave/fetch',
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
        type: 'leave/fetch',
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
      type: 'leave/fetch',
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
      type: 'leave/fetch',
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
            <FormItem label="处理状态：">
              {getFieldDecorator('status')(
                <Select style={{ width: '100%' }}>
                  <Option value="关闭">全部</Option>
                  <Option value="运行中">已处理</Option>
                  <Option value="全部">未处理</Option>
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
      leave: { leave },
      loading,
    } = this.props;
    const { selectedRows } = this.state;
    const title = () => '留言数据列表';
    console.info(leave);
    return (
      <PageHeaderWrapper title="留言管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <div className={styles.tableListOperator}>
              <Button.Group>
                <Button icon="toggle" onClick={this.toggle} style={{ marginLeft: '10px' }}>
                  标记已处理
                </Button>
                <Button icon="toggle" onClick={this.toggle} style={{ marginLeft: '10px' }}>
                  标记未处理
                </Button>
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
              data={leave}
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

export default LeaveMng;
