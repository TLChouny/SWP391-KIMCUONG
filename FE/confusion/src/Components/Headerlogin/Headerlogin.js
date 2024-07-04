import React, { useEffect, useState } from 'react';
import { Menu, Dropdown, Input, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import axios from 'axios';

const { Search } = Input;

const Headerlogin = () => {
  const [cart, setCart] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cart'));
    if (cartData) {
      setCart(cartData);
    }
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    // Clear the cart on logout
    localStorage.removeItem('cart');
    setCart([]);
  };

  // Function to handle search
  const onSearch = async (value) => {
    if (value.trim() === "") {
      setDropdownVisible(false);
      setSearchResults([]);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/api/products?search=${value}`);
      const filteredResults = response.data.filter(product => product.ProductName.toLowerCase().includes(value.toLowerCase()));
      setSearchResults(filteredResults);
      setDropdownVisible(true);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  // Function to handle clicking on a search result
  const handleSearchResultClick = (product) => {
    setDropdownVisible(false);
    navigate(`/albumlogin/${product.ProductCategory.toLowerCase()}`);
  };

  // Create dropdown menu items from search results
  const menu = (
    <Menu>
      <Menu.Item key="1"><Link to="/Profile">Profile</Link></Menu.Item>
      <Menu.Item key="2"><Link to="">Orders-history</Link></Menu.Item>
      <Menu.Item key="3"><Link to="/" onClick={handleLogout}>Logout</Link></Menu.Item>
    </Menu>
  );

  const searchMenu = (
    <Menu>
      {searchResults.map((product) => (
        <Menu.Item key={product.ProductId} onClick={() => handleSearchResultClick(product)}>
          {product.ProductName}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div className='header-page'>
      <div>
        <Space direction="vertical">
          <Dropdown overlay={searchMenu} visible={dropdownVisible} onVisibleChange={(visible) => setDropdownVisible(visible)}>
            <Search
              placeholder="Search..."
              onSearch={onSearch}
              style={{
                width: 200,
                marginLeft: "60%"
              }}
            />
          </Dropdown>
        </Space>
      </div>

      <div className='background-image-header'>
        <Link to="/homepagelogin"><img src="../assets/logo.jpg" alt='logo' className='headerlogo' /></Link>
        <p>Klare</p>
      </div>

      <div className='header-account'>
        <Dropdown overlay={menu} placement="bottomCenter">
          <AccountCircleIcon style={{ fontSize: 34, cursor: 'pointer' }} />
        </Dropdown>
        <Link to="/cart"><AddShoppingCartIcon style={{ fontSize: 34, marginLeft: 20, cursor: 'pointer' }} /></Link>
      </div>
    </div>
  );
};

export default Headerlogin;
