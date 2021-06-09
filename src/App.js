import "./style.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import About from "./components/About";
import MainPage from "./components/MainPage";
import Convertor from "./components/Convertor";
import { Layout, Menu } from "antd";
import "antd/dist/antd.css";

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Router>
      <Layout className="layout">
        <Header>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]} >
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
        </Header>
        <Content style={{  padding: "0 10%" }}>
          <div className="site-layout-content">
            <Switch>
              <Route exact path="/" component={MainPage} />
              <Route path="/about" component={About} />
              <Route path="/convertor" component={Convertor} />
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Lilian Design @2021 Currency Convertor
        </Footer>
      </Layout>
    </Router>
  );
}

export default App;
