import React from 'react';
import { useLocation } from 'react-router-dom';
import { Table } from 'antd';
import './OrderHistory.css';

const OrderHistory = () => {
    const location = useLocation();
    const { cart, totalPrice, paymentMethod } = location.state || { cart: [], totalPrice: 0, paymentMethod: '' };

    const formatPrice = (price) => {
        let parts = price.toFixed(0).toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        if (parts.length === 1) {
            return parts[0] + "đ";
        } else {
            return parts.join(".") + "đ";
        }
    };

    const columns = [
        {
            title: 'Product Image',
            dataIndex: 'ProductImageURL',
            key: 'ProductImageURL',
            render: (text) => <img src={text} alt="Product" style={{ width: '100px' }} />,
        },
        {
            title: 'Product Name',
            dataIndex: 'ProductName',
            key: 'ProductName',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Price',
            dataIndex: 'ProductPrice',
            key: 'ProductPrice',
            render: (text) => <span>{formatPrice(text)}</span>,
        },
       
    ];

    const data = cart.map((item, index) => ({
        key: index,
        ProductImageURL: item.ProductImageURL,
        ProductName: item.ProductName,
        quantity: item.quantity,
        ProductPrice: item.ProductPrice,
    }));

    return (
        <div className="order-history-container">
            <h1>Order History</h1>
            {cart.length > 0 ? (
                <div className="order-history-content">
                    <Table columns={columns} dataSource={data} pagination={false} />
                    {/* <div className="order-summary">
                        <div className="summary-column">
                            <h2>Total Price:</h2>
                            <p>{formatPrice(totalPrice)}</p>
                        </div>
                        <div className="summary-column">
                            <h2>Payment Method:</h2>
                            <p>{paymentMethod === 'cash-on-delivery' ? 'Cash on Delivery' : 'VN Pay'}</p>
                        </div>
                    </div> */}
                </div>
            ) : (
                <p>No orders found</p>
            )}
        </div>
    );
};

export default OrderHistory;
