import React from 'react';
import Footer from '../../components/widgets/Footer';
import CommonHead from '../../components/CommonHead';
import {SEOHeader} from "../../components/SEOHeader";
import {Form, Input, Select, Button, Modal} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const {TextArea} = Input;
import {aRequest} from "../../components/request";

class Index extends React.Component{
    handleSubmit = (e) => {
        e.preventDefault();

        const submit = async(values) => {
            try {
                await aRequest('post', '/', {
                    name: values.name,
                    remark: values.remark,
                    mobile: values.mobile,
                    other: values.other,
                    type: values.type
                });
                Modal.success({
                    title: '提示',
                    content: '预约成功,请耐心等待我们会联系您!',
                });
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }   catch (e) {
                throw new Error(e);
            }
        };
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                submit(values);
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        return (
            <div>
                <CommonHead/>
                <SEOHeader title="发表计划"/>
                <div className="periodical-wrapper-dom">
                    <div className="img-wrapper">
                        <img src="/static/image/plan.png"/>
                    </div>
                    <div className="container-sm" style={{marginTop: 50, marginBottom: 40}}>
                        <Form  onSubmit={this.handleSubmit}>
                            <FormItem
                                {...formItemLayout}
                                label="预约人"
                            >
                                {getFieldDecorator('name', {
                                    rules: [{
                                        required: true, message: '姓名不能改为空',
                                    }],
                                })(
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="联系方式"
                            >
                                {getFieldDecorator('mobile', {
                                    rules: [{
                                        required: true, message: '联系方式不能为空',
                                    }],
                                })(
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="QQ/邮箱/微信"
                            >
                                {getFieldDecorator('other', {
                                    rules: [{
                                        required: false, message: '不能为空',
                                    }],
                                })(
                                    <Input />
                                )}
                            </FormItem>
                             <FormItem
                                {...formItemLayout}
                                label="类型"
                            >
                                {getFieldDecorator('type', {
                                    initialValue: 1,
                                    rules: [{
                                        required: true, message: '类型不能为空',
                                    }],
                                })(
                                    <Select>
                                        <Option value={1} key={1}>学术期刊</Option>
                                        <Option value={2} key={2}>专注出书</Option>
                                        <Option value={3} key={3}>线上媒体</Option>
                                        <Option value={4} key={4}>其他纸媒</Option>
                                    </Select>
                                )}
                            </FormItem>
                           <FormItem
                                {...formItemLayout}
                                label="描述"
                            >
                                {getFieldDecorator('remark', {
                                    rules: [{
                                        required: true, message: '描述不能为空',
                                    }],
                                })(
                                    <TextArea rows={10} placeholder="请描述下您的发表需求,例如期刊级别要求/出版时间要求等."/>
                                )}
                            </FormItem>
                            <FormItem style={{textAlign: 'center'}} >
                                <Button type="primary" htmlType="submit">提交</Button>
                            </FormItem>
                        </Form>
                    </div>
                    <Footer/>
                </div>
            </div>
        )
    }
}

export default Form.create()(Index);