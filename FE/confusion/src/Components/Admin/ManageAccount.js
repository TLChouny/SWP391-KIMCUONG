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
import { Link as ScrollLink } from 'react-scroll';

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
        // Logic to save changes
        setIsEditModalOpen(false);
        setEditUser(null);
    };

    const handleEditCancel = () => {
        setIsEditModalOpen(false);
        setEditUser(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure to delete this account?')) {
            const updatedData = accounts.filter(staff => staff.id !== id);
            setAccounts(updatedData);
            toast.success('Account is deleted successfully');
            console.log(`Deleted staff with ID: ${id}`);
        }
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
                                <TableCell>UseName</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>Actions</TableCell>
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
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
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

    return (
        <div className="ManageAccount">
            <ToastContainer />
            <div className="header">
                <Link to="/admin">
                    <button className="logout-button">
                        <div className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M160 217.1c0-9 3.6-17.6 9.9-24l122.3-122.3c7.2-7.2 17.1-11.3 27.3-11.3s20.1 4.1 27.3 11.3L438.1 160c6.4 6.4 9.9 15 9.9 24s-3.6 17.6-9.9 24l-122.3 122.3c-7.2 7.2-17.1 11.3-27.3 11.3s-20.1-4.1-27.3-11.3L169.9 241.1C163.6 234.7 160 225.1 160 217.1zM224 256c0 8.4 3.3 16.3 9.3 22.3l122.3 122.3c2 2 5.4 0.6 5.4-2.3V320h160c8.8 0 16-7.2 16-16v-64c0-8.8-7.2-16-16-16H261.1V192c0-2.9-3.5-4.4-5.4-2.3L128.4 311.4C124.4 315.4 124 320 124 320s-0.4 4.6 3.6 8.6l122.3 122.3c4 4 9.4 6.1 14.8 6.1c5.4 0 10.7-2.1 14.8-6.1l122.3-122.3c12.5-12.5 12.5-32.7 0-45.2L266.8 73.9c-12.5-12.5-32.7-12.5-45.2 0L99.3 196.1c-2 2-3.6 5.4-2.3 5.4h71.3v-63.6c0-2.9 3.5-4.4 5.4-2.3L256 237.7C260 241.7 260 256 256 256H224zM64 64L224 64c8.8 0 16-7.2 16-16s-7.2-16-16-16L64 32c-17.7 0-32 14.3-32 32l0 320c0 17.7 14.3 32 32 32l160 0c8.8 0 16-7.2 16-16s-7.2-16-16-16L64 368c-8.8 0-16-7.2-16-16L48 80C48 71.2 55.2 64 64 64z"></path></svg></div>
                        <div className="text">Logout</div>
                    </button></Link>
            </div>
            <div className="left-panel">
                <div className="AdminAvatar">
                    <Link to=""><img src="../assets/admin.png" className="adminavatar" alt="Avatar" /></Link>
                    <p className="adminname">Admin, Long Châu</p>
                </div>
                <div className="AdminTable">
                    <ul className="AdminTableList">
                        <li><ScrollLink to="Manage-Customer" smooth={true}>Manage Customer</ScrollLink></li>
                        <li><ScrollLink to="Manage-Sale-Staff" smooth={true}>Manage Sale Staff</ScrollLink></li>
                        <li><ScrollLink to="Manage-Delivery-Staff" smooth={true}>Manage Delivery Staff</ScrollLink></li>
                        <li><Link to="/">My Profile</Link></li>
                    </ul>
                </div>
            </div>
            <div className="right-panel">
                <div className="Title">
                    {/* <p>Manage Accounts</p> */}
                </div>
                <div className="AdminContent">
                <div id="Manage-Customer" className="Manage-Customer">
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
                        accounts.filter(user => user.role === 'delivery staff'),
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
                </div>
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
            <Modal title="Edit User" open={isEditModalOpen} onOk={handleEditOk} onCancel={handleEditCancel}>
                <Form layout="vertical">
                    <Form.Item label="ID">
                        <Input value={editUser.id} name="id" onChange={handleInputChange} disabled />
                    </Form.Item>
                    <Form.Item label="Role">
                        <Input value={editUser.role} name="role" onChange={handleInputChange} />
                    </Form.Item>
                    <Form.Item label="Username">
                        <Input value={editUser.username} name="username" onChange={handleInputChange} />
                    </Form.Item>
                    <Form.Item label="Phone">
                        <Input value={editUser.phone} name="phone" onChange={handleInputChange} />
                    </Form.Item>
                    <Form.Item label="Address">
                        <Input value={editUser.address} name="address" onChange={handleInputChange} />
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
        </div >
    );
};

export default ManageAccount;
