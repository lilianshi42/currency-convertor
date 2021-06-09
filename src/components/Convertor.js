import React, { useState, useEffect } from "react";
import { Select, message } from "antd";
import { DatePicker, InputNumber } from "antd";
import { Row, Col } from "antd";
import moment from "moment";
import "antd/dist/antd.css";

const { Option } = Select;

function Convertor() {
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [currency, setCurrency] = useState("USD");
  const [exRate, setExRate] = useState("");
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
  const fetchRate = async () => {
    try {
      const res = await fetch(
        `https://www.bankofcanada.ca/valet/observations/FXCAD${currency}?start_date=${date}&end_date=${date}`
      );
      const data = await res.json();
      if (data.observations.length > 0) {
        setExRate(data.observations[0][`FXCAD${currency}`].v);
        setLabel(data.seriesDetail[`FXCAD${currency}`].label);
      } else {
        message.info("No data");
        setExRate("");
      }
    } catch (error) {
      message.info("Select a valid date");
    }
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
  }, [currency, date]);

  return (
    <div id="convertor">
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
              defaultValue={moment()}
              onChange={(date) => setDate(moment(date).format("YYYY-MM-DD"))}
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
            <Select size="large" style={{ width: "60%" }} defaultValue="CAD">
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
  );
}

export default Convertor;
