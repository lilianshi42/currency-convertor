import React from "react";
import { Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

function MainPage(props) {
    return (
        <div className="MainPage">
            <h1>Currency Convertor</h1>
            <p>Let's convert!</p>
            <Button className="MainButton" onClick={() => props.history.push("/convertor")} type="primary" shape="round" size="large">
                Get Started <ArrowRightOutlined />
            </Button>
        </div>
    );
}

export default MainPage;
