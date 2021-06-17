import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";

function NavBar() {
  return (
    <div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys="">
        <Menu.Item key="1">
          <Link to="/">Main Page</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/convertor">Convertor</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/about">About The App</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default NavBar;
