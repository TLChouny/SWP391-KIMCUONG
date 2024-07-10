import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Payment.css';
import { Button, Input, Form } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Payment = () => {
    const location = useLocation();
    const cart = location.state?.cart || [];
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [isCouponValid, setIsCouponValid] = useState(true);
    const [paymentMethod, setPaymentMethod] = useState('');

    const formatPrice = (price) => {
        let parts = price.toFixed(0).toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        if (parts.length === 1) {
            return parts[0] + "đ";
        } else {
            return parts.join(".") +"đ";
        }
    };

    const handleApplyCoupon = () => {
        // Add logic to verify and apply the coupon code here
        // For demonstration, we are setting a fixed discount
        if (couponCode === 'DISCOUNT10') {
            setDiscount(0.1); // 10% discount
            setIsCouponValid(true);
        } else {
            setDiscount(0);
            setIsCouponValid(false);
        }
    };

    const handlePayment = () => {
        if (!paymentMethod) {
            toast.error('Please choose payment method');
            return;
        }
       
    };

    const totalPrice = cart.reduce((total, item) => total + item.ProductPrice * item.quantity, 0);
    const discountedPrice = totalPrice * (1 - discount);

    return (
        <div className="payment-container">
            <h1>Payment Page</h1>
            <ToastContainer />
            {cart.length > 0 ? (
                <div className="payment-content">
                    <div className="payment-items">
                        {cart.map(item => (
                            <div className="product-details" key={item.ProductId}>
                                <div className="product-main">
                                    <img src={item.ProductImageURL} alt={item.ProductName} />
                                    <div className="product-info">
                                        <h2>{item.ProductName}</h2>
                                        <div className='product-details-item'>
                                            <p>x {item.quantity}</p>
                                            <p style={{fontWeight: "bold", fontSize: 20}}>{formatPrice(item.ProductPrice)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="total-price">
                            <h2>Total Price: {formatPrice(totalPrice)}</h2>
                        </div>
                    </div>
                    <div className="payment-method">
                        <h2>Payment Method</h2>
                        <Form style={{ marginTop: "20px" }}>
                            <div className="payment-option">
                                <input
                                    type="radio"
                                    id="credit-card"
                                    name="payment-method"
                                    value="credit-card"
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <label htmlFor="credit-card">VN Pay</label>
                            </div>
                            <div className="payment-option">
                                <input
                                    type="radio"
                                    id="cash-on-delivery"
                                    name="payment-method"
                                    value="cash-on-delivery"
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <label htmlFor="cash-on-delivery">Cash on Delivery</label>
                            </div>
                            <div className="coupon-section">
                                <h2>Coupon Code</h2>
                                <Input
                                    placeholder="Enter coupon code"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                    style={{ width: '200px', marginRight: '10px' }}
                                />
                                <Button onClick={handleApplyCoupon}>Apply</Button>
                                {!isCouponValid && <p style={{ color: 'red' }}>Invalid coupon code</p>}
                            </div>
                            <div className="final-price-section">
                                <h2>Total Payment: {formatPrice(discount > 0 ? discountedPrice : totalPrice)}</h2>
                            </div>
                            <Button type="primary" onClick={handlePayment} style={{ marginTop: '20px' }}>
                                Pay Now
                            </Button>
                        </Form>
                    </div>

                </div>
            ) : (
                <p>No items in cart</p>
            )}
        </div>
    );
};

export default Payment;
