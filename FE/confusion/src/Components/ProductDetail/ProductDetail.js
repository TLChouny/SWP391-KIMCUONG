import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Spin } from "antd";
import { ToastContainer, toast } from "react-toastify"; // Import toast và ToastContainer từ react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import CSS cho toastify
import "./ProductDetail.css";
import Headerlogin from "../Headerlogin/Headerlogin";
import Menuheaderlogin from "../Menuheaderlogin/Menuheaderlogin";

const ProductDetail = () => {
    const { productId } = useParams();
    const navigate = useNavigate(); // Access navigate function from react-router-dom
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:8080/api/products/${productId}`)
            .then((response) => response.json())
            .then((data) => {
                setProduct(data);
            })
            .catch((error) => console.error("Error fetching product:", error))
            .finally(() => setLoading(false));
    }, [productId]);

    const handleBuyNow = () => {
        // Xử lý thêm vào giỏ hàng ở đây (nếu cần)
        navigate("/cart"); // Sử dụng navigate để chuyển hướng đến trang giỏ hàng
        toast.success("Sản phẩm đã được thêm vào giỏ hàng"); // Hiển thị toast khi thêm vào giỏ hàng thành công
    
        // Đặt timeout để tự động ẩn toast sau 1000ms (1 giây)
        setTimeout(() => {
            toast.dismiss(); // Tự động ẩn toast
        }, 5000);
    };
    

    return (
        <>
            <Headerlogin />
            <Menuheaderlogin />
            <ToastContainer /> {/* Để toastify hoạt động, cần đặt ToastContainer ở một nơi duy nhất trong ứng dụng */}
            <div className="product-detail-container">
                {loading ? (
                    <div className="loading-spinner">
                        <Spin size="large" />
                    </div>
                ) : product ? (
                    <>
                        <div className="product-detail-content">
                            <img
                                src={product.ProductImageURL}
                                alt={product.ProductName}
                                className="product-detail-image"
                            />
                        </div>

                        <div className="product-detail-content">
                            <h2 style={{marginBottom: "20px"}}>{product.ProductName}</h2>
                            <p style={{marginBottom: "20px"}}>Price: {product.ProductPrice}đ</p>
                            <Button
                                type="primary"
                                size="large"
                                style={{ width: "40%" }}
                                onClick={handleBuyNow}
                            >
                                Mua ngay
                            </Button>
                            <p style={{ marginBottom: "20px", marginTop: "20px" }}>
                                <b>Thông tin chi tiết sản phẩm</b>
                            </p>
                            <table className="product-detail-table">
                                <tbody>
                                    <tr>
                                        <th>Name</th>
                                        <td>{product.ProductName}</td>
                                    </tr>
                                    <tr>
                                        <th>Description</th>
                                        <td>{product.ProductSub}</td>
                                    </tr>
                                    <tr>
                                        <th>Product Main</th>
                                        <td>{product.ProductMain}</td>
                                    </tr>
                                    <tr>
                                        <th>Product Mounting</th>
                                        <td>{product.ProductMounting}</td>
                                    </tr>
                                    <tr>
                                        <th>Category</th>
                                        <td>{product.ProductCategory}</td>
                                    </tr>
                                    <tr>
                                        <th>Quantity</th>
                                        <td>{product.ProductQuantity}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </>
                ) : (
                    <p>Không tìm thấy sản phẩm.</p>
                )}
            </div>
        </>
    );
};

export default ProductDetail;
