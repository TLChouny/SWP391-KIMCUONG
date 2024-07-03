import React, { useEffect, useState } from "react";
import "./Necklacesproduct.css";
import { Button, Modal } from "antd"; // Import Modal from Ant Design
import { Link } from "react-router-dom";

const URL = "http://localhost:8080/api/products";

export default function Necklacesproduct() {
  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // State to manage modal visibility

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log the data to check its structure
        // Filter products to show only those with category 'bracelet'
        const filteredProducts = data.filter(product => product.ProductCategory === 'necklace');
        setProducts(filteredProducts);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Function to handle adding a product to cart
  const addToCart = (product) => {
    console.log(`Adding ${product.ProductName} to cart.`);
    // Add your cart handling logic here
    // For now, show the login modal
    setModalVisible(true);
  };

  // Function to handle closing the modal
  const handleModalClose = () => {
    setModalVisible(false);
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
    <div className="all-products">
      <h1>Necklaces Products</h1>
      {products.length > 0 ? (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.ProductId} className="product-item">
              <Link to={`/product/${product.ProductId}`}>
                <img
                  src={product.ProductImageURL}
                  alt={product.ProductName}
                  className="product-image"
                />
              </Link>
              <h2 className="product-name">
                <Link to={`/product/${product.ProductId}`}>
                  {product.ProductName}
                </Link>
              </h2>
              <p className="product-price">{formatPrice(product.ProductPrice)}</p>
              <Button
                className="add-to-cart-button"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <p>No Necklaces products found.</p>
      )}

      {/* Login Modal */}
      <Modal
        title="Login Required"
        visible={modalVisible}
        onCancel={handleModalClose}
        footer={[
          <Link to="/Prelogin" key="login">
            <Button type="primary" onClick={handleModalClose}>
              Login
            </Button>
          </Link>
        ]}
      >
        <p>Please login to add to list product</p>
      </Modal>
    </div>
  );
}
