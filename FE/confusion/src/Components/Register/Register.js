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
                    <h1>SIGN UP</h1>
                   
                </div>
            </div>
        </div>
    );
}
