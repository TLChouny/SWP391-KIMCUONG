import { HashLink as Link } from 'react-router-hash-link';
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Table, Modal } from 'react-bootstrap';
import "./ManageProduct.css";
import SampleProducts from "../Sample/SampleProducts";

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
        setProducts(SampleProducts);  // Initialize with sample products
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
        const updatedProducts = products.map(product =>
            product.id === modalProduct.id ? modalProduct : product
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
                    <Link to=""><img src="../assets/admin.png" className="adminavatar" alt="Avatar" /></Link>
                    <p className="adminname">Manager, Long Châu</p>
                    <div className="admininfo">
                        Tên: Long Châu<br />
                        SĐT: 0784871238<br />
                        Role: Manager
                    </div>
                </div>
                <div className="AdminTable">
                    <ul className="AdminTableList">
                        <li><Link smooth to="#mtt-5">Manage Product</Link></li>
                        <li><Link smooth to="/">Manage PHIẾU CHỨNG NHẬN</Link></li>
                        <li><Link smooth to="/">Manage PHIẾU BẢO HÀNH</Link></li>
                        <li><Link smooth to="/">Manage PHIẾU GIẢM GIÁ</Link></li>
                        <li><Link smooth to="/">My Profile</Link></li>
                    </ul>
                </div>
            </div>
            <div className="right-panel">
                <div>
                    <button className="but" onClick={() => setShowProductForm(true)}>
                        Create product
                    </button>
                    <Modal show={showProductForm} onHide={() => setShowProductForm(false)} className="modal-container">
                        <Modal.Header closeButton>
                            <Modal.Title>Quản lý Sản phẩm</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Container id='mtt-5'>
                                <Row>
                                    <Col>
                                        <Form>
                                            <Form.Group as={Row} controlId="productForm">
                                                <Col sm={12} className="mb-3">
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="ID"
                                                        value={productID}
                                                        onChange={(e) => setProductID(e.target.value)}
                                                    />
                                                </Col>
                                                <Col sm={12} className="mb-3">
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Tên sản phẩm"
                                                        value={productName}
                                                        onChange={(e) => setProductName(e.target.value)}
                                                    />
                                                </Col>
                                                <Col sm={12} className="mb-3">
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Hình ảnh"
                                                        value={productImage}
                                                        onChange={(e) => setProductImage(e.target.value)}
                                                    />
                                                </Col>
                                                <Col sm={12} className="mb-3">
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Viên chính"
                                                        value={mainIngredient}
                                                        onChange={(e) => setMainIngredient(e.target.value)}
                                                    />
                                                </Col>
                                                <Col sm={12} className="mb-3">
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Viên phụ"
                                                        value={secondaryIngredient}
                                                        onChange={(e) => setSecondaryIngredient(e.target.value)}
                                                    />
                                                </Col>
                                                <Col sm={12} className="mb-3">
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Vỏ"
                                                        value={cover}
                                                        onChange={(e) => setCover(e.target.value)}
                                                    />
                                                </Col>
                                                <Col sm={12} className="mb-3">
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Loại"
                                                        value={productType}
                                                        onChange={(e) => setProductType(e.target.value)}
                                                    />
                                                </Col>
                                                <Col sm={12} className="mb-3">
                                                    <Form.Control
                                                        type="number"
                                                        placeholder="Giá"
                                                        value={productPrice}
                                                        onChange={(e) => setProductPrice(e.target.value)}
                                                    />
                                                </Col>
                                                <Col sm={12} className="mb-3">
                                                    <Form.Control
                                                        type="number"
                                                        placeholder="Số lượng"
                                                        value={productQuantity}
                                                        onChange={(e) => setProductQuantity(e.target.value)}
                                                    />
                                                </Col>
                                                <Col sm={12} className="mb-3">
                                                    <Button onClick={addProduct} variant="primary" type="button">
                                                        Thêm sản phẩm
                                                    </Button>
                                                </Col>
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                </Row>
                            </Container>
                            <Button onClick={() =>
                                setShowProductForm
                                    (
                                        false
                                    )} variant=
                                "secondary"
                            >Đóng</Button>
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
                                            <Button variant="warning" onClick={() => openEditModal(product)}>Edit</Button>
                                            <Button variant="danger" onClick={() => deleteProduct(product.id)}>Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                    <Container id='mtt-5' className="mt-5">
                        <Row>
                            <Col>
                                <div className="hqlsp">Quản lý Sản phẩm</div>
                                <Form>
                                    <Form.Group as={Row} controlId="productForm">
                                        <Col sm={2}>
                                            <Form.Control
                                                type="text"
                                                placeholder="ID"
                                                value={productID}
                                                onChange={(e) => setProductID(e.target.value)}
                                            />
                                        </Col>
                                        <Col sm={2}>
                                            <Form.Control
                                                type="text"
                                                placeholder="Tên sản phẩm"
                                                value={productName}
                                                onChange={(e) => setProductName(e.target.value)}
                                            />
                                        </Col>
                                        <Col sm={2}>
                                            <Form.Control
                                                type="text"
                                                placeholder="Hình ảnh"
                                                value={productImage}
                                                onChange={(e) => setProductImage(e.target.value)}
                                            />
                                        </Col>
                                        <Col sm={2}>
                                            <Form.Control
                                                type="text"
                                                placeholder="Viên chính"
                                                value={mainIngredient}
                                                onChange={(e) => setMainIngredient(e.target.value)}
                                            />
                                        </Col>
                                        <Col sm={2}>
                                            <Form.Control
                                                type="text"
                                                placeholder="Viên phụ"
                                                value={secondaryIngredient}
                                                onChange={(e) => setSecondaryIngredient(e.target.value)}
                                            />
                                        </Col>
                                        <Col sm={2}>
                                            <Form.Control
                                                type="text"
                                                placeholder="Vỏ"
                                                value={cover}
                                                onChange={(e) => setCover(e.target.value)}
                                            />
                                        </Col>
                                        <Col sm={2}>
                                            <Form.Control
                                                type="text"
                                                placeholder="Loại"
                                                value={productType}
                                                onChange={(e) => setProductType(e.target.value)}
                                            />
                                        </Col>
                                        <Col sm={2}>
                                            <Form.Control
                                                type="number"
                                                placeholder="Giá"
                                                value={productPrice}
                                                onChange={(e) => setProductPrice(e.target.value)}
                                            />
                                        </Col>
                                        <Col sm={2}>
                                            <Form.Control
                                                type="number"
                                                placeholder="Số lượng"
                                                value={productQuantity}
                                                onChange={(e) => setProductQuantity(e.target.value)}
                                            />
                                        </Col>
                                        <Col sm={2}>
                                            <Button onClick={addProduct} variant="primary" type="button">
                                                Thêm sản phẩm
                                            </Button>
                                        </Col>
                                    </Form.Group>
                                </Form>
                                   </Col>
                                </Row>
                            </Container>
                    <Modal show={showModal} onHide={handleCloseModal} className='modal-container'>
                        <Modal.Header closeButton>
                            <Modal.Title>Chỉnh sửa sản phẩm</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group>
                                    <Form.Label>ID</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="ID"
                                        name="id"
                                        value={modalProduct?.id || ''}
                                        readOnly
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Tên sản phẩm</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Tên sản phẩm"
                                        name="name"
                                        value={modalProduct?.name || ''}
                                        onChange={handleEditChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Hình ảnh</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Hình ảnh"
                                        name="image"
                                        value={modalProduct?.image || ''}
                                        onChange={handleEditChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Viên chính</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Viên chính"
                                        name="mainIngredient"
                                        value={modalProduct?.mainIngredient || ''}
                                        onChange={handleEditChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Viên phụ</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Viên phụ"
                                        name="secondaryIngredient"
                                        value={modalProduct?.secondaryIngredient || ''}
                                        onChange={handleEditChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Vỏ</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Vỏ"
                                        name="cover"
                                        value={modalProduct?.cover || ''}
                                        onChange={handleEditChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Loại</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Loại"
                                        name="type"
                                        value={modalProduct?.type || ''}
                                        onChange={handleEditChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Giá</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Giá"
                                        name="price"
                                        value={modalProduct?.price || ''}
                                        onChange={handleEditChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Số lượng</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Số lượng"
                                        name="quantity"
                                        value={modalProduct?.quantity || ''}
                                        onChange={handleEditChange}
                                    />
                                </Form.Group>
                            </Form>
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
                </div>
            </div>
        </div>
    );
}

export default ManageProduct;
