import React from 'react';
import { Menu, Dropdown, Input, Space } from 'antd';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const Headerlogin = () => {
  const menu = (
    <Menu>
      <Menu.Item key="1"><Link to="">Profile</Link></Menu.Item>
      <Menu.Item key="2"><Link to="">Orders-history</Link></Menu.Item>
      <Menu.Item key="3"><Link to="/">Logout</Link></Menu.Item>
    </Menu>
  );

  return (
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
        <Link to="/homepagelogin"><img src="../assets/logo.jpg" alt='logo' className='headerlogo' /></Link>
        <p>Klare</p>
      </div>

      <div className='header-account'>
        <Dropdown overlay={menu} placement="bottomCenter">
          
          <AccountCircleIcon style={{ fontSize: 34, cursor: 'pointer' }} />
        </Dropdown>
        <AddShoppingCartIcon style={{ fontSize: 34, marginLeft: 20, cursor: 'pointer' }} />
      </div>
    </div>
  );
};

export default Headerlogin;
