import React from 'react';
import { Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './Menuheader.css';

const items = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Album',
    path: '/catalog',
    children: [
      {
        type: 'group',
        children: [
          {
            label: 'Bracelets',
            path: '/album/Bracelet',
          },
          {
            label: 'Earrings',
            path: '/album/Earring',
          },
          {
            label: 'Necklaces',
            path: '/album/Necklace',
          },
          {
            label: 'Rings',
            path: '/album/Ring',
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
    path: '/contact',
  },
];

const Menuheader = () => {
  const navigate = useNavigate();

  const handleSubMenuClick = (e, path) => {
    e.preventDefault();
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

export default Menuheader;
