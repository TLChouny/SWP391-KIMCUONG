import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Cart.css"; // Make sure to create appropriate CSS for your cart page
import Headerlogin from "../Headerlogin/Headerlogin";
import Menuheaderlogin from "../Menuheaderlogin/Menuheaderlogin";
import DeleteIcon from '@mui/icons-material/Delete';
// import Footer from "../Footer/Footer"; // Uncomment if Footer component is needed
import { Button } from "antd";

const Cart = () => {
    const [cart, setCart] = useState([]);

    // Define a key to track changes in localStorage
    const localStorageKey = 'cart'; // Removed useState for localStorageKey

    useEffect(() => {
        const cartData = JSON.parse(localStorage.getItem(localStorageKey)) || [];

        // Set default quantity to 1 for new items in cart
        const updatedCart = cartData.map(item => ({
            ...item,
            quantity: item.quantity || 1 // Default quantity to 1 if not set
        }));

        setCart(updatedCart);
        localStorage.setItem(localStorageKey, JSON.stringify(updatedCart));
    }, []); // useEffect runs once on component mount

    // Function to calculate the total price of the cart
    // Function to calculate the total price of the cart
    const calculateTotalPrice = () => {
        if (cart.length === 0) {
            return "0đ"; // Trả về 0 nếu giỏ hàng rỗng
        }
        const totalPrice = cart.reduce((total, item) => total + item.ProductPrice * item.quantity, 0);
        return ` ${totalPrice}đ`;
    };
    



    // Function to update quantity of an item in cart
    const updateQuantity = (productId, newQuantity) => {
        const updatedCart = cart.map(item =>
            item.ProductId === productId ? { ...item, quantity: newQuantity } : item
        );
        setCart(updatedCart);
        localStorage.setItem(localStorageKey, JSON.stringify(updatedCart));
    };

    // Function to increment quantity
    const incrementQuantity = (productId) => {
        const updatedQuantity = cart.find(item => item.ProductId === productId).quantity + 1;
        updateQuantity(productId, updatedQuantity);
    };

    // Function to decrement quantity
    const decrementQuantity = (productId) => {
        const updatedQuantity = cart.find(item => item.ProductId === productId).quantity - 1;
        if (updatedQuantity >= 1) {
            updateQuantity(productId, updatedQuantity);
        }
    };

    // Function to remove an item from cart
    const removeItem = (productId) => {
        const updatedCart = cart.filter(item => item.ProductId !== productId);
        setCart(updatedCart);
        localStorage.setItem(localStorageKey, JSON.stringify(updatedCart));
    };

    return (
        <>
            <Headerlogin />
            <Menuheaderlogin />
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
                                        <td>{item.ProductPrice}đ</td>
                                        <td>
                                            <div className="quantity">
                                                <Button onClick={() => decrementQuantity(item.ProductId)}> - </Button>
                                                <span>{item.quantity}</span>
                                                <Button onClick={() => incrementQuantity(item.ProductId)}> + </Button>
                                            </div>
                                        </td>
                                        <td>{item.ProductPrice * item.quantity}đ</td>
                                        <td>
                                            <Button type="danger" onClick={() => removeItem(item.ProductId)}><DeleteIcon /></Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="cart-total">
                            <b>Total Price: </b>{calculateTotalPrice()}
                            <Link to="/payment" className="cart-link" style={{marginLeft: "20px", fontSize: "18px"}}>Buy product</Link>
                        </div>
                    </div>
                ) : (
                    <p className="empty-cart-message">Your cart is empty.</p>

                )}
                <Link to="/catalogin" className="cart-link">Continue shopping</Link>
            </div>
            {/* <Footer /> */}
        </>
    );
};

export default Cart;
