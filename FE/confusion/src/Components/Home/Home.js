import React from "react";
import "./Home.css";
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons'

const App = () => <Input placeholder="Basic usage" />;
export default function Home() {
    return (
        <div className="Header">
            <div className="Header_Search">
                <Input />
            </div>
            <div className="Search"><SearchOutlined className="Searchicon" /></div>
            <div className="Header_Logo">
                <img src="../assets/logo.jpg" alt="Logo" className="logo1"></img>
            </div>
            <div className="Header_Account_Cart">

            </div>
        </div>
    )
}