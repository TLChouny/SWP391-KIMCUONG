import React from "react";
import "../Login/Login.css"
import { Button, Checkbox, Form, Input } from 'antd';
import { Link } from "react-router-dom";
const onFinish = (values) => {
    console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
export default function Login() {
    return (
        <div className="signin-container">
            <div className="background-image-container">
                <img src="../assets/background.png" alt="Background" className="background-image" />
            </div>

            <div className="form-login">
                <div className="background-image">
                    <img src="../assets/logo.jpg" alt="Logo" className="logo" />
                    <h4>KLARE</h4>
                </div>

                <div className="background-login">
                    <h1>SIGN IN</h1>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        className="formlogin"
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            style={{ fontWeight: "bold" }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input style={{ marginLeft: "20px" }} />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            style={{ fontWeight: "bold" }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password style={{ marginLeft: "20px" }} />
                        </Form.Item>
                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                            className="form-item"
                        >
                            <div class="remember-forgot-wrapper">
                                <Checkbox className="check">Remember me</Checkbox>
                                <Link to="/" className="forgot-password-link">Forgot Password</Link>
                            </div>
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                         
                                <Button type="primary" htmlType="submit" className="submit">
                                    Signin
                                </Button>
                                <p className="changeform">Don’t have an account? <Link to="/Signup" style={{ color: "red" }}>Sign up</Link></p>
                           
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}
