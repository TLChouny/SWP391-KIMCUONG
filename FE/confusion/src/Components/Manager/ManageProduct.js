import React, { useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { Button, Form, Input, Modal, Table } from 'antd';
import SampleProducts from '../Sample/SampleProducts';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ManageProduct.css';

const ManageProduct = () => {
    const [products, setProducts] = useState(SampleProducts);
    const [modalProduct, setModalProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showProductForm, setShowProductForm] = useState(false);

    const [form] = Form.useForm(); // Form instance for Add Product modal
    const [editForm] = Form.useForm(); // Form instance for Edit Product modal

    const addProduct = () => {
        form.validateFields().then(values => {
            // Check if ID is unique
            if (products.some(product => product.id === values.id)) {
                toast.error('ID must be unique');
                return;
            }

            // Check if Name is unique
            if (products.some(product => product.name === values.name)) {
                toast.error('Name must be unique');
                return;
            }
            const newProduct = {
                id: values.id,
                name: values.name,
                image: values.image,
                mainIngredient: values.mainIngredient,
                secondaryIngredient: values.secondaryIngredient,
                cover: values.cover,
                type: values.type,
                price: parseFloat(values.price), // Convert to number
                quantity: parseInt(values.quantity), // Convert to number
            };
    
            // Check if price and quantity are positive numbers
            if (newProduct.price <= 0 || isNaN(newProduct.price)) {
                toast.error('Price must be a positive number');
                return;
            }
            if (newProduct.quantity <= 0 || isNaN(newProduct.quantity)) {
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
                if (products.some(product => product.name === values.name && product.id !== modalProduct.id)) {
                    toast.error('Name must be unique');
                    return;
                }
            const updatedProducts = products.map(p =>
                p.id === modalProduct.id ? {
                    ...p,
...values,
                    price: parseFloat(values.price), // Convert to number
                    quantity: parseInt(values.quantity), // Convert to number
                } : p
            );
    
            // Check if price and quantity are positive numbers
            const editedProduct = updatedProducts.find(p => p.id === modalProduct.id);
            if (editedProduct.price <= 0 || isNaN(editedProduct.price)) {
                toast.error('Price must be a positive number');
                return;
            }
            if (editedProduct.quantity <= 0 || isNaN(editedProduct.quantity)) {
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
            const updatedProducts = products.filter(product => product.id !== id);
            setProducts(updatedProducts);
            toast.success('Product deleted successfully');
        }
    };

    const openEditModal = (product) => {
        setModalProduct(product);
        setShowModal(true);
        editForm.setFieldsValue(product); // Set initial values for Edit Product form
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
                            label="Image"
                            rules={[{ required: true, message: 'Please enter product image URL' }]}
                            validateTrigger={['onChange', 'onBlur']}
                        >
                            <Input placeholder="Enter product image URL" />
                        </Form.Item>
                        <Form.Item
                            name="mainIngredient"
                            label="Main Ingredient"
                            rules={[{ required: true, message: 'Please enter product main ingredient' }]}
                            validateTrigger={['onChange', 'onBlur']}
                        >
                            <Input placeholder="Enter main ingredient" />
                        </Form.Item>
                        <Form.Item
name="secondaryIngredient"
                            label="Secondary Ingredient"
                            rules={[{ required: true, message: 'Please enter product secondary ingredient' }]}
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
                            <Input placeholder="Enter cover" />
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
                            ]}
                            validateTrigger={['onChange', 'onBlur']}
                        >
                            <Input placeholder="Enter product price" />
                        </Form.Item>
                        <Form.Item
                            name="quantity"
                            label="Quantity"
                            rules={[{ required: true, message: 'Please enter product quanity' }]}
                            validateTrigger={['onChange', 'onBlur']}
                        >
                            <Input placeholder="Enter product quantity" />
                        </Form.Item>
                    </Form>
                </Modal>

                <Table dataSource={products} rowKey="id">
                    <Table.Column title="ID" dataIndex="id" key="id" />
                    <Table.Column title="Name" dataIndex="name" key="name" />
                    <Table.Column title="Image" dataIndex="image" key="image" />
                    <Table.Column title="Main Ingredient" dataIndex="mainIngredient" key="mainIngredient" />
                    <Table.Column title="Secondary Ingredient" dataIndex="secondaryIngredient" key="secondaryIngredient" />
                    <Table.Column title="Cover" dataIndex="cover" key="cover" />
                    <Table.Column title="Type" dataIndex="type" key="type" />
                    <Table.Column title="Price" dataIndex="price" key="price" />
<Table.Column title="Quantity" dataIndex="quantity" key="quantity" />
                    <Table.Column
                        title="Actions"
                        key="actions"
                        render={(text, record) => (
                            <>
                                <Button type="link" onClick={() => openEditModal(record)}>
                                    Edit
                                </Button>
                                <Button type="link" onClick={() => deleteProduct(record.id)}>
                                    Delete
                                </Button>
                            </>
                        )}
                    />
                </Table>

                <Modal
    title="Edit Product"
    visible={showModal}
    onOk={saveEditProduct}
    onCancel={handleCloseModal}
>
    <Form form={editForm} layout="vertical" initialValues={modalProduct}>
        <Form.Item
            name="id"
            label="ID"
        >
            <Input disabled />
        </Form.Item>
        <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter product name' }]}
            validateTrigger={['onChange', 'onBlur']}
        >
            <Input />
        </Form.Item>
        <Form.Item
            name="image"
            label="Image"
            rules={[{ required: true, message: 'Please enter product image URL' }]}
            validateTrigger={['onChange', 'onBlur']}
        >
            <Input />
        </Form.Item>
        <Form.Item
            name="mainIngredient"
            label="Main Ingredient"
            rules={[{ required: true, message: 'Please enter main ingredient' }]}
            validateTrigger={['onChange', 'onBlur']}
        >
            <Input />
        </Form.Item>
        <Form.Item
            name="secondaryIngredient"
            label="Secondary Ingredient"
            rules={[{ required: true, message: 'Please enter secondary ingredient' }]}
            validateTrigger={['onChange', 'onBlur']}
        >
            <Input />
        </Form.Item>
        <Form.Item
            name="cover"
            label="Cover"
            rules={[{ required: true, message: 'Please enter cover' }]}
            validateTrigger={['onChange', 'onBlur']}
        >
            <Input />
        </Form.Item>
        <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true, message: 'Please enter product type' }]}
            validateTrigger={['onChange', 'onBlur']}
        >
            <Input />
        </Form.Item>
        <Form.Item
            name="price"
            label="Price"
            rules={[
                { required: true, message: 'Please enter product price' },
            ]}
            validateTrigger={['onChange', 'onBlur']}
        >
            <Input />
        </Form.Item>
        <Form.Item
            name="quantity"
label="Quantity"
            rules={[
                { required: true, message: 'Please enter product quantity' },
            ]}
            validateTrigger={['onChange', 'onBlur']}
        >
            <Input />
        </Form.Item>
    </Form>
</Modal>

            </div>
        </div>
    );
}

export default ManageProduct;