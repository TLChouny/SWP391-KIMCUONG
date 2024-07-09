import React from 'react';
import { useLocation } from 'react-router-dom';
import './Payment.css';
import { Button, Input, Select } from 'antd';

const { Option } = Select;

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
                <div className="payment-content">
                    <div className="cart-items">
                        {cart.map(item => (
                            <div className="product-details" key={item.ProductId}>
                                <div className="product-main">
                                    <img src={item.ProductImageURL} alt={item.ProductName} />
                                    <div className="product-info">
                                        <h2>{item.ProductName}</h2>
                                        <div className='product-details-item'>
                                            <p>x {item.quantity}</p>
                                            <p>{formatPrice(item.ProductPrice)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="total-price">
                            <h2>Total Price: {formatPrice(cart.reduce((total, item) => total + item.ProductPrice * item.quantity, 0))}</h2>
                        </div>
                    </div>
                    <div className="payment-method">
                        <h2>Payment Method</h2>
                        <form style={{ marginTop: "20px" }}>
                            <div className="payment-option">
                                <input type="radio" id="credit-card" name="payment-method" value="credit-card" />
                                <label htmlFor="credit-card">VN Pay</label>
                            </div>
                            <div className="payment-option">
                                <input type="radio" id="cash-on-delivery" name="payment-method" value="cash-on-delivery" />
                                <label htmlFor="cash-on-delivery">Cash on Delivery</label>
                            </div>
                            <div className="discount-code">
                                <label htmlFor="discount-code">Discount Code:</label>
                                <Input id="discount-code" placeholder="Enter discount code" />
                            </div>
                            <div className="select-discount">
                                <label htmlFor="select-discount">Select Discount Code:</label>
                                <Select id="select-discount" placeholder="Select a discount" style={{ width: '100%' }}>
                                    <Option value="discount10">10% OFF</Option>
                                    <Option value="discount20">20% OFF</Option>
                                    <Option value="discount30">30% OFF</Option>
                                </Select>
                            </div>
                            <Button type="primary" style={{ marginTop: "20px" }}>Apply Discount</Button>
                        </form>
                    </div>
                </div>
            ) : (
                <p>No items in cart</p>
            )}
        </div>
    );
};

export default Payment;
