import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Cart.css";
import Headerlogin from "../Headerlogin/Headerlogin";
import Menuheaderlogin from "../Menuheaderlogin/Menuheaderlogin";
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from "antd";

const Cart = () => {
    const [cart, setCart] = useState([]);

    const localStorageKey = 'cart';

    useEffect(() => {
        const cartData = JSON.parse(localStorage.getItem(localStorageKey)) || [];

        const updatedCart = cartData.map(item => ({
            ...item,
            quantity: item.quantity || 1
        }));

        setCart(updatedCart);
        localStorage.setItem(localStorageKey, JSON.stringify(updatedCart));
    }, []);

    const formatPrice = (price) => {

        let parts = price.toFixed(0).toString().split(".");

        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        if (parts.length === 1) {
            return parts[0] + "đ";
        } else {
            return parts.join(".") + "đ";
        }
    };


    const calculateTotalPrice = () => {
        if (cart.length === 0) {
            return formatPrice(0);
        }
        const totalPrice = cart.reduce((total, item) => total + item.ProductPrice * item.quantity, 0);
        return formatPrice(totalPrice);
    };

    const updateQuantity = (productId, newQuantity) => {
        const updatedCart = cart.map(item =>
            item.ProductId === productId ? { ...item, quantity: newQuantity } : item
        );
        setCart(updatedCart);
        localStorage.setItem(localStorageKey, JSON.stringify(updatedCart));
    };

    const incrementQuantity = (productId) => {
        const updatedQuantity = cart.find(item => item.ProductId === productId).quantity + 1;
        updateQuantity(productId, updatedQuantity);
    };

    const decrementQuantity = (productId) => {
        const updatedQuantity = cart.find(item => item.ProductId === productId).quantity - 1;
        if (updatedQuantity >= 1) {
            updateQuantity(productId, updatedQuantity);
        }
    };

    const removeItem = (productId) => {
        // Find index of item to remove
        const index = cart.findIndex(item => item.ProductId === productId);
    
        if (index !== -1) {
            // Create a new array with item removed
            const updatedCart = [...cart];
            updatedCart.splice(index, 1);
    
            // Update state with the new cart array
            setCart(updatedCart);
    
            // Update localStorage with the updated cart array
            localStorage.setItem(localStorageKey, JSON.stringify(updatedCart));
        }
    };
    

    return (
        <>
            <div className="cart">
                <h1>Your Cart</h1>
                {cart.length > 0 ? (
                    <div className="cart-items">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name of Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th></th> {/* New column for delete button */}
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((item) => (
                                    <tr key={item.ProductId} className="cart-item">
                                        <td className="cart-item-product">
                                            <img src={item.ProductImageURL} alt={item.ProductName} />
                                            <div className="item-details">
                                                <h2>{item.ProductName}</h2>
                                            </div>
                                        </td>
                                        <td>{formatPrice(item.ProductPrice)}</td>
                                        <td>
                                            <div className="quantity">
                                                <Button onClick={() => decrementQuantity(item.ProductId)}> - </Button>
                                                <span>{item.quantity}</span>
                                                <Button onClick={() => incrementQuantity(item.ProductId)}> + </Button>
                                            </div>
                                        </td>
                                        <td>{formatPrice(item.ProductPrice * item.quantity)}</td>
                                        <td>
                                            <Button type="danger" onClick={() => removeItem(item.ProductId)}>
                                                <DeleteIcon />
                                            </Button>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="cart-total">
                            <b>Total Price: </b>{calculateTotalPrice()}
                            <Link to="/payment" className="cart-link" style={{ marginLeft: "20px", fontSize: "18px" }}>Buy product</Link>
                        </div>
                    </div>
                ) : (
                    <p className="empty-cart-message">Your cart is empty.</p>
                )}
                <Link to="/catalogin" className="cart-link">Continue shopping</Link>
            </div>
        </>
    );
};

export default Cart;
