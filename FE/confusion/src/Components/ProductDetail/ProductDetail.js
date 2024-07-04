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
        // Ví dụ lưu vào local storage
        let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        cartItems.push(product);
        localStorage.setItem("cart", JSON.stringify(cartItems));

        toast.success("The product has been added to cart");

        setTimeout(() => {
            toast.dismiss();
        }, 5000);
    };

    const formatPrice = (price) => {

        let parts = price.toFixed(0).toString().split(".");

        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        if (parts.length === 1) {
            return parts[0] + "đ";
        } else {
            return parts.join(".") + "đ";
        }
    };

    return (
        <>
            
            <ToastContainer />
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
                            <h2 style={{ marginBottom: "20px" }}>{product.ProductName}</h2>
                            <p style={{ marginBottom: "20px" }}>{formatPrice(product.ProductPrice)}</p>
                            <Button
                                type="primary"
                                size="large"
                                style={{ width: "40%" }}
                                onClick={handleBuyNow}
                            >
                                Buy Now
                            </Button>
                            <p style={{ marginBottom: "20px", marginTop: "20px" }}>
                                <b>Information of Product Detail</b>
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
                    <p>No products found</p>
                )}
            </div>
        </>
    );
};

export default ProductDetail;
