import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import './Menuheader.css';

const items = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Album',
    path: '/album',
    children: [
      {
        type: 'group',
        children: [
          {
            label: 'Vòng tay',
            path: '/album/vong-tay',
          },
          {
            label: 'Bông tai',
            path: '/album/bong-tai',
          },  
          {
            label: 'Dây chuyền',
            path: '/album/day-chuyen',
          },
          {
            label: 'Nhẫn',
            path: '/album/nhan',
          },
        ],
      },
    ],
  },
  {
    label: 'Review',
    path: '/review',
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
  return (
    <div className="menu-container">
      <Menu mode="horizontal">
        {items.map(item => {
          if (item.children) {
            return (
              <Menu.SubMenu key={item.path} title={item.label}>
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
