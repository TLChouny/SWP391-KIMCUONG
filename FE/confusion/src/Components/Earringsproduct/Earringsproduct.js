import React, { useEffect, useState } from "react";
import "./Earringsproduct.css";
import { Button, Modal } from "antd"; 
import { Link } from "react-router-dom";

const URL = "http://localhost:8080/api/products";

export default function Earringsproduct() {
  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); 

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const filteredProducts = data.filter(product => product.ProductCategory === 'earring');
        setProducts(filteredProducts);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const addToCart = (product) => {
    console.log(`Adding ${product.ProductName} to cart.`);
    setModalVisible(true);
  };

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
      <h1>Earrings Products</h1>
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
        <p>No earrings products found.</p>
      )}

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
