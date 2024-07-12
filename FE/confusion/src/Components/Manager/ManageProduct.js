import React, { useState, useEffect } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { Button, Form, Input, Modal, Table } from 'antd';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ManageProduct.css';

const URL = "http://localhost:8080/api/products";

const ManageProduct = () => {
    const [products, setProducts] = useState([]);
    const [modalProduct, setModalProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showProductForm, setShowProductForm] = useState(false);

    const [form] = Form.useForm(); // Form instance for Add Product modal
    const [editForm] = Form.useForm(); // Form instance for Edit Product modal

    useEffect(() => {
        // Fetch products from API
        axios.get(URL)
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the products!', error);
            });
    }, []);

    const addProduct = () => {
        form.validateFields().then(values => {
            // Check if ID is unique
            if (products.some(product => product.ProductId === values.id)) {
                toast.error('ID must be unique');
                return;
            }

            // Check if Name is unique
            if (products.some(product => product.ProductName === values.name)) {
                toast.error('Name must be unique');
                return;
            }
            const newProduct = {
                ProductId: values.id,
                ProductName: values.name,
                ProductImageURL: values.image,
                ProductMain: values.mainIngredient,
                ProductSub: values.secondaryIngredient,
                ProductMounting: values.cover,
                ProductCategory: values.type,
                ProductPrice: parseFloat(values.price), // Convert to number
                ProductQuantity: parseInt(values.quantity), // Convert to number
            };

            // Check if price and quantity are positive numbers
            if (newProduct.ProductPrice <= 0 || isNaN(newProduct.ProductPrice)) {
                toast.error('Price must be a positive number');
                return;
            }
            if (newProduct.ProductQuantity <= 0 || isNaN(newProduct.ProductQuantity)) {
                toast.error('Quantity must be a positive number');
                return;
            }

            setProducts([...products, newProduct]);
            form.resetFields();
            setShowProductForm(false);
            toast.success('Product added successfully');
        }).catch(errorInfo => {
            console.log('Validation failed:', errorInfo);
        });
    };

    const saveEditProduct = () => {
        editForm.validateFields().then(values => {
            // Check if Name is unique among other products (excluding the current one)
            if (products.some(product => product.ProductName === values.name && product.ProductId !== modalProduct.ProductId)) {
                toast.error('Name must be unique');
                return;
            }
            const updatedProducts = products.map(p =>
                p.ProductId === modalProduct.ProductId ? {
                    ...p,
                    ProductName: values.name,
                    ProductImageURL: values.image,
                    ProductMain: values.mainIngredient,
                    ProductSub: values.secondaryIngredient,
                    ProductMounting: values.cover,
                    ProductCategory: values.type,
                    ProductPrice: parseFloat(values.price), // Convert to number
                    ProductQuantity: parseInt(values.quantity), // Convert to number
                } : p
            );

            // Check if price and quantity are positive numbers
            const editedProduct = updatedProducts.find(p => p.ProductId === modalProduct.ProductId);
            if (editedProduct.ProductPrice <= 0 || isNaN(editedProduct.ProductPrice)) {
                toast.error('Price must be a positive number');
                return;
            }
            if (editedProduct.ProductQuantity <= 0 || isNaN(editedProduct.ProductQuantity)) {
                toast.error('Quantity must be a positive number');
                return;
            }

            setProducts(updatedProducts);
            setShowModal(false);
            toast.success('Product updated successfully');
        }).catch(errorInfo => {
            console.log('Validation failed:', errorInfo);
        });
    };

    const deleteProduct = (id) => {
        if (window.confirm('Are you sure to delete this product?')) {
            const updatedProducts = products.filter(product => product.ProductId !== id);
            setProducts(updatedProducts);
            toast.success('Product deleted successfully');
        }
    };

    const openEditModal = (product) => {
        setModalProduct(product);
        setShowModal(true);
        editForm.setFieldsValue({
            id: product.ProductId,
            name: product.ProductName,
            image: product.ProductImageURL,
            mainIngredient: product.ProductMain,
            secondaryIngredient: product.ProductSub,
            cover: product.ProductMounting,
            type: product.ProductCategory,
            price: product.ProductPrice,
            quantity: product.ProductQuantity
        });
    };

    const handleCloseModal = () => setShowModal(false);

    return (
        <div className="ManageProduct">
            <ToastContainer />
            <div className="Top">
                <Link to="/register">
                    <button className="Btn">
                        <div className="sign">
                            <svg viewBox="0 0 512 512">
                                <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                            </svg>
                        </div>
                        <div className="text">Logout</div>
                    </button>
                </Link>
            </div>
            <div className="left-panel">
                <div className="AdminAvatar">
                    <Link to="">
                        <img src="../assets/admin.png" className="adminavatar" alt="Avatar" />
                    </Link>
                    <p className="adminname">Manager, Long Châu</p>
                </div>
                <div className="AdminTableList">
                    <div><Link smooth to="/manager">Manage Product</Link></div>
                    <div><Link smooth to="/certificate">Manage Certification Form</Link></div>
                    <div><Link smooth to="/">Manage Warranty</Link></div>
                    <div><Link smooth to="/">Manage Coupons</Link></div>
                    <div><Link smooth to="/">My Profile</Link></div>
                </div>
            </div>
            <div className="right-panel">
                <Button type="primary" onClick={() => setShowProductForm(true)} className='create-product'>
                    Create product
                </Button>
                <Modal
                    title="Add New Product"
                    visible={showProductForm}
                    onCancel={() => setShowProductForm(false)}
                    footer={[
                        <Button key="cancel" onClick={() => setShowProductForm(false)}>
                            Cancel
                        </Button>,
                        <Button key="submit" type="primary" onClick={addProduct}>
                            Add Product
                        </Button>,
                    ]}
                >
                    <Form form={form} layout="vertical">
                        <Form.Item
                            name="id"
                            label="ID"
                            rules={[
                                { required: true, message: 'Please enter product ID' },
                            ]}
                            validateTrigger={['onChange', 'onBlur']}
                        >
                            <Input placeholder="Enter product ID" />
                        </Form.Item>
                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[{ required: true, message: 'Please enter product name' }]}
                            validateTrigger={['onChange', 'onBlur']}
                        >
                            <Input placeholder="Enter product name" />
                        </Form.Item>
                        <Form.Item
                            name="image"
                            label="Image URL"
                            rules={[{ required: true, message: 'Please enter product image URL' }]}
                            validateTrigger={['onChange', 'onBlur']}
                        >
                            <Input placeholder="Enter product image URL" />
                        </Form.Item>
                        <Form.Item
                            name="mainIngredient"
                            label="Main ingredient"
                            rules={[{ required: true, message: 'Please enter main ingredient' }]}
                            validateTrigger={['onChange', 'onBlur']}
                        >
                            <Input placeholder="Enter main ingredient" />
                        </Form.Item>
                        <Form.Item
                            name="secondaryIngredient"
                            label="Secondary ingredient"
                            rules={[{ required: true, message: 'Please enter secondary ingredient' }]}
                            validateTrigger={['onChange', 'onBlur']}
                        >
                            <Input placeholder="Enter secondary ingredient" />
                        </Form.Item>
                        <Form.Item
                            name="cover"
                            label="Cover"
                            rules={[{ required: true, message: 'Please enter product cover' }]}
                            validateTrigger={['onChange', 'onBlur']}
                        >
                            <Input placeholder="Enter product cover" />
                        </Form.Item>
                        <Form.Item
                            name="type"
                            label="Type"
                            rules={[{ required: true, message: 'Please enter product type' }]}
                            validateTrigger={['onChange', 'onBlur']}
                        >
                            <Input placeholder="Enter product type" />
                        </Form.Item>
                        <Form.Item
                            name="price"
                            label="Price"
                            rules={[
                                { required: true, message: 'Please enter product price' },
                                { type: 'number', message: 'Price must be a number' },
                            ]}
                            validateTrigger={['onChange', 'onBlur']}
                        >
                            <Input type="number" placeholder="Enter product price" />
                        </Form.Item>
                        <Form.Item
                            name="quantity"
                            label="Quantity"
                            rules={[
                                { required: true, message: 'Please enter product quantity' },
                                { type: 'number', message: 'Quantity must be a number' },
                            ]}
                            validateTrigger={['onChange', 'onBlur']}
                        >
                            <Input type="number" placeholder="Enter product quantity" />
                        </Form.Item>
                    </Form>
                </Modal>
                <Table dataSource={products} rowKey="ProductId">
                    <Table.Column title="Product ID" dataIndex="ProductId" key="ProductId" />
                    <Table.Column title="Product Name" dataIndex="ProductName" key="ProductName" />
                    <Table.Column 
                        title="Image URL" 
                        dataIndex="ProductImageURL" 
                        key="ProductImageURL" 
                        render={text => <img src={text} alt="Product" style={{ width: '100px' }} />} 
                    />
                    <Table.Column title="Main Ingredient" dataIndex="ProductMain" key="ProductMain" />
                    <Table.Column title="Secondary Ingredient" dataIndex="ProductSub" key="ProductSub" />
                    <Table.Column title="Cover" dataIndex="ProductMounting" key="ProductMounting" />
                    <Table.Column title="Type" dataIndex="ProductCategory" key="ProductCategory" />
                    <Table.Column title="Price" dataIndex="ProductPrice" key="ProductPrice" />
                    <Table.Column title="Quantity" dataIndex="ProductQuantity" key="ProductQuantity" />
                    <Table.Column
                        title="Actions"
                        key="actions"
                        render={(text, record) => (
                            <>
                                <Button onClick={() => openEditModal(record)}>Edit</Button>
                                <Button danger onClick={() => deleteProduct(record.ProductId)}>Delete</Button>
                            </>
                        )}
                    />
                </Table>
                <Modal
                    title="Edit Product"
                    visible={showModal}
                    onCancel={handleCloseModal}
                    footer={[
                        <Button key="cancel" onClick={handleCloseModal}>
                            Cancel
                        </Button>,
                        <Button key="submit" type="primary" onClick={saveEditProduct}>
                            Save Changes
                        </Button>,
                    ]}
                >
                    <Form form={editForm} layout="vertical">
                        <Form.Item
                            name="id"
                            label="ID"
                            rules={[{ required: true, message: 'Please enter product ID' }]}
                        >
                            <Input placeholder="Enter product ID" disabled />
                        </Form.Item>
                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[{ required: true, message: 'Please enter product name' }]}
                        >
                            <Input placeholder="Enter product name" />
                        </Form.Item>
                        <Form.Item
                            name="image"
                            label="Image"
                            rules={[{ required: true, message: 'Please enter product image URL' }]}
                        >
                            <Input placeholder="Enter product image URL" />
                        </Form.Item>
                        <Form.Item
                            name="mainIngredient"
                            label="Main ingredient"
                            rules={[{ required: true, message: 'Please enter main ingredient' }]}
                        >
                            <Input placeholder="Enter main ingredient" />
                        </Form.Item>
                        <Form.Item
                            name="secondaryIngredient"
                            label="Secondary ingredient"
                            rules={[{ required: true, message: 'Please enter secondary ingredient' }]}
                        >
                            <Input placeholder="Enter secondary ingredient" />
                        </Form.Item>
                        <Form.Item
                            name="cover"
                            label="Cover"
                            rules={[{ required: true, message: 'Please enter product cover' }]}
                        >
                            <Input placeholder="Enter product cover" />
                        </Form.Item>
                        <Form.Item
                            name="type"
                            label="Type"
                            rules={[{ required: true, message: 'Please enter product type' }]}
                        >
                            <Input placeholder="Enter product type" />
                        </Form.Item>
                        <Form.Item
                            name="price"
                            label="Price"
                            rules={[
                                { required: true, message: 'Please enter product price' },
                                { type: 'number', message: 'Price must be a number' },
                            ]}
                        >
                            <Input type="number" placeholder="Enter product price" />
                        </Form.Item>
                        <Form.Item
                            name="quantity"
                            label="Quantity"
                            rules={[
                                { required: true, message: 'Please enter product quantity' },
                                { type: 'number', message: 'Quantity must be a number' },
                            ]}
                        >
                            <Input type="number" placeholder="Enter product quantity" />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    );
};

export default ManageProduct;
