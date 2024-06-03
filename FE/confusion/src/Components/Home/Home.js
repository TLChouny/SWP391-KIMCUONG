import React, { useState } from "react";
import "../Home/Home.css";
import { Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
function Header({ onSearch }) {
    const [searchValue, setSearchValue] = useState("");

    const handleSearch = () => {
        onSearch(searchValue);
    };

    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
    };

    return (
        <div className="Header">
            <div className="Header_Search">
                <Input
                    placeholder="Search..."
                    value={searchValue}
                    onChange={handleInputChange}
                />
                <Button onClick={handleSearch}><SearchOutlined /></Button>
            </div>
            <div className="Header_Logo">
                <Link to="/"><img src="../assets/logo.jpg" alt="Logo" className="logo1" /></Link>
                <div className="Header_Name">Klare</div>
            </div>
            <div className="Header_Account_Cart">
                <Link to="/Prelogin"><UserOutlined className="Usericon" /></Link>
                <ShoppingCartOutlined className="Carticon" />
            </div>
        </div>
    );
}

export default function Home() {
    const handleSearch = (query) => {
        console.log("Search query:", query);
        // Thêm logic xử lý tìm kiếm tại đây, ví dụ gọi API hoặc lọc dữ liệu
    };

    return (
        <>
            <Header onSearch={handleSearch} />
        </>
    );
}
