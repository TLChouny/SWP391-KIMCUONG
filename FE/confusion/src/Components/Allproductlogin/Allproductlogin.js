import React, { useEffect, useState } from "react";
import "./Allproductlogin.css";
import { Button } from "antd"; // Import Button from Ant Design
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify
import { Link } from "react-router-dom";

const URL = "http://localhost:8080/api/products";

const Allproductlogin = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]); // State to manage the cart items

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log the data to check its structure
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Function to handle adding a product to the cart
  const addToCart = (product, event) => {
    const imgElement = event.target.closest('.product-item').querySelector('img');

    // Clone the product image element
    const clonedImg = imgElement.cloneNode(true);
    clonedImg.classList.add('fly-animation');
    document.body.appendChild(clonedImg);

    // Get the position of the original image
    const { top, left, width, height } = imgElement.getBoundingClientRect();
    clonedImg.style.position = 'fixed';
    clonedImg.style.top = `${top}px`;
    clonedImg.style.left = `${left}px`;
    clonedImg.style.width = `${width}px`;
    clonedImg.style.height = `${height}px`;

    // Add the product to the cart
    setCart((prevCart) => [...prevCart, product]);

    // Show a toast notification indicating the product has been added to the cart
    toast.success(`${product.ProductName} has been added to your cart.`);

    // Remove the cloned image after the animation
    setTimeout(() => {
      document.body.removeChild(clonedImg);
    }, 1000);
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
              <p className="product-price">Price: {product.ProductPrice}</p>
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
