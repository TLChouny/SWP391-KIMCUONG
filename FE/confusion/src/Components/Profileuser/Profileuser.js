import React, { useEffect, useState } from "react";
import axios from "axios";

const URL = "http://localhost:8080/api/user/profile";
const PASSWORD_URL = "http://localhost:8080/api/user/changepassword"; // Endpoint for changing password

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

    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(URL, {
                username: user.username,
                phoneNumber: user.phoneNumber,
                address: user.address,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": localStorage.getItem('accessToken'),
                },
            });
            console.log("Profile changed successfully", response.data);
            setUser(response.data);
        } catch (error) {
            console.error("There was an error updating the user data!", error);
        }
    };

    const handlePasswordChange = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(PASSWORD_URL, {
                currentPassword: passwords.currentPassword,
                newPassword: passwords.newPassword,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": localStorage.getItem('accessToken'),
                },
            });
            console.log("Password changed successfully", response.data);
            // Cập nhật state hoặc thông báo cho người dùng là đã thay đổi mật khẩu thành công
        } catch (error) {
            console.error("There was an error changing the password!", error.response); // In ra error.response để xem chi tiết lỗi từ server
        }
    };
    

    return (
        <div>
            <h1>User Profile</h1>
            <form onSubmit={handleUpdate}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={user.email}
                        readOnly
                    />
                </div>
                <div>
                    <label>Phone Number:</label>
                    <input
                        type="text"
                        value={user.phoneNumber}
                        onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
                    />
                </div>
                <div>
                    <label>Address:</label>
                    <input
                        type="text"
                        value={user.address}
                        onChange={(e) => setUser({ ...user, address: e.target.value })}
                    />
                </div>
                <button type="submit">Update</button>
            </form>

            <h2>Change Password</h2>
            <form onSubmit={handlePasswordChange}>
                <div>
                    <label>Current Password:</label>
                    <input
                        type="password"
                        value={passwords.currentPassword}
                        onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                    />
                </div>
                <div>
                    <label>New Password:</label>
                    <input
                        type="password"
                        value={passwords.newPassword}
                        onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                    />
                </div>
                <button type="submit">Change Password</button>
            </form>
        </div>
    );
}