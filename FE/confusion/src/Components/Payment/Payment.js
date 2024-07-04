import React from 'react';
import { useLocation } from 'react-router-dom';
import './Payment.css'; 

const Payment = () => {
    const location = useLocation();
    const cart = location.state?.cart || [];

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
        <div className="payment-container">
            <h1>Payment Page</h1>
            {cart.length > 0 ? (
                <div>
                    {cart.map(item => (
                        <div key={item.ProductId} className="product-item">
                            <img src={item.ProductImageURL} alt={item.ProductName} className="product-image" />
                            <div className="product-details">
                                <h2>{item.ProductName}</h2>
                                <p>x {item.quantity}</p>
                                <p>{formatPrice(item.ProductPrice)}</p>
                                {/* <p>Total: {formatPrice(item.ProductPrice * item.quantity)}</p> */}
                            </div>
                        </div>
                    ))}
                    <div className="total-price">
                        <h2>Total Price: {formatPrice(cart.reduce((total, item) => total + item.ProductPrice * item.quantity, 0))}</h2>
                    </div>
                </div>
            ) : (
                <p>No items in cart</p>
            )}
        </div>
    );
};

export default Payment;
