import React from 'react';
import { AudioOutlined } from '@ant-design/icons';
import { Input, Select, Space } from 'antd';
import { Link } from 'react-router-dom';
import "../Header/Header.css"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);
const Header = () => (
    <div className='header-page'>
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

        <div className='background-image-header'>
            <Link to="/"><img src="../assets/logo.jpg" alt='logo' className='headerlogo' /></Link>
            <p>Klare</p>
        </div>

        <div className='header-account'>
            <Link to="/prelogin" ><AccountCircleIcon style={{ fontSize: 34 }} /></Link>
            <AddShoppingCartIcon style={{fontSize: 34, marginLeft: 20}} />

        </div>

    </div>
);
export default Header;