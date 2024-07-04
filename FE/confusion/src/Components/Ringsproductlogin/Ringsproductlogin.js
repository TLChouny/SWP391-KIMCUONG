import React, { useEffect, useState } from "react";
import "./Ringsproductlogin.css";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; 
import 'react-toastify/dist/ReactToastify.css'; 

const URL = "http://localhost:8080/api/products";

export default function Ringsproductlogin() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]); 

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); 
        const filteredProducts = data.filter(product => product.ProductCategory === 'ring');
        setProducts(filteredProducts);
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
      <div className="all-products">
        <h1>Rings Products</h1>
        {products.length > 0 ? (
          <div className="product-grid">
            {products.map((product) => (
              <div key={product.ProductId} className="product-item">
                <Link to={`/productdetail/${product.ProductId}`} className="product-link">
                  <img
                    src={product.ProductImageURL}
                    alt={product.ProductName}
                    className="product-image"
                  />
                  <h2 className="product-name">{product.ProductName}</h2>
                </Link>
                <p className="product-price">{formatPrice(product.ProductPrice)}</p>
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
          <p>No rings products found.</p>
        )}
      </div>
      <ToastContainer /> 
    </>
  );
}
