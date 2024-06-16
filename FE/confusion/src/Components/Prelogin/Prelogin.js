import React, { useState } from "react";
import { Button, Flex } from 'antd';
import { Link } from "react-router-dom";
import "../Prelogin/Prelogin.css"

export default function Prelogin() {


    return (
        <div className="signin-container">
            <div className="background-image-container">
                <img src="../assets/background.png" alt="Background" className="background-image" />
            </div>

            <div className="form-prelogin">
                <div className="background-image">
                    <img src="../assets/logo.jpg" alt="Logo" className="logo" />
                    <h4>KLARE</h4>
                </div>

                <div className="background-login-pre">
                    <h4>PLEASE YOUR CHOICE LOGIN OR REGISTER</h4>
                    <Flex gap="small" wrap>
                        <Link to="/login"><Button type="primary" className="buttonchange">Login</Button></Link>
                        <Link to="/Register"><Button type="primary" className="buttonchangesign">Sign up </Button></Link>
                    </Flex>
                </div>
            </div>
        </div >
    );
}
