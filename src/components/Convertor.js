import React, { useState, useEffect } from "react";
import moment from "moment";
import { connect } from "react-redux";
import NavBar from "./NavBar";
import { getExchangeRate } from "../actions/actions";
import { DatePicker, InputNumber, Select, message, Spin } from "antd";
import { Layout, Row, Col } from "antd";
import "antd/dist/antd.css";

const { Header, Content, Footer } = Layout;
const { Option } = Select;

function Convertor(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [currency, setCurrency] = useState("USD");
  const [exRate, setExRate] = useState(
    props.rateData.rate ? props.rateData.rate : ""
  );
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  var toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    if (exRate) {
      toAmount = amount / exRate;
    } else {
      toAmount = 0;
    }
  } else {
    toAmount = amount;
    fromAmount = amount * exRate;
  }

  //fetch the exchange rate for given currency and date
  const fetchRate = () => {
    setIsLoading(true);
    // const res = await fetch(
    //   `https://www.bankofcanada.ca/valet/observations/FXCAD${currency}?start_date=${date}&end_date=${date}`
    // );
    // const data = await res.json();
    // if (data.observations.length > 0) {
    //   setExRate(data.observations[0][`FXCAD${currency}`].v);
    //   setLabel(data.seriesDetail[`FXCAD${currency}`].label);
    // } else {
    //   message.warning("No data!");
    //   setExRate("");
    // }
    setLabel(`${currency} / CAD`);
    props.getExchangeRate(date, currency);
    setIsLoading(false);
  };

  //handle change for amount change in 2 ways
  const handleToAmountChange = (value) => {
    setAmount(value);
    setAmountInFromCurrency(false);
  };

  const handleFromAmountChange = (value) => {
    setAmount(value);
    setAmountInFromCurrency(true);
  };

  useEffect(() => {
    fetchRate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency, date]);

  // IMPORTANT: 
  // This is equal method as componentWillReceiveProps, it updates the current rate value each time after the new rate is fetched
  useEffect(() => {
    if (props.rateData.error) {
      message.warning("No data!");
      setExRate("");
    } else {
      setExRate(props.rateData.rate);
    }
  }, [props.rateData]);

  return (
    <div id="convertor">
      <Layout className="layout">
        <Header>
          <NavBar />
        </Header>
        <Content style={{ padding: "30px 30px" }}>
          <div className="site-layout-content">
            {isLoading && <Spin size="large" tip="Loading..." />}
            <Row align="middle">
              <h2>Currency Convertor</h2>
            </Row>
            <Row align="middle">
              <Col span={12}>
                <div>
                  <label>Date</label>
                  <br />
                  <DatePicker
                    size="large"
                    style={{ width: "80%" }}
                    allowClear={false}
                    defaultValue={moment()}
                    onChange={(date) =>
                      setDate(moment(date).format("YYYY-MM-DD"))
                    }
                  />
                </div>
              </Col>
            </Row>
            <Row align="middle">
              <Col span={12}>
                <div>
                  <label>Amount of Foreign Currencies</label> <br />
                  <InputNumber
                    size="large"
                    style={{ width: "80%" }}
                    value={fromAmount}
                    onChange={(value) => handleFromAmountChange(value)}
                  />
                </div>
              </Col>
              <Col span={12}>
                <div>
                  <label>Currencies</label>
                  <br />
                  <Select
                    size="large"
                    style={{ width: "60%" }}
                    defaultValue="USD"
                    onChange={(value) => {
                      setCurrency(value);
                    }}
                  >
                    <Option value="USD">USD</Option>
                    <Option value="EUR">EUR</Option>
                    <Option value="GBP">GBP</Option>
                    <Option value="CNY">CNY</Option>
                    <Option value="HKD">HKD</Option>
                  </Select>
                </div>
              </Col>
            </Row>
            <Row align="middle">
              <Col span={12}>
                <div>
                  <label>Amount of Canadian Dollars</label>
                  <br />
                  <InputNumber
                    size="large"
                    style={{ width: "80%" }}
                    value={toAmount}
                    onChange={(value) => handleToAmountChange(value)}
                  />
                </div>
              </Col>
              <Col span={12}>
                <div>
                  <label>Canadian Dollar</label>
                  <br />
                  <Select
                    size="large"
                    style={{ width: "60%" }}
                    defaultValue="CAD"
                  >
                    <Option value="CAD">CAD</Option>
                  </Select>
                </div>
              </Col>
            </Row>
            <Row align="middle">
              <div>
                <p>
                  Today's {label} exchange rate is: {exRate}
                </p>
              </div>
            </Row>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Lilian Design @2021 Currency Convertor
        </Footer>
      </Layout>
    </div>
  );
}

// Not very clear what to do here, I know map the store state to the props this component receiving, but how?
const mapStateToProps = (state) => {
  return {
    rateData: state.loadReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getExchangeRate: (date, currency) => {
      dispatch(getExchangeRate(date, currency));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Convertor);
