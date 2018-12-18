import React, {Component} from 'react';
import {observable, action} from 'mobx'
import {observer} from 'mobx-react';
import MemberLayout from '../../components/MemberLayout';
import {Upload, Icon, Input, Form, InputNumber, Button, Radio, DatePicker } from 'antd';
import './index.module.css';
import {SEOHeader} from "../../components/SEOHeader";
import {aRequest} from "../../components/request";
import moment from 'moment';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const FormItem = Form.Item;
class Info {
    @observable imageUrl = '';
    @observable user = {
        name: ''
    };

    @action
    async getUserInfo () {
        try {
            this.user = await aRequest('get', '/get_info');
        } catch (e) {
            throw new Error(e);
        }
    }
}

const CreateForm = Form.create({

})(props => {
    const { form, handleSubmit, user } = props;
    const save = () => {
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            // form.resetFields();
            let fieldsValues = {
                ...fieldsValue,
                birth: moment(fieldsValue.birth).format('YYYY-MM-DD')
            };
            handleSubmit(fieldsValues);
        });
    };
    const normFile = (e) => {

        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };
    const dProps = {
        multiple: false,
        supportServerRender: true
        // beforeUpload: (file) => {
        //     this.setState(({ fileList }) => ({
        //         fileList: [...fileList, file],
        //     }));
        //     return false;
        // }
    }
    return (
        <Form >
            <FormItem
                labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}
            >
                <div className="dropbox">
                    {form.getFieldDecorator('dragger', {
                        valuePropName: 'fileList',
                        getValueFromEvent: normFile,
                        rules: [{ required: false, message: '请上传图片' }],
                    })(
                        <Upload.Dragger {...dProps} name="files" action="/api/update_logo">
                            <p className="ant-upload-drag-icon">
                                <Icon type="inbox" />
                            </p>
                            <p className="ant-upload-text">点击或者拖动头像上传</p>
                        </Upload.Dragger>
                    )}
                </div>
            </FormItem>
            <FormItem
                labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}
                label="昵称"
            >
                {form.getFieldDecorator('name', {
                    initialValue: user.name,
                    rules: [{ required: true, message: '请输入昵称' }],
                })(
                    <Input placeholder="昵称"/>
                )}
            </FormItem>
            <FormItem
                labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}
                label="生日"
            >
                {form.getFieldDecorator('birth', {
                    initialValue: moment(user.birth),
                    rules: [{ required: true, message: '生日' }],
                })(
                    <DatePicker placeholder="请选择生日"/>
                )}
            </FormItem>
            <FormItem
                labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}
                label="职称"
            >
                {form.getFieldDecorator('position', {
                    initialValue: user.position,
                    rules: [{ required: true, message: '请输入职称' }],
                })(
                    <Input placeholder="职称"/>
                )}
            </FormItem>
            <FormItem
                labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}
                label="性别"
            >
                {form.getFieldDecorator('sex', {
                    initialValue: user.sex,
                    rules: [{ required: true, message: '请选择性别' }],
                })(
                    <RadioGroup>
                        <RadioButton value="0">女</RadioButton>
                        <RadioButton value="1">男</RadioButton>
                    </RadioGroup>
                )}
            </FormItem>
            <FormItem
                labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}
                label="学历"
            >
                {form.getFieldDecorator('education', {
                    initialValue: user.education,
                    rules: [{ required: true, message: '请输入学历' }],
                })(
                    <Input placeholder="学历"/>
                )}
            </FormItem>
            <FormItem
                labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}
                label="单位"
            >
                {form.getFieldDecorator('company', {
                    initialValue: user.company,
                    rules: [{ required: true, message: '请输入单位' }],
                })(
                    <Input placeholder="单位名称"/>
                )}
            </FormItem>
            <FormItem
                labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}
                label="邮寄地址"
            >
                {form.getFieldDecorator('address', {
                    initialValue: user.address,
                    rules: [{ required: true, message: '请输入邮寄地址' }],
                })(
                    <Input placeholder="邮寄地址" />
                )}
            </FormItem>
            <FormItem
                labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}
                label="研究方向"
            >
                {form.getFieldDecorator('research', {
                    initialValue: user.address,
                    rules: [{ required: true, message: '请输入研究方向' }],
                })(
                    <Input placeholder="研究方向"/>
                )}
            </FormItem>
            <FormItem>
                <Button style={{width: '100%', backgroundColor: '#43a8e0'}} type="primary" onClick={save}>保存修改</Button>
            </FormItem>
        </Form>
    );
});


@observer
class Index extends Component {
    constructor(props) {
        super(props);
        this.store = new Info();
    }
    state = {
        loading: false,
    };
    async handleSubmit(fields) {
        try {
            await aRequest('post', '/update_info', {
                ...fields
            })
        } catch (e) {
            throw new Error(e);
        }
    }
    async componentDidMount() {
        this.store.getUserInfo();
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        const parentMethods = {
            handleSubmit: this.handleSubmit
        };
        return (
            <MemberLayout >
                <SEOHeader title="个人信息"/>
                <div className="member-details">
                    <h3 style={{fontWeight: 600, marginBottom: 20}}>个人信息 </h3>
                    <CreateForm {...parentMethods} user={this.store.user}/>
                </div>
            </MemberLayout>
        )
    }
}

export default Index;