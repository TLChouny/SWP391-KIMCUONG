import React, { useEffect, useState } from "react";
import "./Earringsproduct.css";
import { Button, Modal } from "antd"; // Import Modal from Ant Design
import { Link } from "react-router-dom";

const URL = "http://localhost:8080/api/products";

export default function Earringsproduct() {
  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // State to manage modal visibility

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log the data to check its structure
        // Filter products to show only those with category 'bracelet'
        const filteredProducts = data.filter(product => product.ProductCategory === 'earring');
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

  return (
    <div className="all-products">
      <h1>Earrings Products</h1>
      {products.length > 0 ? (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.ProductId} className="product-item">
              <img
                src={product.ProductImageURL}
                alt={product.ProductName}
                className="product-image"
              />
              <h2 className="product-name">{product.ProductName}</h2>
              <p className="product-price">Price: {product.ProductPrice}</p>
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
        <p>No earrings products found.</p>
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
