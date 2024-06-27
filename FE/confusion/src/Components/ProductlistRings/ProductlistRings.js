import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import "../Product/Productlist.css";
import AllProduct from '../Allproduct/Allproduct';
import Braceletsproduct from '../Braceletsproduct/Braceletsproduct';
import Earringsproduct from '../Earringsproduct/Earringsproduct';
import Necklacesproduct from '../Necklacesproduct/Necklacesproduct';
import Ringsproduct from '../Ringsproduct/Ringsproduct';

const { Header, Sider, Content } = Layout;

const ProductlistRings = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedKey, setSelectedKey] = useState('5');
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const handleMenuClick = (e) => {
        setSelectedKey(e.key);
    };

    const renderContent = () => {
        switch (selectedKey) {
            case '1':
                return <AllProduct/>;
            case '2':
                return <Braceletsproduct/>;
            case '3':
                return <Earringsproduct/>;
            case '4':
                return <Necklacesproduct/>;
            case '5':
                return <Ringsproduct/>;
        }
    };

    return (
        <>
        <Header/>
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['5']}
                    selectedKeys={[selectedKey]}
                    onClick={handleMenuClick}
                    items={[
                        {
                            key: '1',
                            label: 'All product',
                        },
                        {
                            key: '2',
                            label: 'Bracelets',
                        },
                        {
                            key: '3',
                            label: 'Earrings',
                        },
                        {
                            key: '4',
                            label: 'Necklaces',
                        },
                        {
                            key: '5',
                            label: 'Rings',
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header
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
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {renderContent()}
                </Content>
            </Layout>
        </Layout>
        </>
    );
};

export default ProductlistRings;
