import React from 'react';
import { Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './Menuheaderlogin.css';

const items = [
  {
    label: 'Home',
    path: '/homepagelogin',
  },
  {
    label: 'Album',
    path: '/catalogin',
    children: [
      {
        type: 'group',
        children: [
          {
            label: 'Bracelet',
            path: '/albumlogin/Bracelet',
          },
          {
            label: 'Earring',
            path: '/albumlogin/Earring',
          },
          {
            label: 'Necklace',
            path: '/albumlogin/Necklace',
          },
          {
            label: 'Ring',
            path: '/albumlogin/Ring',
          },
        ],
      },
    ],
  },
  {
    label: 'About us',
    path: '/about',
  },
  {
    label: 'News',
    path: '/news',
  },
  {
    label: 'Contact',
    path: '/contactlogin',
  },
];

const Menuheaderlogin = () => {
  const navigate = useNavigate();

  const handleSubMenuClick = (e, path) => {
    // Prevent the submenu from closing
    e.preventDefault();
    // Navigate to the desired path
    navigate(path);
  };

  return (
    <div className="menu-container">
      <Menu mode="horizontal">
        {items.map(item => {
          if (item.children) {
            return (
              <Menu.SubMenu
                key={item.path}
                title={
                  <span
                    onClick={(e) => handleSubMenuClick(e, item.path)}
                    className="submenu-title-link"
                  >
                    {item.label}
                  </span>
                }
              >
                {item.children[0].children.map(subItem => (
                  <Menu.Item key={subItem.path}>
                    <Link to={subItem.path}>{subItem.label}</Link>
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            );
          } else {
            return (
              <Menu.Item key={item.path}>
                <Link to={item.path}>{item.label}</Link>
              </Menu.Item>
            );
          }
        })}
      </Menu>
    </div>
  );
};

export default Menuheaderlogin;
