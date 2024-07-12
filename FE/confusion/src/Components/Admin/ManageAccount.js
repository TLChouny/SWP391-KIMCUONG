import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import "./ManageAccount.css";
import { Link } from "react-router-dom";
import SampleAccounts from "../Sample/SampleAccounts";
import { TableHead } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Modal, Form, Input } from 'antd';

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

const ManageAccount = () => {
    const [accounts, setAccounts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editUser, setEditUser] = useState(null);
    const [editSuccessModalOpen, setEditSuccessModalOpen] = useState(false); // State cho modal thông báo
    const [form] = Form.useForm(); // Khởi tạo form

    useEffect(() => {
        setAccounts(SampleAccounts);
    }, []);

    const showModal = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    const showEditModal = (user) => {
        setEditUser(user);
        setIsEditModalOpen(true);
    };

    const handleEditOk = () => {
        form.validateFields().then(values => {
            const updatedAccounts = accounts.map(user => {
                if (user.id === editUser.id) {
                    return { ...editUser, ...values }; // Cập nhật thông tin cho người dùng đã chỉnh sửa
                }
                return user; // Giữ nguyên thông tin của các người dùng khác
            });
            toast.success('Account is edited successfully');
            setAccounts(updatedAccounts); // Cập nhật lại danh sách accounts
            setIsEditModalOpen(false); // Đóng modal chỉnh sửa
            setEditUser(null); // Đặt lại editUser về null để chuẩn bị cho lần chỉnh sửa tiếp theo

        }).catch(info => {
            console.log('Validate Failed:', info);
        });
    };

    const handleEditCancel = () => {
        setIsEditModalOpen(false);
        setEditUser(null);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure to delete this account?')) {
            const updatedData = accounts.filter(staff => staff.id !== id);
            setAccounts(updatedData);
            toast.success('Account is deleted successfully');
            console.log(`Deleted staff with ID: ${id}`);
        }
    };

    const validateUniqueUsername = (rule, value) => {
        if (accounts.some(user => user.username === value && user.id !== editUser.id)) {
            return Promise.reject('Username already exists!');
        }
        return Promise.resolve();
    };

    const validateUniquePhone = (rule, value) => {
        if (accounts.some(user => user.phone === value && user.id !== editUser.id)) {
            return Promise.reject('Phone number already exists!');
        }
        return Promise.resolve();
    };

    const validatePhoneNumberLength = (rule, value) => {
        const phoneRegex = /^[0-9]{10,11}$/; // Regex to check for 10 or 11 digits
        if (!phoneRegex.test(value)) {
            return Promise.reject('Phone number must be 10 or 11 digits!');
        }
        return Promise.resolve();
    };

    const renderTable = (filteredUsers, title, page, setPage, rowsPerPage, setRowsPerPage) => {
        const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredUsers.length) : 0;

        return (
            <div className="Manage-Role-Section">
                <h3>{title}</h3>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Username</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : filteredUsers
                            ).map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell component="th" scope="row">
                                        {user.id}
                                    </TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell>{user.address}</TableCell>
                                    <TableCell align="center" className="crud-icons">
                                        <IconButton className="crud-icon" aria-label="view" onClick={() => showModal(user)}>
                                            <VisibilityIcon />
                                        </IconButton>
                                        {(user.role === 'sale staff' || user.role === 'delivery staff') && (
                                            <>
                                                <IconButton className="crud-icon" aria-label="edit" onClick={() => showEditModal(user)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton className="crud-icon" aria-label="delete" onClick={() => handleDelete(user.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[10, 25, 50]}
                                    colSpan={6}
                                    count={filteredUsers.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: {
                                            'aria-label': 'rows per page',
                                        },
                                        native: true,
                                    }}
                                    onPageChange={(event, newPage) => setPage(newPage)}
                                    onRowsPerPageChange={(event) => {
                                        setRowsPerPage(parseInt(event.target.value, 10));
                                        setPage(0);
                                    }}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </div>
        );
    };


    const [customerPage, setCustomerPage] = useState(0);
    const [saleStaffPage, setSaleStaffPage] = useState(0);
    const [deliveryStaffPage, setDeliveryStaffPage] = useState(0);
    const [adminPage, setAdminPage] = useState(0);
    const [managerPage, setManagerPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [visibleSection, setVisibleSection] = useState(null);

    return (
        <div className="ManageAccount">
            <ToastContainer />
            <div className="Top">
                <Link to="/Register">
                    <button className="Btn">
                        <div className="sign">
                            <svg viewBox="0 0 512 512">
                                <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                            </svg>
                        </div>
                        <div className="text">Logout</div>
                    </button>
                </Link>
            </div>
            <div className="left-panel">
                <div className="AdminAvatar">
                    <Link to=""><img src="../assets/admin.png" className="adminavatar" alt="Avatar" /></Link>
                    <p className="adminname">Admin, Long Châu</p>
                </div>
                <div className="AdminTableList">
                    <div onClick={() => setVisibleSection('Manage-Customer')}>Manage Customer</div>
                    <div onClick={() => setVisibleSection('Manage-Sale-Staff')}>Manage Sale Staff</div>
                    <div onClick={() => setVisibleSection('Manage-Delivery-Staff')}>Manage Delivery Staff</div>
                    <div onClick={() => setVisibleSection('Manage-Admin')}>Manage Admin</div>
                    <div onClick={() => setVisibleSection('Manage-Manager')}>Manage Manager</div>
                    <div className="x">My Profile</div>
                </div>
            </div>
            <div className="right-panel">
                <div className="Title">
                    <p>Manage Accounts</p>
                </div>
                <div className="AdminContent">
                    {/* <div id="Manage-Customer" className="Manage-Customer">
                    {renderTable(
                        accounts.filter(user => user.role === 'customer'),
                        'Manage Customer',
                        customerPage,
                        setCustomerPage,
                        rowsPerPage,
                        setRowsPerPage
                    )}
                </div>
                <div id="Manage-Sale-Staff">
                    {renderTable(
                        accounts.filter(user => user.role === 'sale staff'),
                        'Manage Sale Staff',
                        saleStaffPage,
                        setSaleStaffPage,
                        rowsPerPage,
                        setRowsPerPage
                    )}
                </div>
                <div id="Manage-Delivery-Staff">
                    {renderTable(
                        accounts.filter(user => user.role === 'delivery staff'),ManageAccount.js
'Manage Delivery Staff',
                        deliveryStaffPage,
                        setDeliveryStaffPage,
                        rowsPerPage,
setRowsPerPage
                    )}
                </div>
                <div id="Manage-Admin">
                    {renderTable(
                        accounts.filter(user => user.role === 'admin'),
                        'Manage Admin',
                        adminPage,
                        setAdminPage,
                        rowsPerPage,
                        setRowsPerPage
                    )}
                </div>
                <div id="Manage-Manager">
                    {renderTable(
                        accounts.filter(user => user.role === 'manager'),
                        'Manage Manager',
                        managerPage,
                        setManagerPage,
                        rowsPerPage,
                        setRowsPerPage
                    )}
                </div> */}
                    {visibleSection === 'Manage-Customer' && renderTable(accounts.filter(user => user.role === 'customer'), "Manage Customer", customerPage, setCustomerPage, rowsPerPage, setRowsPerPage)}
                    {visibleSection === 'Manage-Sale-Staff' && renderTable(accounts.filter(user => user.role === 'sale staff'), "Manage Sale Staff", saleStaffPage, setSaleStaffPage, rowsPerPage, setRowsPerPage)}
                    {visibleSection === 'Manage-Delivery-Staff' && renderTable(accounts.filter(user => user.role === 'delivery staff'), "Manage Delivery Staff", deliveryStaffPage, setDeliveryStaffPage, rowsPerPage, setRowsPerPage)}
                    {visibleSection === 'Manage-Admin' && renderTable(accounts.filter(user => user.role === 'admin'), "Manage Admin", adminPage, setAdminPage, rowsPerPage, setRowsPerPage)}
                    {visibleSection === 'Manage-Manager' && renderTable(accounts.filter(user => user.role === 'manager'), "Manage Manager", managerPage, setManagerPage, rowsPerPage, setRowsPerPage)}
                    <Modal title="User Details" open={isModalOpen} onOk={handleOk}>
                        {selectedUser && (
                            <div>
                                <p>ID: {selectedUser.id}</p>
                                <p>Role: {selectedUser.role}</p>
                                <p>Username: {selectedUser.username}</p>
                                <p>Phone: {selectedUser.phone}</p>
                                <p>Address: {selectedUser.address}</p>
                            </div>
                        )}
                    </Modal>
                </div>
            </div>
            {
                selectedUser && (
                    <Modal title="User Details" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <p>ID: {selectedUser.id}</p>
                        <p>Role: {selectedUser.role}</p>
                        <p>Username: {selectedUser.username}</p>
                        <p>Phone: {selectedUser.phone}</p>
                        <p>Address: {selectedUser.address}</p>
                    </Modal>
                )
            }
            {
                editUser && (
                    <Modal title="Edit User" visible={isEditModalOpen} onOk={handleEditOk} onCancel={handleEditCancel}>
                        <Form form={form} layout="vertical" name="edit_account_form" initialValues={editUser}>
                            <Form.Item
                                name="username"
                                label="Username"
                                rules={[
                                    { required: true, message: 'Please input the username!' },
                                    { validator: validateUniqueUsername } // Add custom validation
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="phone"
                                label="Phone"
                                rules={[
                                    { required: true, message: 'Please input the phone number!' },
                                    { validator: validateUniquePhone }, // Add custom validation
                                    { validator: validatePhoneNumberLength } // Add phone number length validation
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="address"
                                label="Address"
                                rules={[{ required: true, message: 'Please input the address!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Form>
                    </Modal>

                )
            }
            {/* Modal thông báo chỉnh sửa thành công */}
            <Modal title="Edit Successful" visible={editSuccessModalOpen} onOk={() => setEditSuccessModalOpen(false)} onCancel={() => setEditSuccessModalOpen(false)}>
                <p>User details have been successfully updated.</p>
            </Modal>
        </div >
    );
};

export default ManageAccount;