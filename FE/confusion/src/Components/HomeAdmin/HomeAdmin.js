import React, { useEffect } from "react";
import "./HomeAdmin.css";
import { LogoutOutlined, LineOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

function HomeAdmin() {

    // Tạo dữ liệu đơn hàng (có thể lấy từ API hoặc cơ sở dữ liệu)
    const donHangs = [
        { id: 1, khachHang: 'Nguyễn Văn A', sdt: '0123456789', diaChi: 'Hà Nội', ngayMua: '01/01/2022', tongTien: '1,000,000đ', thanhToan: 'Đã thanh toán' },
        { id: 2, khachHang: 'Nguyễn Thị B', sdt: '0987654321', diaChi: 'Hồ Chí Minh', ngayMua: '02/01/2022', tongTien: '2,500,000đ', thanhToan: 'Chưa thanh toán' },
        { id: 3, khachHang: 'Nguyễn Thị B', sdt: '0987654322', diaChi: 'Hồ Chí Minh', ngayMua: '02/01/2022', tongTien: '2,500,000đ', thanhToan: 'Chưa thanh toán' },
        { id: 4, khachHang: 'Nguyễn Thị B', sdt: '0987654323', diaChi: 'Hồ Chí Minh', ngayMua: '02/01/2022', tongTien: '2,500,000đ', thanhToan: 'Chưa thanh toán' },
        { id: 5, khachHang: 'Nguyễn Thị E', sdt: '0987654324', diaChi: 'Hồ Chí Minh', ngayMua: '02/01/2022', tongTien: '2,500,000đ', thanhToan: 'Chưa thanh toán' },
        { id: 6, khachHang: 'Nguyễn Thị F', sdt: '0987654325', diaChi: 'Hồ Chí Minh', ngayMua: '02/01/2022', tongTien: '2,500,000đ', thanhToan: 'Chưa thanh toán' },
        { id: 7, khachHang: 'Nguyễn Thị G', sdt: '0987654326', diaChi: 'Hồ Chí Minh', ngayMua: '02/01/2022', tongTien: '2,500,000đ', thanhToan: 'Đã thanh toán' },
        { id: 8, khachHang: 'Nguyễn Thị H', sdt: '0987654327', diaChi: 'Hồ Chí Minh', ngayMua: '02/01/2022', tongTien: '2,500,000đ', thanhToan: 'Đã thanh toán' },
        { id: 9, khachHang: 'Nguyễn Thị I', sdt: '0987654328', diaChi: 'Hồ Chí Minh', ngayMua: '02/01/2022', tongTien: '2,500,000đ', thanhToan: 'Chưa thanh toán' },
        { id: 10, khachHang: 'Nguyễn Thị K', sdt: '0987654391', diaChi: 'Hồ Chí Minh', ngayMua: '02/01/2022', tongTien: '2,500,000đ', thanhToan: 'Đã thanh toán' },
        { id: 11, khachHang: 'Nguyễn Thị L', sdt: '0987654301', diaChi: 'Hồ Chí Minh', ngayMua: '02/01/2022', tongTien: '2,500,000đ', thanhToan: 'Chưa thanh toán' },
        { id: 12, khachHang: 'Nguyễn Thị Q', sdt: '0987654311', diaChi: 'Hồ Chí Minh', ngayMua: '02/01/2022', tongTien: '2,500,000đ', thanhToan: 'Chưa thanh toán' },
        { id: 13, khachHang: 'Nguyễn Thị P', sdt: '0987654361', diaChi: 'Hồ Chí Minh', ngayMua: '02/01/2022', tongTien: '2,500,000đ', thanhToan: 'Chưa thanh toán' },
        { id: 14, khachHang: 'Nguyễn Thị R', sdt: '0987654381', diaChi: 'Hồ Chí Minh', ngayMua: '02/01/2022', tongTien: '2,500,000đ', thanhToan: 'Chưa thanh toán' },
        { id: 15, khachHang: 'Nguyễn Thị T', sdt: '0987654392', diaChi: 'Hồ Chí Minh', ngayMua: '02/01/2022', tongTien: '2,500,000đ', thanhToan: 'Đã thanh toán' }

        // Thêm dữ liệu đơn hàng khác tại đây
    ];
    // Tính tổng số lượng khách hàng
    const tongKhachHang = donHangs.reduce((acc, donHang) => {
        if (!acc.includes(donHang.khachHang)) {
            acc.push(donHang.khachHang);
        }
        return acc;
    }, []).length;
    
    // Tính tổng số lượng sản phẩm (có thể thay đổi tùy thuộc vào cách bạn lưu trữ thông tin sản phẩm)
    const tongSanPham = 30; // Tính tổng số lượng sản phẩm từ danh sách đơn hàng

    // Tính tổng số lượng đơn hàng
    const tongDonHang = donHangs.length;

    useEffect(() => {
        const table = document.createElement('table');
        table.className = 'OrderTable';

        // Tạo tiêu đề bảng
        const thead = table.createTHead();
        const headerRow = thead.insertRow();
        ['ID đơn hàng', 'Khách hàng', 'Số điện thoại', 'Địa chỉ', 'Ngày mua', 'Tổng tiền', 'Thanh toán'].forEach((headerText) => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });

        // Điền dữ liệu vào bảng
        const tbody = table.createTBody();
        donHangs.forEach((donHang) => {
            const row = tbody.insertRow();
            Object.values(donHang).forEach((value) => {
                const cell = row.insertCell();
                cell.textContent = value;
            });
        });

        // Đưa bảng vào phần tử có class "AdminContentDetails"
        const adminContentDetails = document.querySelector('.AdminContentDetails');
        adminContentDetails.innerHTML = ''; // Xóa nội dung cũ trước khi thêm bảng mới
        adminContentDetails.appendChild(table);
    }, [donHangs]);

    return (
        <div className="HomeAdmin">
            <div className="Top">
                <Link to="/Register"> {/* Đường dẫn đến trang home */}
                    <LogoutOutlined className="LogoutOutlined" />
                </Link>
            </div>
            <div className="AdminControlTable">
                Bảng Điều Khiển
            </div>
            <div className="AdminAvatar">
                <img src="../assets/admin.png" className="adminavatar" />
                <p className="adminname">Admin, Long Châu</p>
            </div>
            <div id="AdminTable">
                <ul id="AdminTableList">
                    <li><a href="#section1">Mục 1</a></li>
                    <li><a href="#section2">Mục 2</a></li>
                    <li><a href="#section3">Mục 3</a></li>
                    <li><a href="#section4">Mục 4</a></li>
                    <li><a href="#section5">Mục 5</a></li>
                </ul>
            </div>
            <div className="AdminSummary">
                <ul id="Tổng khách hàng">
                    <li>Tổng khách hàng : {tongKhachHang} </li>
                </ul>
                <ul id="Tổng sản phẩm">
                    <li>Tổng sản phẩm : {tongSanPham} </li>
                </ul>
                <ul id="Tổng đơn hàng">
                    <li>Tổng đơn hàng : {tongDonHang} </li>
                </ul>
                <ul id="Tổng doanh thu">
                    <li>Tổng doanh thu :  </li>
                </ul>
            </div>
            <div className="AdminContent">
                Đơn hàng gần đây
            </div>

            <div className="AdminContentDetails">
                <table className="OrderTable">
                    <thead>
                        <tr>
                            <th>ID đơn hàng</th>
                            <th>Khách hàng</th>
                            <th>Số điện thoại</th>
                            <th>Địa chỉ</th>
                            <th>Ngày mua</th>
                            <th>Tổng tiền</th>
                            <th>Thanh toán</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    );
}
export default HomeAdmin;