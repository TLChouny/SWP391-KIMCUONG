import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import Menuheaderlogin from '../Menuheaderlogin/Menuheaderlogin';
import Overviewhome from '../Overviewhomealbum/Overviewhome';
import Product from '../Product/Product';
import Header from '../Header/Header';
import Menuheader from '../Menu/Menuheader';

const { Sider, Content } = Layout; // Remove Header from destructuring

const Albumlogin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState('1'); // State để lưu trang hiện tại

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleClickMenu = (key) => {
    setCurrentPage(key); // Cập nhật trang hiện tại khi click vào menu
  };

  return (
    <>
      <Header />
      <Menuheader />
      <Layout style={{ height: "100vh", overflow: "hidden" }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            selectedKeys={[currentPage]} // Chọn menu dựa trên currentPage
            onClick={({ key }) => handleClickMenu(key)} // Xử lý sự kiện click vào menu
            items={[
              {
                key: '1',
                label: 'Home',
              },
              {
                key: '2',
                label: 'Product',
              },
              {
                key: '3',
                label: 'Bracelets',
              },
              {
                key: '4',
                label: 'Earrings',
              },
              {
                key: '5',
                label: 'Necklaces',
              },
              {
                key: '6',
                label: 'Rings',
              },
            ]}
          />
        </Sider>
        <Layout>
          <Layout.Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
          </Layout.Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 2000,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              overflowY: 'auto',
            }}
          >
            {currentPage === '1' && <Overviewhome />}
            {currentPage === '2' && <Product/>}
            {currentPage === '3' && <h1>Content of Earrings Page</h1>}
            {currentPage === '4' && <h1>Content of Necklaces Page</h1>}
            {currentPage === '5' && <h1>Content of Rings Page</h1>}
            {currentPage === '6' && <h1>Content of Rings Page</h1>}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Albumlogin;
