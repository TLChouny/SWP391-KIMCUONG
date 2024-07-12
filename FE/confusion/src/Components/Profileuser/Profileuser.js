import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Input, Form } from "antd";
import './Profileuser.css';  // Assuming you have a separate CSS file

const URL = "http://localhost:8080/api/user/profile";
const PASSWORD_URL = "http://localhost:8080/api/user/changepassword";

export default function ProfileUser() {
    const [user, setUser] = useState({
        username: '',
        email: '',
        phoneNumber: '',
        address: ''
    });

    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: ''
    });

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(URL, {
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": localStorage.getItem('accessToken'),
                    },
                });
                setUser(response.data);
            } catch (error) {
                console.error("There was an error fetching the user data!", error);
                setUser({ username: 'Error', email: 'Error fetching email' });
            }
        };

        fetchUserProfile();
    }, []);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        try {
            // Check if current password matches passwords.currentPassword
            const checkPasswordResponse = await axios.post("http://localhost:8080/api/user/checkpassword", {
                currentPassword: passwords.currentPassword,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": localStorage.getItem('accessToken'),
                },
            });

            if (checkPasswordResponse.data.success) {
                // If password matches, update profile
                const profileResponse = await axios.put(URL, {
                    username: user.username,
                    phoneNumber: user.phoneNumber,
                    address: user.address,
                }, {
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": localStorage.getItem('accessToken'),
                    },
                });
                console.log("Profile changed successfully", profileResponse.data);
                setUser(profileResponse.data);

                // Update password if new password is provided
                if (passwords.newPassword) {
                    const passwordResponse = await axios.put(PASSWORD_URL, {
                        currentPassword: passwords.currentPassword,
                        newPassword: passwords.newPassword,
                    }, {
                        headers: {
                            "Content-Type": "application/json",
                            "x-access-token": localStorage.getItem('accessToken'),
                        },
                    });
                    console.log("Password changed successfully", passwordResponse.data);
                }

                setIsModalVisible(false);
            } else {
                // If password does not match, show error message
                console.error("Current password is incorrect");
                // You can handle this in your UI, for example, show a message or disable the form submit
            }
        } catch (error) {
            console.error("There was an error updating the user data!", error.response);
        }
    };


    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <h1>User Profile</h1>
            <div className="profile-user-container">
                <div className="profile-user-info">
                    <label>Username: <Input value={user.username} style={{width: "20%"}} /></label>
                </div>
                <div className="profile-user-info">
                    <label>Email: <Input value={user.email} /></label>
                </div>
                <div className="profile-user-info">
                    <label>Phone Number: <Input value={user.phoneNumber} /></label>
                </div>
                <div className="profile-user-info">
                    <label>Address: <Input value={user.address} /></label>
                </div>
                <Button type="primary" onClick={showModal}>Edit Profile</Button>

                <Modal title="Edit Profile" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <Form>
                        <Form.Item label="Username" className="form-item">
                            <Input
                                type="text"
                                value={user.username}
                                onChange={(e) => setUser({ ...user, username: e.target.value })}
                            />
                        </Form.Item>
                        <Form.Item label="Email" className="form-item">
                            <Input
                                type="email"
                                value={user.email}
                                readOnly
                            />
                        </Form.Item>
                        <Form.Item label="Phone Number" className="form-item">
                            <Input
                                type="text"
                                value={user.phoneNumber}
                                onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
                            />
                        </Form.Item>
                        <Form.Item label="Address" className="form-item">
                            <Input
                                type="text"
                                value={user.address}
                                onChange={(e) => setUser({ ...user, address: e.target.value })}
                            />
                        </Form.Item>
                        {/* <Form.Item label="Current Password" className="form-item">
                            <Input
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                        </Form.Item>

                        <Form.Item label="New Password" className="form-item">
                            <Input
                                type="password"
                                value={passwords.newPassword}
                                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                            />
                        </Form.Item> */}
                    </Form>
                </Modal>
            </div>
        </>
    );
}
