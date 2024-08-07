import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Input, Space, Modal, Button, Dropdown, Menu } from 'antd';
import "../Header/Header.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const { Search } = Input;

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const navigate = useNavigate();

    const onSearch = async (value) => {
        if (value.trim() === "") {
            setDropdownVisible(false);
            setSearchResults([]);
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8080/api/products?search=${value}`);
            const filteredResults = response.data.filter(product => product.ProductName.toLowerCase().includes(value.toLowerCase()));
            setSearchResults(filteredResults);
            setDropdownVisible(true);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const handleShoppingCartClick = () => {
        if (!isLoggedIn) {
            setModalVisible(true);
        } else {
            console.log('Proceed with shopping cart');
        }
    };

    const handleModalClose = () => {
        setModalVisible(false);
    };

    const handleLogin = () => {
        console.log('Login logic will go here');
        setIsLoggedIn(true);
        setModalVisible(false);
    };

    const handleSearchResultClick = (product) => {
        setDropdownVisible(false);
        navigate(`/album/${product.ProductCategory.toLowerCase()}`);
    };

    const menu = (
        <Menu>
            {searchResults.map((product) => (
                <Menu.Item key={product.ProductId} onClick={() => handleSearchResultClick(product)}>
                    {product.ProductName}
                </Menu.Item>
            ))}
        </Menu>
    );

    return (
        <div className='header-page'>
            <div>
                <Space direction="vertical">
                    <Dropdown overlay={menu} visible={dropdownVisible} onVisibleChange={(visible) => setDropdownVisible(visible)}>
                        <Search
                            placeholder="Search..."
                            onSearch={onSearch}
                            style={{
                                width: 200,
                                marginLeft: "60%"
                            }}
                        />
                    </Dropdown>
                </Space>
            </div>

            <div className='background-image-header'>
                <Link to="/"><img src="../assets/logo.jpg" alt='logo' className='headerlogo' /></Link>
                <p>Klare</p>
            </div>

            <div className='header-account'>
                <Link to="/prelogin"><AccountCircleIcon style={{ fontSize: 34 }} /></Link>
                <AddShoppingCartIcon
                    style={{ fontSize: 34, marginLeft: 20, cursor: 'pointer' }}
                    onClick={handleShoppingCartClick}
                />
            </div>

            <Modal
                title="You are not logged in"
                visible={modalVisible}
                onCancel={handleModalClose}
                footer={[
                    <Button key="cancel" onClick={handleModalClose} style={{ marginRight: "2%" }}>
                        Close
                    </Button>,
                    <Link to="/prelogin">
                        <Button key="login" type="primary" onClick={handleLogin}>
                            Login
                        </Button>
                    </Link>
                ]}
            >
                <p>Please login to continue shopping.</p>
            </Modal>
        </div>
    );
};

export default Header;
