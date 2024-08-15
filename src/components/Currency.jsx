import React from "react";
import "../css/currency.css";
import "../images/bg.png";
import { FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const BASE_URL = "xxx";
const API_KEY = "xxx";

function Currency() {
  const [amount, setAmount] = useState(0);
  const [result, setResult] = useState(0);
  const [fromChange, setFromChange] = useState("USD");
  const [toChange, setToChange] = useState("TRY");
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}`);
        const currencyKeys = Object.keys(response.data.data);
        setCurrencies(currencyKeys);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCurrencies();
  }, []);

  const exchange = async () => {
    const response = await axios.get(
      `${BASE_URL}?apikey=${API_KEY}&base_currency=${fromChange}`
    );

    const responseResult = (response.data.data[toChange] * amount).toFixed(2);
    setResult(responseResult);
  };

  return (
    <div className="currency-bg">
      <div className="currency-div">
        <div className="head">
          <h4>Döviz Hesaplama</h4>
        </div>
        <div className="input-div">
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            className="amount"
          />
          <select
            onChange={(e) => setFromChange(e.target.value)}
            name="fromChange"
            id="fromChange"
            value={fromChange}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
          <FaArrowRight className="right-arrow" />
          <input
            value={result}
            onChange={(e) => setResult(e.target.value)}
            type="number"
            className="result"
          />
          <select
            onChange={(e) => setToChange(e.target.value)}
            name="toChange"
            id="toChange"
            value={toChange}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        <button onClick={exchange} className="exchange-button">
          Çevir
        </button>
      </div>
    </div>
  );
}

export default Currency;
