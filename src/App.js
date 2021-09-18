import "./style.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./components/About";
import MainPage from "./components/MainPage";
import Convertor from "./components/Convertor";
import "antd/dist/antd.css";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={MainPage} />
                <Route path="/about" component={About} />
                <Route path="/convertor" component={Convertor} />
            </Switch>
        </Router>
    );
}

export default App;
