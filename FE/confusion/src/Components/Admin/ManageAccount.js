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
                <Link to="/"><button class="Btn">
                    <div class="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
                    <div class="text">Logout</div>
                </button></Link>
            </div>
            <div className="left-panel">
                <div className="AdminAvatar">
                    <Link to=""><img src="../assets/admin.png" className="adminavatar" alt="Avatar" /></Link>
                    <p className="adminname">Admin, Long Châu</p>
                </div>
                <div className="AdminTable">
                    <ul className="AdminTableList">
                        <li><Link to="/">Manage Customer</Link></li>
                        <li><Link to="/">Manage Sale Staff</Link></li>
                        <li><Link to="/">Manage Delivery Staff</Link></li>
                        <li><Link to="/">My Profile</Link></li>
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
                <div className="Manage-Customer">
                    <p>Customer</p>

                </div>
                <div className="Manage-Sale-Staff">
                    <p>Sale Staff</p>

                </div><div className="Manage-Delivery-Staff">
                    <p>Delivery Staff</p>

                </div>

            </div>
        </div>
    );
}

export default ManageAccount;
