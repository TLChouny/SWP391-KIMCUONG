import React from "react";
import "./Home.css";
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import { ShoppingCartOutlined } from '@ant-design/icons';

function Header() {
    return (
        <div className="Header">
            <div className="Header_Search">
                <Input placeholder="Search..." />
            </div>
            <div>
                <SearchOutlined className="Searchicon" />
            </div>
            <div className="Header_Logo">
                <img src="../assets/logo.jpg" alt="Logo" className="logo1" />
            </div>
            <div className="Header_Name">Klare</div>
            <div className="Header_Account_Cart">
                <UserOutlined className="Usericon" />
                <ShoppingCartOutlined className="Carticon" />
            </div>
            <div className="Header_Ads">
                <img src="../assets/logo.jpg" alt="Logo" className="logo1" />
                <img src="../assets/logo.jpg" alt="Logo" className="logo1" />
                <img src="../assets/logo.jpg" alt="Logo" className="logo1" />
            </div>
        </div>
    );
}

function Body() {
    return (
        <div className="Body">
            {/* Thêm nội dung cho phần Body tại đây */}
            <img src="../assets/logo.jpg" alt="Logo" className="logo2" />
            <img src="../assets/logo.jpg" alt="Logo" className="logo2" />
            <img src="../assets/logo.jpg" alt="Logo" className="logo2" />
        </div>
    );
}

function Footer() {
    return (
        <div className="Footer">
            {/* Thêm nội dung cho phần Footer tại đây */}
        </div>
    );
}

export default function Home() {
    return (
        <>
            <Header />
            <Body />
            <Footer />
        </>
    );
}
