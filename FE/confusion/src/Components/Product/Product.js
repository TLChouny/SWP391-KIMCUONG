import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Product/Product.css";

const URL = "http://localhost:8080/api/products";

export default function Product() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(URL)
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error("Error fetching data: ", error));
  }, []);

  return (
    <div className="product-container">
      <div className="product-grid">
        {products.map((product, index) => (
          <div key={index} className="product-card">
            <Link to={`/product/${product._id}`}>
              <img src={product.ProductImageURL} alt={product.ProductName} />
              <h3>{product.ProductName}</h3>
              <p>{product.ProductPrice}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
