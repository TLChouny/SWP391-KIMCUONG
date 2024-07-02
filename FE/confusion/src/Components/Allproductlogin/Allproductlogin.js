import React, { useEffect, useState } from "react";
import "./Allproductlogin.css";
import { Button } from "antd";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

const URL = "http://localhost:8080/api/products";

const Allproductlogin = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const addToCart = (product, event) => {
    const imgElement = event.target.closest('.product-item').querySelector('img');

    const clonedImg = imgElement.cloneNode(true);
    clonedImg.classList.add('fly-animation');
    document.body.appendChild(clonedImg);

    const { top, left, width, height } = imgElement.getBoundingClientRect();
    clonedImg.style.position = 'fixed';
    clonedImg.style.top = `${top}px`;
    clonedImg.style.left = `${left}px`;
    clonedImg.style.width = `${width}px`;
    clonedImg.style.height = `${height}px`;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));

    toast.success(`${product.ProductName} has been added to your cart.`);

    setTimeout(() => {
      document.body.removeChild(clonedImg);
    }, 0);
  };

  return (
    <div className="all-products">
      <h1>All Products</h1>
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
                <Link to={`/productdetail/${product.ProductId}`}>
                  {product.ProductName}
                </Link>
              </h2>
              <p className="product-price">Price: {product.ProductPrice}đ</p>
              <Button
                className="add-to-cart-button"
                onClick={(e) => addToCart(product, e)}
              >
                Add to Cart
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}
      <ToastContainer />
    </div>
  );
};

export default Allproductlogin;
