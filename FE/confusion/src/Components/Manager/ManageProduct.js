import React, { useEffect, useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { Container, Row, Col, Form, Button, Table, Modal } from 'react-bootstrap';
import SampleProducts from '../Sample/SampleProducts';
import './ManageProduct.css';

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
            setShowProductForm(false); // Close the add product modal
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
                    <button className="but" onClick={() => setShowProductForm(true)}>
                        Create product
                    </button>
                    <Modal show={showProductForm} onHide={() => setShowProductForm(false)} className="modal-container">
                        <Modal.Header closeButton>
                            <Modal.Title>Thêm sản phẩm mới</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Container>
                                <Row>
                                    <Col>
                                        <Form>
                                            <Form.Group controlId="formProductID">
                                                <Form.Label>ID</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter product ID"
                                                    value={productID}
                                                    onChange={(e) => setProductID(e.target.value)}
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="formProductName">
                                                <Form.Label>Tên sản phẩm</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter product name"
                                                    value={productName}
                                                    onChange={(e) => setProductName(e.target.value)}
                                                />
                                            </Form.Group>
                                            {/* Add other form fields for product details */}
                                            <Button variant="primary" onClick={addProduct}>
                                                Thêm sản phẩm
                                            </Button>
                                        </Form>
                                    </Col>
                                </Row>
                            </Container>
                        </Modal.Body>
                    </Modal>

                    <div className="manager-table-product">
                        <Table striped bordered hover className="mt-3">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Image</th>
                                    <th>Main Ingredient</th>
                                    <th>Secondary Ingredient</th>
                                    <th>Cover</th>
                                    <th>Type</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.image}</td>
                                        <td>{product.mainIngredient}</td>
                                        <td>{product.secondaryIngredient}</td>
                                        <td>{product.cover}</td>
                                        <td>{product.type}</td>
                                        <td>{product.price}</td>
                                        <td>{product.quantity}</td>
                                        <td>
                                            <Button variant="edit" onClick={() => openEditModal(product)}>Edit</Button>
                                            <Button variant="delete" onClick={() => deleteProduct(product.id)}>Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formProductName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={modalProduct ? modalProduct.name : ''}
                                onChange={handleEditChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formProductImage">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="text"
                                name="image"
                                value={modalProduct ? modalProduct.image : ''}
                                onChange={handleEditChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formMainIngredient">
                            <Form.Label>Main Ingredient</Form.Label>
                            <Form.Control
                                type="text"
                                name="mainIngredient"
                                value={modalProduct ? modalProduct.mainIngredient : ''}
                                onChange={handleEditChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formSecondaryIngredient">
                            <Form.Label>Secondary Ingredient</Form.Label>
                            <Form.Control
                                type="text"
                                name="secondaryIngredient"
                                value={modalProduct ? modalProduct.secondaryIngredient : ''}
                                onChange={handleEditChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formCover">
                            <Form.Label>Cover</Form.Label>
                            <Form.Control
                                type="text"
                                name="cover"
                                value={modalProduct ? modalProduct.cover : ''}
                                onChange={handleEditChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formProductType">
                            <Form.Label>Type</Form.Label>
                            <Form.Control
                                type="text"
                                name="type"
                                value={modalProduct ? modalProduct.type : ''}
                                onChange={handleEditChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formProductPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                value={modalProduct ? modalProduct.price : ''}
                                onChange={handleEditChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formProductQuantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                name="quantity"
                                value={modalProduct ? modalProduct.quantity : ''}
                                onChange={handleEditChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveEditProduct}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ManageProduct;