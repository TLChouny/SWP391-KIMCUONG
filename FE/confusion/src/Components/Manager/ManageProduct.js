// import { Link } from "react-router-dom";
import "./ManageProduct.css";
import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Container, Row, Col, Form, Button, ListGroup, Modal } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

function ManageProduct() {
    const [products, setProducts] = useState([]);
    const [productName, setProductName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalProduct, setModalProduct] = useState({ id: '', name: '' });

    // Thêm sản phẩm mới
    const addProduct = () => {
        if (productName.trim() !== '') {
            const newProduct = {
                id: uuidv4(),
                name: productName
            };
            setProducts([...products, newProduct]);
            setProductName('');
        }
    };

    // Xóa sản phẩm
    const deleteProduct = (id) => {
        const updatedProducts = products.filter(product => product.id !== id);
        setProducts(updatedProducts);
    };

    // Mở modal để chỉnh sửa sản phẩm
    const openEditModal = (product) => {
        setModalProduct(product);
        setShowModal(true);
    };

    // Lưu chỉnh sửa sản phẩm
    const saveEditProduct = () => {
        const updatedProducts = products.map(product =>
            product.id === modalProduct.id ? modalProduct : product
        );
        setProducts(updatedProducts);
        setShowModal(false);
    };

    // Đóng modal
    const handleCloseModal = () => setShowModal(false);

    return (
        <div className="ManageProduct">
        <div className="Top">
            <Link to="/"><button class="Btn">
                <div class="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
                <div class="text">Logout</div>
            </button></Link>
        </div>
        <div className="left-panel">
                <div className="AdminAvatar">
                    <Link to=""><img src="../assets/admin.png" className="adminavatar" alt="Avatar" /></Link>
                    <p className="adminname">Manager, Long Châu</p>
                    <div className="admininfo">
                        Tên: Long Châu

                        SĐT: 0784871238

                        Role: Manager
                    </div>
                </div>
                <div className="AdminTable">
                    <ul className="AdminTableList">
                        <li><Link to="/">Manage Product</Link></li>
                        <li><Link to="/">Manage PHIẾU CHỨNG NHẬN</Link></li>
                        <li><Link to="/">Manage PHIẾU BẢO HÀNH</Link></li>
                        <li><Link to="/">Manage PHIẾU GIẢM GIÁ</Link></li>
                        <li><Link to="/">My Profile</Link></li>
                    </ul>
                </div>
            </div>
            <div className="right-panel">
        <div className="qlsp">
        <Container className="mt-5">
            <Row>
                <Col>
                    <h1>Quản lý Sản phẩm</h1>
                    <Form>
                        <Form.Group as={Row} controlId="productName">
                            <Col sm={8}>
                                <Form.Control
                                    type="text"
                                    placeholder="Tên sản phẩm"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                />
                            </Col>
                            <Col sm={4}>
                                <Button onClick={addProduct} variant="primary" type="button">
                                    Thêm sản phẩm
                                </Button>
                            </Col>
                        </Form.Group>
                    </Form>
                    <ListGroup className="mt-3">
    {products.map(product => (
        <ListGroup.Item key={product.id} className="d-flex justify-content-between align-items-center">
            {product.name}
            <div>
                <Button
                    className="ml-2"
                    variant="info"
                    size="sm"
                    onClick={() => openEditModal(product)}
                >
                    Sửa
                </Button>
                <Button
                    className="ml-2"
                    variant="danger"
                    size="sm"
                    onClick={() => deleteProduct(product.id)}
                >
                    Xóa
                </Button>
            </div>
        </ListGroup.Item>
    ))}
</ListGroup>

                </Col>
            </Row>

            {/* Modal chỉnh sửa sản phẩm */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Chỉnh sửa sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="editProductName">
                        <Form.Label>Tên sản phẩm</Form.Label>
                        <Form.Control
                            type="text"
                            value={modalProduct.name}
                            onChange={(e) => setModalProduct({ ...modalProduct, name: e.target.value })}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={saveEditProduct}>
                        Lưu thay đổi
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
        </div>

        </div>
        </div>
    );
}

export default ManageProduct;
