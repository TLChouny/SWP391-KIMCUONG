import React from "react";
import "./QuanLySanPham.css";
import { LogoutOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";



function QuanLySanPham() {

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

// Tính tổng doanh thu
const tongDoanhThu = donHangs.reduce((acc, donHang) => {
    // Lấy giá trị tổng tiền từ đơn hàng và loại bỏ các ký tự không phải số
    const tongTien = parseFloat(donHang.tongTien.replace(/[^\d]/g, ''));
    // Nếu tổng tiền hợp lệ (không phải NaN), thêm vào tổng doanh thu
    if (!isNaN(tongTien)) {
        acc += tongTien;
    }
    return acc;
}, 0);

return (
    <div className="QuanLyKhachHang">
        <div className="Top">
            <Link to="/Register"> {/* Đường dẫn đến trang home */}
                <LogoutOutlined className="LogoutOutlined" />
            </Link>
        </div>
        <div className="AdminHeader">
            <div className="AdminControlTable">
                Bảng Điều Khiển
            </div>
            <div className="AdminAvatar">
                <img src="../assets/admin.png" className="adminavatar" />
                <p className="adminname">Admin, Long Châu</p>
            </div>
            <div className="AdminTable">
                <ul className="AdminTableList">
                    <li><Link to="/QuanLyKhachHang">Quản lý khách hàng</Link>
                        <img src="../assets/quanlykhachhang.jpg" alt="Logo" className="quanlykhachhang" />
                    </li>
                    <li className="qlsp"><Link to="/QuanLySanPham">Quản lý sản phẩm</Link>
                        <img src="../assets/quanlysanpham.png" alt="Logo" className="quanlysanpham" />
                    </li>
                    <li><Link to="/QuanLyDonHang">Quản lý đơn hàng</Link>
                        <img src="../assets/quanlydonhang.png" alt="Logo" className="quanlydonhang" />
                    </li>
                    <li><Link to="/QuanLyDoanhThu">Quản lý doanh thu</Link>
                        <img src="../assets/quanlydoanhthu.jpg" alt="Logo" className="quanlydoanhthu" />
                    </li>
                    <li><Link to="QuanLyNhanVien">Quản lý nhân viên</Link>
                        <img src="../assets/quanlynhanvien.png" alt="Logo" className="quanlynhanvien" />
                    </li>
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
                    <li>Tổng doanh thu : {tongDoanhThu.toLocaleString()}đ </li>
                </ul>
            </div>
        </div>
    </div>
 ); 
}
export default QuanLySanPham;