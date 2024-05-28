import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Login/Login.css";
import { Button, Checkbox, Form, Input, message } from 'antd';
import { Link } from "react-router-dom";

const URL = "https://6655a46c3c1d3b60293a7e4a.mockapi.io/login";

export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await fetch(URL);
            const data = await response.json();
            const { username, password } = values;
            const user = data.find(item => item.username === username && item.password === password);
            if (user) {
                console.log('Login successful:', user);
                // Navigate to the desired page upon successful login
                navigate("/");
            } else {
                console.log('Incorrect username or password');
                message.error('Incorrect username or password');
            }
        } catch (error) {
            console.error('Error:', error);
            message.error('An error occurred. Please try again later.');
        }
        setLoading(false);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const validateUsername = (_, value) => {
        if (value && !value.endsWith("@gmail.com")) {
            return Promise.reject(new Error('Username must end with "@gmail.com"'));
        }
        return Promise.resolve();
    };

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
                                {
                                    validator: validateUsername,
                                }
                            ]}
                        >
                            <Input style={{ width: '100%', maxWidth: '300px' }} />
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
                            <Input.Password />
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
                            <div className="remember-forgot-wrapper">
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
                            <Button type="primary" htmlType="submit" className="submit" loading={loading}>
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
