import React, { useEffect, useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { Button, Form, Input, Modal, Table } from 'antd';
import SampleProducts from '../Sample/SampleProducts';
import './ManageProduct.css';

const { Item: FormItem } = Form;

function ManageProduct() {
    const [productID, setProductID] = useState('');
    const [productName, setProductName] = useState('');
    const [productImage, setProductImage] = useState('');
    const [mainIngredient, setMainIngredient] = useState('');
    const [secondaryIngredient, setSecondaryIngredient] = useState('');
    const [cover, setCover] = useState('');
    const [productType, setProductType] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
    const [products, setProducts] = useState([]);
    const [modalProduct, setModalProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showProductForm, setShowProductForm] = useState(false);

    useEffect(() => {
        setProducts(SampleProducts);
    }, []);

    const addProduct = () => {
        if (productName.trim() !== '' && productType.trim() !== '' && productQuantity !== '') {
            const newProduct = {
                id: productID,
                name: productName,
                image: productImage,
                mainIngredient: mainIngredient,
                secondaryIngredient: secondaryIngredient,
                cover: cover,
                type: productType,
                price: productPrice,
                quantity: parseInt(productQuantity)
            };
            setProducts([...products, newProduct]);
            clearForm();
            setShowProductForm(false);
        }
    };

    const clearForm = () => {
        setProductID('');
        setProductName('');
        setProductImage('');
        setMainIngredient('');
        setSecondaryIngredient('');
        setCover('');
        setProductType('');
        setProductPrice('');
        setProductQuantity('');
    };

    const deleteProduct = (id) => {
        const updatedProducts = products.filter(product => product.id !== id);
        setProducts(updatedProducts);
    };

    const openEditModal = (product) => {
        setModalProduct(product);
        setShowModal(true);
    };

    const saveEditProduct = () => {
        const updatedProducts = products.map(p =>
            p.id === modalProduct.id ? modalProduct : p
        );
        setProducts(updatedProducts);
        setShowModal(false);
    };

    const handleCloseModal = () => setShowModal(false);

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setModalProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="ManageProduct">
            <div className="Top">
                <Link to="/">
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
                    <div className="admininfo">
                        Tên: Long Châu<br />
                        SĐT: 0784871238<br />
                        Role: Manager
                    </div>
                </div>
                <div className="AdminTable">
                    <div className="AdminTableList">
                        <div><Link smooth to="#mtt-5">Manage Product</Link></div>
                        <div><Link smooth to="/">Manage PHIẾU CHỨNG NHẬN</Link></div>
                        <div><Link smooth to="/">Manage PHIẾU BẢO HÀNH</Link></div>
                        <div><Link smooth to="/">Manage PHIẾU GIẢM GIÁ</Link></div>
                        <div><Link smooth to="/">My Profile</Link></div>
                    </div>
                </div>
            </div>
            <div className="right-panel">
                <div>
                    <Button type="primary" onClick={() => setShowProductForm(true)}>
                        Create product
                    </Button>
                    <Modal
                        title="Thêm sản phẩm mới"
                        visible={showProductForm}
                        onCancel={() => setShowProductForm(false)}
                        footer={null}
                    >
                        <Form layout="vertical">
                            <FormItem label="ID">
                                <Input
                                    placeholder="Enter product ID"
                                    value={productID}
                                    onChange={(e) => setProductID(e.target.value)}
                                />
                            </FormItem>
                            <FormItem label="Tên sản phẩm">
                                <Input
                                    placeholder="Enter product name"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                />
                            </FormItem>
                            <FormItem label="Image">
                                <Input
                                    placeholder="Enter product image URL"
                                    value={productImage}
                                    onChange={(e) => setProductImage(e.target.value)}
                                />
                            </FormItem>
                            <FormItem label="Main Ingredient">
                                <Input
                                    placeholder="Enter main ingredient"
                                    value={mainIngredient}
                                    onChange={(e) => setMainIngredient(e.target.value)}
                                />
                            </FormItem>
                            <FormItem label="Secondary Ingredient">
                                <Input
                                    placeholder="Enter secondary ingredient"
                                    value={secondaryIngredient}
                                    onChange={(e) => setSecondaryIngredient(e.target.value)}
                                />
                            </FormItem>
                            <FormItem label="Cover">
                                <Input
                                    placeholder="Enter cover"
                                    value={cover}
                                    onChange={(e) => setCover(e.target.value)}
                                />
                            </FormItem>
                            <FormItem label="Type">
                                <Input
                                    placeholder="Enter product type"
                                    value={productType}
                                    onChange={(e) => setProductType(e.target.value)}
                                />
                            </FormItem>
                            <FormItem label="Price">
                                <Input
                                    placeholder="Enter product price"
                                    value={productPrice}
                                    onChange={(e) => setProductPrice(e.target.value)}
                                />
                            </FormItem>
                            <FormItem label="Quantity">
                                <Input
                                    placeholder="Enter product quantity"
                                    value={productQuantity}
                                    onChange={(e) => setProductQuantity(e.target.value)}
                                />
                            </FormItem>
                            <Button type="primary" onClick={addProduct}>
                                Thêm sản phẩm
                            </Button>
                        </Form>
                    </Modal>

                    <div className="manager-table-product">
                        <Table className="mt-3" dataSource={products} rowKey="id">
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
                    </div>

                    <Modal
                        title="Edit Product"
                        visible={showModal}
                        onOk={saveEditProduct}
                        onCancel={handleCloseModal}
                    >
                        {modalProduct && (
                            <Form layout="vertical">
                                <FormItem label="ID">
                                    <Input
                                        name="id"
                                        value={modalProduct.id}
                                        onChange={handleEditChange}
                                    />
                                </FormItem>
                                <FormItem label="Name">
                                    <Input
                                        name="name"
                                        value={modalProduct.name}
                                        onChange={handleEditChange}
                                    />
                                </FormItem>
                                <FormItem label="Image">
                                    <Input
                                        name="image"
                                        value={modalProduct.image}
                                        onChange={handleEditChange}
                                    />
                                </FormItem>
                                <FormItem label="Main Ingredient">
                                    <Input
                                        name="mainIngredient"
                                        value={modalProduct.mainIngredient}
                                        onChange={handleEditChange}
                                    />
                                </FormItem>
                                <FormItem label="Secondary Ingredient">
                                    <Input
                                        name="secondaryIngredient"
                                        value={modalProduct.secondaryIngredient}
                                        onChange={handleEditChange}
                                    />
                                </FormItem>
                                <FormItem label="Cover">
                                    <Input
                                        name="cover"
                                        value={modalProduct.cover}
                                        onChange={handleEditChange}
                                    />
                                </FormItem>
                                <FormItem label="Type">
                                    <Input
                                        name="type"
                                        value={modalProduct.type}
                                        onChange={handleEditChange}
                                    />
                                </FormItem>
                                <FormItem label="Price">
                                    <Input
                                        name="price"
                                        value={modalProduct.price}
                                        onChange={handleEditChange}
                                    />
                                </FormItem>
                                <FormItem label="Quantity">
                                    <Input
                                        name="quantity"
                                        value={modalProduct.quantity}
                                        onChange={handleEditChange}
                                    />
                                </FormItem>
                            </Form>
                        )}
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default ManageProduct;
