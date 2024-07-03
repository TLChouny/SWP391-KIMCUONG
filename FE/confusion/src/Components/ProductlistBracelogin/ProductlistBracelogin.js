import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import "../ProductlistBrace/ProductlistBrace.css";
import AllProduct from '../Allproduct/Allproduct';
import Braceletsproduct from '../Braceletsproduct/Braceletsproduct';
import Earringsproduct from '../Earringsproduct/Earringsproduct';
import Necklacesproduct from '../Necklacesproduct/Necklacesproduct';
import Ringsproduct from '../Ringsproduct/Ringsproduct';
import Overviewhome from '../Overviewhomealbum/Overviewhome';
import Braceletsproductlogin from '../Braceletsproductlogin/Braceletsproductlogin';
import Overviewhomelogin from '../Overviewhomelogin/Overviewhomelogin';
import Allproductlogin from '../Allproductlogin/Allproductlogin';
import Earringsproductlogin from '../Earringsproductlogin/Earringsproductlogin';
import Necklacesproductlogin from '../Necklacesproductlogin/Necklacesproductlogin';
import Ringsproductlogin from '../Ringsproductlogin/Ringsproductlogin';

const { Header, Sider, Content } = Layout;

const ProductlistBracelogin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedKey, setSelectedKey] = useState('3');
    const navigate = useNavigate();
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const handleMenuClick = (e) => {
        setSelectedKey(e.key);
        switch (e.key) {
            case '1':
                navigate('/catalogin');
                break;
            case '2':
                navigate('/albumlogin');
                break;
            case '3':
                navigate('/albumlogin/Bracelet');
                break;
            case '4':
                navigate('/albumlogin/Earring');
                break;
            case '5':
                navigate('/albumlogin/Necklace');
                break;
            case '6':
                navigate('/albumlogin/Ring');
                break;
            default:
                break;
        }
    };

    const renderContent = () => {
        switch (selectedKey) {
            case '1':
                return <Overviewhomelogin />;
            case '2':
                return <Allproductlogin />;
            case '3':
                return <Braceletsproductlogin />;
            case '4':
                return <Earringsproductlogin />;
            case '5':
                return <Necklacesproductlogin />;
            case '6':
                return <Ringsproductlogin />;
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
                        defaultSelectedKeys={['3']}
                        selectedKeys={[selectedKey]}
                        onClick={handleMenuClick}
                        items={[
                            {
                                key: '1',
                                label: 'Catalog',
                            },
                            {
                                key: '2',
                                label: 'All product',
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

export default ProductlistBracelogin;
