import React from 'react';
import { Button, Form, Input, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import "../Register/Register.css";

const { Option } = Select;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 16, offset: 8 },
    },
};

const Register = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const response = await fetch('http://localhost:8080/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                toast.success('Registration Successful');
                form.resetFields();
                navigate('/login');
            } else {
                throw new Error('Registration failed');
            }
        } catch (error) {
            toast.error('Registration Failed');
        }
    };

    const onFinishFailed = () => {
        toast.error('Please fill in information');
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="84">+84</Option>
            </Select>                   
        </Form.Item>
    );

    return (
        <div className="signin-container">
            <ToastContainer style={{textAlign: "left"}} />
            <div className="background-image-container">                    
                <img src="../assets/background.png" alt="Background" className="background-image" />
            </div>
            <div className="form-register">
                <div className="background-image">
                    <img src="../assets/logo.jpg" alt="Logo" className="logo" />
                    <h4 style={{ marginBottom: "6%" }}>KLARE</h4>
                </div>

                <div className="background-login-register">
                    <h1>SIGN UP</h1>
                    <Form
                        {...formItemLayout}
                        form={form}
                        name="register"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        initialValues={{ residence: [], prefix: '84' }}
                        style={{ maxWidth: 600 }}
                        scrollToFirstError
                        className="formlogin"
                    >
                        <Form.Item
                            name="username"
                            label="Username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            label="Confirm Password"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                { required: true, message: 'Please confirm your password!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The passwords do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label="E-mail"
                            rules={[
                                { type: 'email', message: 'The input is not valid E-mail!' },
                                { required: true, message: 'Please input your E-mail!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || value.endsWith('@gmail.com')) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Email must end with @gmail.com'));
                                    },
                                }),
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        
                        <Form.Item
                            name="address"
                            label="Address"
                            rules={[{ required: true, message: 'Please input your address!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="phoneNumber"
                            label="Phone Number"
                            rules={[
                                { required: true, message: 'Please input your phone number!' },
                                { pattern: /^\d{10}$/, message: 'Phone number must be exactly 10 digits!' },
                            ]}
                        >
                            <Input
                                addonBefore={prefixSelector}
                                style={{ width: '100%' }}
                            />
                        </Form.Item>

                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit" className="submit">
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Register;
