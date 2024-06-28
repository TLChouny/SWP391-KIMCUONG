import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import "../ProductlistRings/ProductlistRings.css";
import AllProduct from '../Allproduct/Allproduct';
import Braceletsproduct from '../Braceletsproduct/Braceletsproduct';
import Earringsproduct from '../Earringsproduct/Earringsproduct';
import Necklacesproduct from '../Necklacesproduct/Necklacesproduct';
import Ringsproduct from '../Ringsproduct/Ringsproduct';

const { Header, Sider, Content } = Layout;

const ProductlistRings = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedKey, setSelectedKey] = useState('5');
    const navigate = useNavigate();
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const handleMenuClick = (e) => {
        setSelectedKey(e.key);
        switch (e.key) {
            case '1':
                navigate('/album');
                break;
            case '2':
                navigate('/album/Bracelet');
                break;
            case '3':
                navigate('/album/Earring');
                break;
            case '4':
                navigate('/album/Necklace');
                break;
            case '5':
                navigate('/album/Ring');
                break;
            default:
                break;
        }
    };

    const renderContent = () => {
        switch (selectedKey) {
            case '1':
                return <AllProduct />;
            case '2':
                return <Braceletsproduct />;
            case '3':
                return <Earringsproduct />;
            case '4':
                return <Necklacesproduct />;
            case '5':
                return <Ringsproduct />;
            default:
                return null;
        }
    };

    return (
        <>
            <Header />
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
