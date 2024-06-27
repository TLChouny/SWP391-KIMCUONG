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

const renderTable = (filteredUsers, title, page, setPage, rowsPerPage, setRowsPerPage) => {
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredUsers.length) : 0;

    return (
        <div className="Manage-Role-Section">
            <h3>{title}</h3>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
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

const ManageAccount = () => {
    const [accounts, setAccounts] = useState([]);
    useEffect(() => {
        setAccounts(SampleAccounts);
    }, []);

    const [customerPage, setCustomerPage] = useState(0);
    const [saleStaffPage, setSaleStaffPage] = useState(0);
    const [deliveryStaffPage, setDeliveryStaffPage] = useState(0);
    const [adminPage, setAdminPage] = useState(0);
    const [managerPage, setManagerPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(10);
    

    return (
        <div className="ManageAccount">
            <div className="Top">
                <Link to="/"><button className="Btn">
                    <div className="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM448 256c0-8.4-3.3-16.3-9.3-22.3L316.4 111.4c-2-2-5.4-0.6-5.4 2.3l0 74.3-160 0c-8.8 0-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16l160 0 0 74.3c0 2.9 3.5 4.4 5.4 2.3l122.3-122.3C444.7 272.3 448 264.4 448 256z"></path><path d="M64 96L224 96c8.8 0 16-7.2 16-16s-7.2-16-16-16L64 64c-17.7 0-32 14.3-32 32l0 320c0 17.7 14.3 32 32 32l160 0c8.8 0 16-7.2 16-16s-7.2-16-16-16L64 416c-8.8 0-16-7.2-16-16L48 112C48 103.2 55.2 96 64 96z"></path></svg></div>
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
                        <li><Link smooth to="#Manage-Customer">Manage Customer</Link></li>
                        <li><Link smooth to="#Manage-Sale-Staff">Manage Sale Staff</Link></li>
                        <li><Link smooth to="#Manage-Delivery-Staff">Manage Delivery Staff</Link></li>
                        <li><Link to="/">My Profile</Link></li>
                    </ul>
                </div>
            </div>
            <div className="right-panel">
                <div className="Title">
                    <p>Manage Accounts</p>

                </div>
                <div className="AdminContent">
                    <div id="Manage-Customer">
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
        </div>
    );
};

export default ManageAccount;
