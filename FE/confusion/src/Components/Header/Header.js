import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, Space, Modal, Button } from 'antd'; // Import Modal and Button from Ant Design
import "../Header/Header.css"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
    const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility

    // Function to handle click on shopping cart icon
    const handleShoppingCartClick = () => {
        if (!isLoggedIn) {
            setModalVisible(true); // Show modal if user is not logged in
        } else {
            // Proceed with shopping cart functionality for logged-in user
            console.log('Proceed with shopping cart');
        }
    };

    // Function to handle modal close
    const handleModalClose = () => {
        setModalVisible(false); // Close modal
    };

    // Function to handle login action (simulate for demo purposes)
    const handleLogin = () => {
        // Implement your actual login logic here
        console.log('Login logic will go here');
        setIsLoggedIn(true); // Update isLoggedIn state after successful login
        setModalVisible(false); // Close the modal after login
    };

    return (
        <div className='header-page'>
            {/* Search bar section */}
            <div>
                <Space direction="vertical">
                    <Search
                        placeholder="Search..."
                        onSearch={onSearch}
                        style={{
                            width: 200,
                            marginLeft: "60%"
                        }}
                    />
                </Space>
            </div>

            {/* Logo section */}
            <div className='background-image-header'>
                <Link to="/"><img src="../assets/logo.jpg" alt='logo' className='headerlogo' /></Link>
                <p>Klare</p>
            </div>

            {/* Account and shopping cart section */}
            <div className='header-account'>
                <Link to="/prelogin"><AccountCircleIcon style={{ fontSize: 34 }} /></Link>
                <AddShoppingCartIcon
                    style={{ fontSize: 34, marginLeft: 20, cursor: 'pointer' }}
                    onClick={handleShoppingCartClick} // Attach click handler
                />
            </div>

            {/* Modal for login prompt */}
            <Modal
                title="Bạn chưa đăng nhập"
                visible={modalVisible}
                onCancel={handleModalClose}
                footer={[
                    <Button key="cancel" onClick={handleModalClose} style={{marginRight: "2%"}}>
                        Đóng
                    </Button>,
                    <Link to="/prelogin">
                        <Button key="login" type="primary" onClick={handleLogin}>
                            Đăng nhập
                        </Button>
                    </Link>
                ]}
            >
                <p>Vui lòng đăng nhập để tiếp tục mua hàng.</p>
            </Modal>
        </div>
    );
};

export default Header;
