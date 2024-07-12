import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Payment.css';
import { Button, Form, Select } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const { Option } = Select;

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const cart = location.state?.cart || [];
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [isCouponValid, setIsCouponValid] = useState(true);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [promotions, setPromotions] = useState([]);
    const [selectedPromotion, setSelectedPromotion] = useState(null); // State to store the selected promotion

    useEffect(() => {
        fetchPromotions();
    }, []);

    const fetchPromotions = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/promotions');
            setPromotions(response.data);
        } catch (error) {
            console.error('Error fetching promotions:', error);
        }
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

    const handleApplyCoupon = () => {
        if (selectedPromotion) {
            setDiscount(selectedPromotion.promotionValue);
            setIsCouponValid(true);
            toast.success(`Bạn đang sử dụng mã giảm giá ${selectedPromotion.promotionId} có mức giảm giá là ${selectedPromotion.promotionValue}`);
        } else {
            setDiscount(0);
            setIsCouponValid(false);
        }
    };

    const handleSelectChange = (value) => {
        const selectedPromo = promotions.find(promo => promo.promotionId === value);
        setCouponCode(value);
        setSelectedPromotion(selectedPromo);
    };

    const handlePayment = () => {
        if (!paymentMethod) {
            toast.error('Please choose payment method');
            return;
        }

        if (paymentMethod === 'momo') {
            navigate('/orderhistory', { state: { cart, totalPrice: discountedPrice > 0 ? discountedPrice : totalPrice, paymentMethod } });
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
                                            <p style={{ fontWeight: "bold", fontSize: 20 }}>{formatPrice(item.ProductPrice)}</p>
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
                                <label htmlFor="credit-card">Momo</label>
                            </div>
                            {/* <div className="payment-option">
                                <input
                                    type="radio"
                                    id="cash-on-delivery"
                                    name="payment-method"
                                    value="cash-on-delivery"
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <label htmlFor="cash-on-delivery">Cash on Delivery</label>
                            </div> */}
                            <div className="coupon-section">
                                <h2>Choose promotion code </h2>
                                <Select
                                    style={{ width: '200px', marginRight: '10px', marginTop: "20px" }}
                                    placeholder="Select promotion code"
                                    onChange={handleSelectChange}
                                    value={couponCode}
                                >
                                    {promotions.map(promo => (
                                        <Option key={promo._id} value={promo.promotionId}>{promo.promotionId}</Option>
                                    ))}
                                </Select>
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
