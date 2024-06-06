import React, { useState } from "react";
import "./Header.css";
import Menu from "../Menu/Menu"
import { BsSearch } from 'react-icons/bs';
import { UserOutlined } from '@ant-design/icons';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Input } from 'antd';

function Header() {
    const productList = ["blue pant", "black pant", "blue shirt", "black shoes", "brown shoes", "white pant", "white shoes", "red shirt", "gray pant", "white shirt", "golden shoes", "dark pant", "pink shirt", "yellow pant"];
    const [products, setProducts] = useState(productList);
    const [searchVal, setSearchVal] = useState("");
    const [setSuggestedProducts] = useState([]);
    const [showSelect, setShowSelect] = useState(false);
    const toggleSelect = () => {
        setShowSelect(!showSelect);
      };

    function handleSearchClick() {
        if (searchVal === "") {
            setProducts(productList);
        } else {
            const filterBySearch = productList.filter((item) => {
                return item.toLowerCase().includes(searchVal.toLowerCase());
            });
            setProducts(filterBySearch);
        }
        // Hiển thị danh sách sản phẩm
        document.querySelector('.product-list').style.opacity = 1;

        // Sau 3 giây, ẩn danh sách sản phẩm
        setTimeout(function () {
            document.querySelector('.product-list').style.opacity = 0;
        }, 3000);

        function handleSearchInput(event) {
            const searchInput = event.target.value;
            setSearchVal(searchInput);

            // Gợi ý sản phẩm dựa trên nội dung nhập
            const suggested = productList.filter((item) => {
                return item.toLowerCase().includes(searchInput.toLowerCase());
            });
            setSuggestedProducts(suggested);
        }
    }
    return (
        <div className="Header">
            <div className="Header_Search">
                <div className="search-container">
                    <Input className="search-input" placeholder="Search..." onChange={e => setSearchVal(e.target.value)} />
                    <BsSearch className="search-icon" onClick={handleSearchClick} />
                </div>
                <div className="product-list">
                    {products.map((product, index) => {
                        return <div key={index} className="product-item">{product}</div>;
                    })}
                </div>
            </div>
            <div className="Header_Logo">
                <img src="../assets/logo.jpg" alt="Logo" className="logo1" />
            </div>
            <div className="Header_Name">Klare</div>
            <div className="Header_Account_Cart">
                <UserOutlined className="Usericon" onClick={toggleSelect} />
                {showSelect && (
                    <select>
                        <option value="Login">Login</option>
                        <option value="Signup">Sign up</option>
                    </select>
                )}
                <ShoppingCartOutlined className="Carticon" />
            </div>
            <Menu />
        </div>
    );
}

export default Header;
