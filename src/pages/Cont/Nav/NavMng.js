import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Button, DatePicker, Divider, Table } from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import router from 'umi/router';
import styles from './NavMng.less';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const show = ['显示', '隐藏'];
const main = ['主', '副'];

@connect(({ nav, loading }) => ({
  nav,
  loading: loading.models.nav,
}))
@Form.create()
class NavMng extends PureComponent {
  state = {
    selectedRows: [],
    // formValues: {},
  };

  columns = [
    {
      title: '导航名称',
      sorter: true,
      dataIndex: 'navname',
    },
    {
      title: '导航名称（英文）',
      sorter: true,
      dataIndex: 'navnameen',
    },
    {
      title: '导航图片）',
      // render: (_, index) => (
      //   <Fragment>
      //     <img alt="navpic" src="'/public/'+pic+'.png'" onClick={this.seenavPic(index)} />
      //   </Fragment>
      // ),
      dataIndex: 'pic',
    },
    {
      title: '主副导航',
      dataIndex: 'mainordeputy',
      // filters: [
      //   {
      //     text: main[0],
      //     value: 1,
      //   },
      //   {
      //     text: main[1],
      //     value: 0,
      //   },
      // ],
      // render(val) {
      //   return <span>{main[val]}</span>;
      // },
    },
    {
      title: '导航显示',
      dataIndex: 'showorhidden',
      // filters: [
      //   {
      //     text: main[0],
      //     value: 1,
      //   },
      //   {
      //     text: main[1],
      //     value: 0,
      //   },
      // ],
      // render: val => <span>{show[val]}</span>,
    },
    {
      title: '导航顺序',
      dataIndex: 'order',
      sorter: true,
    },
    {
      title: '添加人员',
      dataIndex: 'addperson',
    },
    {
      title: '添加时间',
      dataIndex: 'createtime',
      // sorter: true,
      // render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '更新时间',
      dataIndex: 'updatetime',
      sorter: true,
      // render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    // {
    //   title: '操作',
    //   render: (text, record, index) => (
    //     <Fragment>
    //       <a onClick={() => this.handleUpdateModalVisible(true, record)}>删除</a>
    //       <Divider type="vertical" />
    //       <a href="" onClick={this.showDetail(record)}>
    //         查看
    //       </a>
    //       <Divider type="vertical" />
    //       <a href="" onClick={this.editthisLine(record, index)}>
    //         编辑
    //       </a>
    //     </Fragment>
    //   ),
    // },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'nav/getNavMng' });
  }

  // handleSearch = e => {
  //   e.preventDefault();

  //   const { dispatch, form } = this.props;

  //   form.validateFields((err, fieldsValue) => {
  //     if (err) return;

  //     const values = {
  //       ...fieldsValue,
  //       updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
  //     };

  //     this.setState({
  //       formValues: values,
  //     });

  //     dispatch({ type: 'nav/getNavMng', payload: values });
  //   });
  // };

  // handleFormReset = () => {
  //   const { form, dispatch } = this.props;
  //   form.resetFields();
  //   this.setState({
  //     formValues: {},
  //   });
  //   dispatch({
  //     type: 'nav/getNavMng',
  //     payload: {},
  //   });
  // };

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

    dispatch({ type: 'nav/getNavMng', payload: params });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  // 渲染表单
  // renderSimpleForm() {
  //   const {
  //     form: { getFieldDecorator },
  //   } = this.props;
  //   return (
  //     <Form onSubmit={this.handleSearch} layout="inline">
  //       <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
  //         <Col md={6} sm={24}>
  //           <FormItem label="输入搜索：">
  //             {getFieldDecorator('keyword')(<Input placeholder="请输入关键字" />)}
  //           </FormItem>
  //         </Col>
  //         <Col md={8} sm={24}>
  //           <FormItem label="时间选择：">{getFieldDecorator('date')(<RangePicker />)}</FormItem>
  //         </Col>
  //         <Col md={6} sm={24}>
  //           <FormItem label="显示状态：">
  //             {getFieldDecorator('status')(
  //               <Select style={{ width: '100%' }}>
  //                 <Option value="关闭">关闭</Option>
  //                 <Option value="运行中">运行中</Option>
  //                 <Option value="全部">全部</Option>
  //               </Select>
  //             )}
  //           </FormItem>
  //         </Col>
  //         <Col md={4} sm={24}>
  //           <span className={styles.submitButtons}>
  //             <Button type="primary" htmlType="submit">
  //               查询
  //             </Button>
  //             <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
  //               重置
  //             </Button>
  //           </span>
  //         </Col>
  //       </Row>
  //     </Form>
  //   );
  // }

  render() {
    const {
      nav: { navData },
      loading,
    } = this.props;
    const { selectedRows } = this.state;
    const title = () => '导航数据列表';
    return (
      <PageHeaderWrapper title="导航管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            {/* <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <div className={styles.tableListOperator}>
              <Button.Group>
                <Button icon="plus" onClick={() => router.push('/cms/nav/navadd')}>
                  添加导航
                </Button>
                <Button icon="swap" onClick={this.toggle}>
                  显隐
                </Button>
                <Button icon="delete" onClick={this.deleteRow}>
                  删除
                </Button>
                <Button icon="reload" onClick={this.refresh}>
                  刷新
                </Button>
              </Button.Group>
            </div> */}
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              title={title}
              data={navData}
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

export default NavMng;
