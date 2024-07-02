import React, { useEffect, useState } from "react";
import "./Earringsproductlogin.css";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify

const URL = "http://localhost:8080/api/products";

export default function Earringsproductlogin() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]); // State to manage the cart items

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log the data to check its structure
        // Filter products to show only those with category 'earring'
        const filteredProducts = data.filter(product => product.ProductCategory === 'earring');
        setProducts(filteredProducts);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Function to handle adding a product to cart
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
    <>
      <div className="all-products">
        <h1>Earrings Products</h1>
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
          <p>No earrings products found.</p>
        )}
      </div>
      <ToastContainer /> {/* Place ToastContainer at a higher level in your app to display toasts */}
    </>
  );
}
