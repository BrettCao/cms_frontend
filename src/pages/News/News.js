import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import Link from 'umi/link';
import { Row, Col, Card, List, Avatar, Upload, message } from 'antd';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import {
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Icon,
  TreePicker,
  Input,
  Tag,
  IconButton,
  Uploader,
  Button,
  DatePicker,
  Toggle,
  ButtonGroup,
} from 'rsuite';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './News.less';
import { baseUrl } from '../../services/api';
import { SchemaModel, StringType, NumberType, DateType } from 'schema-typed';

const model = SchemaModel({
  title: StringType().isRequired('标题不能为空！'),
  excerpt: StringType().isRequired('摘要不能为空！'),
  author: StringType().isRequired('作者不能为空！'),
  keyword: StringType().isRequired('SEO关键字不能为空！'),
  content: StringType().isRequired('内容不能为空！'),
  category_id: NumberType().isRequired('分类必须选择！'),
  publish_at: DateType().isRequired('发表日期必填'),
  description: StringType().isRequired('SEO描述不能为空！'),
  logo_id: NumberType().isRequired('文章图片必须上传'),
});

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('只能上传JPG格式!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('上传图片文件必须小于 2MB!');
  }
  return isJPG && isLt2M;
}

@connect(({ news, loading }) => ({
  news,
  loading: loading.models.news,
}))
class News extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      typing: false,
      inputValue: '',
      tags: [],
      logo: false,
      logoLoading: false,
      submitLoading: false,
      storageIds: [],
      form: {
        title: '',
        excerpt: '',
        author: '',
        keyword: '',
        content: '',
        category_id: '',
        publish_at: '',
        status: 0,
        top: 0,
        recommend: 0,
        description: '',
        logo_id: '',
        storage_ids: '',
        tags: '',
      },
    };
  }

  componentDidMount() {
  }

  componentWillUnmount() {

  }

  @Bind()
  handleButtonClick() {
    this.setState(
      {
        typing: true,
      },
      () => {
        this.input.focus();
      },
    );
  }

  handleInputChange(key, inputValue) {
    const { form } = this.state;
    if (Array.isArray(inputValue)) {
      inputValue = inputValue.splice(',');
    }
    form[key] = inputValue;
    this.setState({ form });
  }

  @Bind
  handleTagChange(inputValue) {
    this.setState({ inputValue });
  }

  @Bind
  handleStorageChange(response, file) {
    let { storageIds, form } = this.state;
    storageIds.push(response.data.id);
    if (Array.isArray(storageIds)) {
      storageIds = storageIds.splice(',');
    }
    const values = {
      ...form,
      storage_ids: storageIds,
    };
    this.setState({ form: values });
  }

  @Bind
  handleInputConfirm() {
    const data = this.state;

    const { inputValue, tags, form } = data;

    const nextTags = inputValue ? [...tags, inputValue] : tags;
    let thisTags = nextTags;
    if (Array.isArray(thisTags)) {
      thisTags = thisTags.join(',');
    }
    const values = {
      ...form,
      tags: thisTags,
    };
    this.setState({
      ...data,
      tags: nextTags,
      typing: false,
      inputValue: '',
      form: values,
    });
  }

  @Bind
  handleTagRemove(tag) {
    const { tags } = this.state;
    const nextTags = tags.filter(item => item !== tag);
    this.setState({
      tags: nextTags,
    });
  }

  @Bind
  handleSubmit = async () => {
    const { dispatch } = this.props;
    const { form } = this.state;
    this.setState({
      submitLoading:true
    });
    const checkResult = model.check(form);
    const bool = Object.values(checkResult).every((value => {
        if (value.hasError){
          message.error(value.errorMessage);
          this.setState({
            submitLoading:false
          });
          return false;
        }
        return true;
    }));
    if (bool){
      dispatch({
        type: 'news/store',
        payload: form,
      });
    }

    console.info(Object.values(checkResult));
  };

  @Bind
  @Debounce(300)
  handleUpdate(string, event) {
    const {
      dispatch,
    } = this.props;
    dispatch({
      type: 'news/categoryApi',
      payload: {
        keyword: string,
      },
    });

  };

  renderInput() {
    const { typing, inputValue } = this.state;
    if (typing) {
      return (
        <Input
          className="tag-input"
          inputRef={ref => {
            this.input = ref;
          }}
          size="xs"
          style={{ width: 70 }}
          value={inputValue}
          onChange={this.handleTagChange}
          onBlur={this.handleInputConfirm}
          onPressEnter={this.handleInputConfirm}
        />
      );
    }

    return (
      <IconButton
        className="tag-add-btn"
        onClick={this.handleButtonClick}
        icon={<Icon icon="plus"/>}
        appearance="ghost"
        size="xs"
      />
    );
  }

  @Bind
  handleOnExpand(activeNode, layer) {
    if (activeNode.children.length === 0) {
      activeNode.expand && this.setLoading(activeNode, true);
      this.loadData(activeNode, layer).then(() => {
        this.setLoading(activeNode, false);
      });
    }
  }


  @Bind
  renderTreeIcon(node, expandIcon) {
    if (node.loading) {
      return <Icon icon="spinner" spin/>;
    }
    return null;
  }

  renderActivities() {
    const {
      activities: { list },
    } = this.props;
    return list.map(item => {
      const events = item.template.split(/@\{([^{}]*)\}/gi).map(key => {
        if (item[key]) {
          return (
            <a href={item[key].link} key={item[key].name}>
              {item[key].name}
            </a>
          );
        }
        return key;
      });
      return (
        <List.Item key={item.id}>
          <List.Item.Meta
            avatar={<Avatar src={item.user.avatar}/>}
            title={
              <span>
                <a className={styles.username}>{item.user.name}</a>
                &nbsp;
                <span className={styles.event}>{events}</span>
              </span>
            }
            description={
              <span className={styles.datetime} title={item.updatedAt}>
                {moment(item.updatedAt).fromNow()}
              </span>
            }
          />
        </List.Item>
      );
    });
  }

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ logoLoading: true });
      return;
    }
    if (info.file.status === 'done') {
      const { form } = this.state;
      const values = {
        ...form,
        logo_id: info.file.response.data.id,
      };
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, logo => this.setState({
        logo,
        logoLoading: false,
        form: values,
      }));
    }
  };

  render() {
    const {
      news: { categories },
      loading,
    } = this.props;
    const { tags, logoLoading, logo, submitLoading } = this.state;
    const pageHeaderContent = (
      <div className={styles.pageHeaderContent}>
        <div className={styles.content}>
          <div className={styles.contentTitle}>
            新增新闻
          </div>
        </div>
      </div>
    );

    const uploadButton = (
      <div>
        <Icon icon={logoLoading ? 'spinner' : 'upload'} pulse={logoLoading ? 'pulse' : ''}/>
        <div className="ant-upload-text">上传Logo</div>
      </div>
    );
    const extraContent = (
      <div className={styles.extraContent}>
        <div className={styles.statItem}>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action={baseUrl + 'images/upload'}
            beforeUpload={beforeUpload}
            withCredentials
            disabled={logoLoading ? true : false}
            onChange={this.handleChange}
          >
            {logo ? <img src={logo} alt="avatar" style={{ width: 72, height: 72 }}/> : uploadButton}
          </Upload>
        </div>
        <div className={styles.statItem} style={{ verticalAlign: 'top', top: 30 }}>
          <ButtonGroup>
            <Button appearance="primary" size='lg' loading={submitLoading} onClick={this.handleSubmit}>提交</Button>
            <Button size='lg' href='/cms/news/list'>返回</Button>
          </ButtonGroup>
        </div>
      </div>
    );

    return (
      <Form fluid>

        <PageHeaderWrapper
          content={pageHeaderContent}
          extraContent={extraContent}

        >
          <Row gutter={24}>
            <Col xl={16} lg={24} md={24} sm={24} xs={24}>
              <Card
                className={styles.projectList}
                style={{ marginBottom: 24 }}
                title="添加内容"
                bordered={false}
                extra={<Link to="/">全部新闻</Link>}
                bodyStyle={{ padding: 30 }}
              >
                <FormGroup>
                  <ControlLabel>标题</ControlLabel>
                  <FormControl name="name" onChange={(value) => {
                    this.handleInputChange('title', value);
                  }}/>
                  <HelpBlock>必填</HelpBlock>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>摘要</ControlLabel>
                  <FormControl name="excerpt" type="excerpt" onChange={(value) => {
                    this.handleInputChange('excerpt', value);
                  }}/>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>作者</ControlLabel>
                  <FormControl name="author" type="author" onChange={(value) => {
                    this.handleInputChange('author', value);
                  }}/>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>分类</ControlLabel>
                  <TreePicker
                    cleanable={false}
                    defaultExpandAll
                    data={categories}
                    onOpen={this.handleUpdate}
                    onSearch={this.handleUpdate}
                    onChange={(value) => {
                      this.handleInputChange('category_id', value);
                    }}
                    onExpand={this.handleOnExpand}
                    renderTreeIcon={this.renderTreeIcon}
                    block
                    renderMenu={menu => {
                      if (categories.length === 0) {
                        return (
                          <p style={{ padding: 4, color: '#999', textAlign: 'center' }}>
                            <Icon icon="spinner" spin/> 加载中...
                          </p>
                        );
                      }
                      return menu;
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>内容</ControlLabel>
                  <BraftEditor
                    onChange={(value) => {
                      this.handleInputChange('content', value.toHTML());
                    }}
                    onSave={this.submitContent}
                    style={{ border: '1px solid #e5e5ea' }}
                  />
                </FormGroup>
              </Card>

            </Col>
            <Col xl={8} lg={24} md={24} sm={24} xs={24}>
              <Card
                style={{ marginBottom: 24 }}
                title="新闻标签"
                bordered={false}
                bodyStyle={{ padding: 30 }}
              >
                {tags.map((item, index) => (
                  <Tag
                    key={index}
                    closable
                    onClose={() => {
                      this.handleTagRemove(item);
                    }}
                  >
                    {item}
                  </Tag>
                ))}
                {this.renderInput()}
              </Card>
              <Card
                style={{ marginBottom: 24 }}
                bordered={false}
                title="图册上传"
              >
                <Uploader
                  multiple
                  listType="picture"
                  data={{ type: 'logo' }}
                  withCredentials="true"
                  onSuccess={this.handleStorageChange}
                  action={baseUrl + 'images/upload'}>
                  <Button>
                    <Icon icon='upload' size="lg"/>
                  </Button>
                </Uploader>
              </Card>
              <Card
                style={{ marginBottom: 24 }}
                bodyStyle={{ padding: 20 }}
                bordered={false}
                title="设置"
              >
                <FormGroup>
                  <ControlLabel>发布时间</ControlLabel>
                  <DatePicker
                    block
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder="选择发布时间"
                    onChange={(value) => {
                      this.handleInputChange('publish_at', value.format('YYYY-MM-DD HH:mm:ss'));
                    }}
                    ranges={[
                      {
                        label: 'Now',
                        value: moment(),
                      },
                    ]}
                  />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>状态</ControlLabel>
                  <Col md={8}>
                    <Toggle
                      size='lg'
                      checkedChildren="审核通过"
                      unCheckedChildren="尚未审核"
                      onChange={(value) => {
                        this.handleInputChange('status', value);
                      }}
                    />
                  </Col>
                  <Col md={8}>
                    <Toggle
                      size='lg'
                      checkedChildren="已置顶"
                      unCheckedChildren="未置顶"
                      onChange={(value) => {
                        this.handleInputChange('top', value);
                      }}
                    />
                  </Col>
                  <Col md={8}>
                    <Toggle
                      size='lg'
                      checkedChildren="已推荐"
                      unCheckedChildren="未推荐"
                      onChange={(value) => {
                        this.handleInputChange('recommend', value);
                      }}
                    />
                  </Col>
                </FormGroup>
              </Card>
              <Card
                bodyStyle={{ padding: 30 }}
                bordered={false}
                className={styles.activeCard}
                title="SEO"
              >
                <FormGroup>
                  <ControlLabel>SEO关键字</ControlLabel>
                  <FormControl name="name" onChange={(value) => {
                    this.handleInputChange('keyword', value);
                  }}/>
                  <HelpBlock>必填</HelpBlock>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>SEO描述</ControlLabel>
                  <FormControl rows={5} name="textarea" componentClass="textarea" onChange={(value) => {
                    this.handleInputChange('description', value);
                  }}/>
                </FormGroup>
              </Card>
            </Col>
          </Row>
        </PageHeaderWrapper>
      </Form>

    );
  }
}

export default News;
