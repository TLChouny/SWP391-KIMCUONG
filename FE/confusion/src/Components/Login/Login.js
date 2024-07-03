import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Login/Login.css";

const URL = "http://localhost:8080/api/auth/signin";

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
        
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        
            const data = await response.json();
            if (data.accessToken) {
                localStorage.setItem('accessToken', data.accessToken);
                const roles = data.roles || [];
            
                if (roles.includes('ROLE_MANAGER')) {
                    navigate("/manager");
                } else if (roles.includes('ROLE_USER')) {
                    navigate("/homepagelogin");
                } else if (roles.includes('ROLE_ADMIN')) {
                    navigate("/admin");
                } else {
                    navigate("/"); // Navigate to homepage or a default route
                }
            
                toast.success('Login successful!');
            } else {
                throw new Error('Incorrect username or password');
            }
            
        } catch (error) {
            console.error('Login Error:', error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }        

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        toast.error('Please fill in all required fields correctly.');
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
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        className="formlogin"
                    >
                        <Form.Item
                            label="Username"
                            name="email"
                            rules={[
                                { required: true, message: 'Please input your username!' },
                                { validator: validateUsername }
                            ]}
                        >
                            <Input style={{ width: '100%', maxWidth: '300px' }} />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            wrapperCol={{ offset: 8, span: 16 }}
                            className="form-item"
                        >
                            <div className="remember-forgot-wrapper">
                                <Checkbox className="check">Remember me</Checkbox>
                                <Link to="/forgot-password" className="forgot-password-link">Forgot Password</Link>
                            </div>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit" className="submit" loading={loading}>
                                Sign In
                            </Button>
                            <p className="changeform">Don’t have an account? <Link to="/register" style={{ color: "red" }}>Sign up</Link></p>
                        </Form.Item>
                    </Form>
                </div>
            </div>
            <ToastContainer style={{ textAlign: "left" }} />
        </div>
    );
}

export default Login;
