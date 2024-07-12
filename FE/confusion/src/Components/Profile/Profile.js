import React, { useState, useEffect } from "react";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Menu, Spin } from "antd";
import { Link } from "react-router-dom";
import ProfileUser from "../Profileuser/Profileuser";

const URL = "http://localhost:8080/api/user/profile";

const Profile = () => {
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(true);
    const [selectedMenuItem, setSelectedMenuItem] = useState("profile");

    const fetchUsername = async () => {
        try {
            const response = await fetch(URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": localStorage.getItem('accessToken'),
                },
            });
            const data = await response.json();
            if (response.ok) {
                setUsername(data.username);
            } else {
                console.error("Failed to fetch username:", data);
            }
        } catch (error) {
            console.error("Error fetching username:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsername();
    }, []);

    const handleMenuClick = ({ key }) => {
        setSelectedMenuItem(key);
    };

    const renderMenuContent = () => {
        switch (selectedMenuItem) {
            case "profile":
                return <ProfileUser setUsername={setUsername} />;
            case "order-history":
                return (
                    <div>
                        <h2>Order History</h2>
                        <p>This is the content for Order History.</p>
                    </div>
                );
            case "bill-info":
                return (
                    <div>
                        <h2>Information of Bill</h2>
                        <p>This is the content for Information of Bill.</p>
                    </div>
                );
            case "warranty-lookup":
                return (
                    <div>
                        <h2>Warranty Lookup</h2>
                        <p>This is the content for Warranty Lookup.</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <div style={{ padding: 16, border: "1px solid #f0f0f0" }}>
                <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
                    <UserOutlined style={{ fontSize: 24, marginRight: 8 }} />
                    {loading ? <Spin /> : <span>Welcome, {username}</span>}
                </div>
                <Menu mode="vertical" selectedKeys={[selectedMenuItem]} onClick={handleMenuClick}>
                    <Menu.Item key="profile">User Profile</Menu.Item>
                    <Menu.Item key="order-history">Order History</Menu.Item>
                    <Menu.Item key="bill-info">Information of Bill</Menu.Item>
                    <Menu.Item key="warranty-lookup">Warranty Lookup</Menu.Item>
                    <Menu.Item key="logout" icon={<LogoutOutlined />}><Link to="/">Logout</Link></Menu.Item>
                </Menu>
            </div>
            <div style={{ flex: 1, padding: 16 }}>
                {renderMenuContent()}
            </div>
        </div>
    );
}

export default Profile;
