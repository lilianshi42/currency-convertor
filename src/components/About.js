import React from "react";
import { Button } from "antd";

function About(props) {
    return (
        <div>
            <p>This is a web based app that helps users to know the exchange rate of some foreign currencies to Canadian dollar.</p>
            <p>Let's go back to try it!</p>
            <Button onClick={()=>props.history.push("/convertor")} type="primary" shape="round" size="large">Go Back</Button>
        </div>
    )
}

export default About;