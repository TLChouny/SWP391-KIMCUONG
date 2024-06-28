import React, { useEffect, useState } from "react";
import "./Allproductlogin.css";
import { Button, Modal } from "antd"; // Import Modal from Ant Design
import { Link } from "react-router-dom";

const URL = "http://localhost:8080/api/products";

export default function AllProduct() {
  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // State to manage modal visibility

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log the data to check its structure
        setProducts(data);
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
      <h1>All Products</h1>
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
        <p>No products found.</p>
      )}
    </div>
  );
}
