import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Spin, Modal } from "antd";
import { ToastContainer, toast } from "react-toastify"; // Import toast và ToastContainer từ react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import CSS cho toastify
import "./Product.css";
import Header from "../Header/Header";
import Menuheader from "../Menu/Menuheader";
import Footer from "../Footer/Footer";
// import LoginModal from "../LoginModal/LoginModal"; // Assuming you have a LoginModal component

const Product = () => {
    const { productId } = useParams();
    const navigate = useNavigate(); // Access navigate function from react-router-dom
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showLoginModal, setShowLoginModal] = useState(false);

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
        // Check if user is logged in (example check)
        const isLoggedIn = localStorage.getItem("isLoggedIn"); // Example check for logged in status

        if (!isLoggedIn) {
            setShowLoginModal(true); // Show login modal if not logged in
        } else {
            // Perform buy now action
            toast.success("The product has been added to cart");
            setTimeout(() => {
                toast.dismiss();
            }, 5000);
        }
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

            {/* Login Modal */}
            <Modal
                title="Login Required"
                visible={showLoginModal}
                onCancel={() => setShowLoginModal(false)}
                footer={[
                    <Button key="cancel" onClick={() => setShowLoginModal(false)}>
                        Close
                    </Button>,
                    <Button key="login" type="primary" onClick={() => {
                        setShowLoginModal(false);
                        navigate("/prelogin"); // Redirect to login page
                    }}>
                        Login
                    </Button>,
                ]}
            >
                <p>Please login to add to list product</p>
            </Modal>
            {/* <Footer style={{marginTop: "-20%"}}/> */}
        </>
    );
};

export default Product;
