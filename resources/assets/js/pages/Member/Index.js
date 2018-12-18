import React, {Component} from 'react';
import {observable, action, runInAction} from 'mobx'
import {observer} from 'mobx-react';
import MemberLayout from '../../components/MemberLayout';
import {Upload, Icon, Input, Form, InputNumber } from 'antd';
import './index.module.css';
const FormItem = Form.Item;
import Button from "../../../../../Yarncache/v1/npm-antd-3.4.1-9f93c712e14d692a3db70fa3f254c79874cd3822/es/button/button";
class Info {
    @observable imageUrl = '';

    getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    @action
    beforeUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        this.getBase64(file, imageUrl => this.imageUrl = imageUrl);
        return false;
    }
}

const CreateForm = Form.create({
    mapPropsToFields(props) {
        return {
            number: Form.createFormField(props.number),
        };
    }
})(props => {
    const { form, handleSubmit } = props;
    const save = () => {
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            form.resetFields();
            console.log();
            handleSubmit(fieldsValue);
        });
    };
    const normFile = (e) => {

        if (Array.isArray(e)) {
            return e;
        }
        console.log(e.fileList);
        return e && e.fileList;
    };
    const dProps = {
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
                        rules: [{ required: true, message: '请上传图片' }],
                    })(
                        <Upload.Dragger {...dProps} name="files" action="/upload.do">
                            <p className="ant-upload-drag-icon">
                                <Icon type="inbox" />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                        </Upload.Dragger>
                    )}
                </div>
            </FormItem>
            <FormItem
                labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}
                label="昵称"
            >
                {form.getFieldDecorator('nickname', {
                    rules: [{ required: true, message: '请输入昵称' }],
                })(
                    <Input />
                )}
            </FormItem>
            <FormItem
                labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}
                label="职称"
            >
                {form.getFieldDecorator('job_title', {
                    rules: [{ required: true, message: '请输入职称' }],
                })(
                    <Input />
                )}
            </FormItem>
            <FormItem
                labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}
                label="学历"
            >
                {form.getFieldDecorator('education', {
                    rules: [{ required: true, message: '请输入学历' }],
                })(
                    <Input/>
                )}
            </FormItem>
            <FormItem
                labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}
                label="单位"
            >
                {form.getFieldDecorator('company', {
                    rules: [{ required: true, message: '请输入单位' }],
                })(
                    <Input />
                )}
            </FormItem>
            <FormItem
                labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}
                label="邮寄地址"
            >
                {form.getFieldDecorator('address', {
                    rules: [{ required: true, message: '请输入邮寄地址' }],
                })(
                    <Input  />
                )}
            </FormItem>
            <div>
                <Button onClick={()=> save()}>保存</Button>
            </div>
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
    handleSubmit(fields) {
        console.log(fields);
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
        const fileds = {
            number: {
                value: 1122,
            },
        };

        const parentMethods = {
            handleSubmit: this.handleSubmit
        }
        return (
            <MemberLayout >
                <div className="member-details">
                    <h5 style={{fontWeight: 600}}>个人信息 </h5>
                    <CreateForm {...parentMethods} {...fileds}/>

                </div>
            </MemberLayout>
        )
    }
}

export default Index;