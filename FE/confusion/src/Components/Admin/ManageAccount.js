import React, { useEffect, useState } from "react";
import "./ManageAccount.css";
import { Link } from "react-router-dom";

function ManageAccount() {
    const [users, setUsers] = useState([
        { id: 1, role: 'Khách hàng', username: 'Nguyễn Văn A', phone: '0123456789', address: 'Hà Nội' },
        { id: 2, role: 'Nhân viên', username: 'Nguyễn Thị B', phone: '0987654321', address: 'Hồ Chí Minh' },
        { id: 3, role: 'Admin', username: 'Admin, Long Châu', phone: '0987654321', address: 'Hồ Chí Minh' }
        // Thêm dữ liệu người dùng khác tại đây
    ]);

    useEffect(() => {
        // Cập nhật logic hiển thị bảng người dùng tại đây
    }, [users]);

    return (
        <div className="ManageAccount">
            <div className="Top">
                {/* Đường dẫn đến trang home */}
                <Link to="/Prelogin"className="Top-logout"> 
                    Logout
                </Link>
            </div>
            <div className="left-panel">
                <div className="AdminAvatar">
                    <img src="../assets/admin.png" className="adminavatar" alt="Avatar" />
                    <p className="adminname">Admin, Long Châu</p>
                </div>
                <div className="AdminTable">
                    <ul className="AdminTableList">
                        <li><Link to="/">Manage Customer</Link></li>
                        <li><Link to="/">Manage Sale Staff</Link></li>
                        <li><Link to="/">Manage Delivery Staff</Link></li>
                    </ul>
                </div>
            </div>
            <div className="right-panel">
                <div className="AdminHeader">
                    <div className="AdminControlTable">
                        Manage Account
                    </div>
                </div>
                <div className="AdminContent">
                    All accounts recently
                </div>
                <div className="AdminContentDetails">
                    <table className="OrderTable">
                        <thead>
                            <tr>
                                <th>ID user</th>
                                <th>Role</th>
                                <th>Name</th>
                                <th>Tel</th>
                                <th>Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.role}</td>
                                    <td>{user.username}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.address}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ManageAccount;
