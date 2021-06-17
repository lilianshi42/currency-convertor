import React from "react";
import NavBar from "./NavBar";
import { Button } from "antd";
import { Layout } from "antd";

const { Header, Content, Footer } = Layout;

function About(props) {
  return (
    <div>
      <Layout className="layout">
        <Header>
          <NavBar />
        </Header>
        <Content style={{ padding: "30px 30px" }}>
          <div className="site-layout-content">
            <p>
              This is a web based app that helps users to know the exchange rate
              of some foreign currencies to Canadian dollar.
            </p>
            <p>Let's go back to try it!</p>
            <Button
              onClick={() => props.history.push("/convertor")}
              type="primary"
              shape="round"
              size="large"
            >
              Go Back
            </Button>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Lilian Design @2021 Currency Convertor
        </Footer>
      </Layout>
    </div>
  );
}

export default About;
