import React, { Component, Fragment } from 'react';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import { connect } from 'dva';
import {
  Button,
  Menu,
  Dropdown,
  Icon,
  Row,
  Col,
  Steps,
  Card,
  Popover,
  Badge,
  Table,
  Tooltip,
  Divider,
} from 'antd';
import classNames from 'classnames';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './NewsDetail.less';

const { Step } = Steps;
const { Description } = DescriptionList;
const ButtonGroup = Button.Group;
const statusMap = ['default', 'success', 'error'];
const status = ['待审核', '审核中', '审核失败'];
const top = ['未置顶', '已置顶'];
const recommend = ['未推荐', '已推荐'];

const getWindowWidth = () => window.innerWidth || document.documentElement.clientWidth;

const operationTabList = [
  {
    key: 'tab1',
    tab: '操作日志',
  },
];

const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    key: "id",
  },
  {
    title: '操作人',
    dataIndex: 'user',
    key: "user",
  },
  {
    title: '操作内容',
    dataIndex: 'content',
    key: "content",
  },
  {
    title: '操作时间',
    dataIndex: 'created_at',
    key: "created_at",
  },
];

@connect(({ news, loading }) => ({
  news,
  loading: loading.effects['news/detail'],
}))
class NewsDetail extends Component {
  state = {
    operationkey: 'tab1',
    stepDirection: 'horizontal',
  };

  componentDidMount() {
    const { dispatch,match:{params} } = this.props;
    dispatch({
      type: 'news/detail',
      payload:{
        ...params
      }
    });

    this.setStepDirection();
    window.addEventListener('resize', this.setStepDirection, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setStepDirection);
    this.setStepDirection.cancel();
  }

  onOperationTabChange = key => {
    this.setState({ operationkey: key });
  };

  @Bind
  renderAction() {
    const { news, loading } = this.props;
    const { detail } = news;
    return (
      <Fragment>
        <ButtonGroup>
          <Button>删除</Button>
          <Button>关闭</Button>
        </ButtonGroup>
        <Button type="primary">编辑</Button>
      </Fragment>
    );
  }

  @Bind
  renderDescription() {
    const { news:{ detail } } = this.props;
    return (
      <DescriptionList className={styles.headerList} size="small" col="2">
        <Description term="创建人">{detail.user}</Description>
        <Description term="创建时间">{detail.created_at}</Description>
        <Description term="最后操作日期">{detail.updated_at}</Description>
        <Description term="发布日期">{detail.publish_at}</Description>
        <Description term="浏览量">{detail.view}</Description>
        <Description term="关键字">{detail.keyword}</Description>
      </DescriptionList>
    );
  }

  @Bind
  renderExtra() {
    const { news:{ detail } } = this.props;
    return (
      <Row>
        <Col xs={24} sm={8}>
          <div className={styles.textSecondary}>状态</div>
          <div className={styles.heading}>{status[detail.status]}</div>
        </Col>
        <Col xs={24} sm={8}>
          <div className={styles.textSecondary}>置顶</div>
          <div className={styles.heading}>{top[detail.top]}</div>
        </Col>
        <Col xs={24} sm={8}>
          <div className={styles.textSecondary}>推荐</div>
          <div className={styles.heading}>{recommend[detail.recommend]}</div>
        </Col>
      </Row>
    );
  }

  @Bind
  renderSeo() {
    const { news:{ detail } } = this.props;
    if (detail.seo){
      return (
        <Card type="inner" style={{ marginTop: 48 }} title="SEO">
          <DescriptionList size="small" style={{ marginBottom: 16 }} title="关键字" col="1">
            <Description>
              {detail.seo.keyword}
            </Description>
          </DescriptionList>
          <Divider style={{ margin: '16px 0' }} />
          <DescriptionList size="small" title="描述">
            <Description>
              {detail.seo.description}
            </Description>
          </DescriptionList>
        </Card>
      )
    }
    return "";
  }


  @Bind()
  @Debounce(200)
  setStepDirection() {
    const { stepDirection } = this.state;
    const w = getWindowWidth();
    if (stepDirection !== 'vertical' && w <= 576) {
      this.setState({
        stepDirection: 'vertical',
      });
    } else if (stepDirection !== 'horizontal' && w > 576) {
      this.setState({
        stepDirection: 'horizontal',
      });
    }
  }

  render() {
    const { operationkey } = this.state;
    const { news, loading } = this.props;
    const { detail } = news;
    const contentList = {
      tab1: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={detail.logs}
          columns={columns}
        />
      ),
    };
    return (
      <PageHeaderWrapper
        title={detail.title}
        logo={
          <img alt="" src={detail.logo} />
        }
        action={this.renderAction()}
        content={this.renderDescription()}
        extraContent={this.renderExtra()}
      >
        <Card title="概要" style={{ marginBottom: 24 }} bordered={false}>
          {detail.excerpt}
        </Card>
        <Card title="用户信息" style={{ marginBottom: 24 }} bordered={false}>
          <div dangerouslySetInnerHTML={{__html: detail.content}} />
          {this.renderSeo()}
        </Card>
        <Card title="评论" style={{ marginBottom: 24 }} bordered={false}>
          <div className={styles.noData}>
            <Icon type="frown-o" />
            暂无数据
          </div>
        </Card>
        <Card
          className={styles.tabsCard}
          bordered={false}
          tabList={operationTabList}
          onTabChange={this.onOperationTabChange}
        >
          {contentList[operationkey]}
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default NewsDetail;
