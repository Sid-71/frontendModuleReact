import React, { useEffect, useState } from "react";
import CurrencyRow from "./CurrencyRow";
import Navbar from "../navbar/navbar";
import data from "./json";
import { useResolvedPath } from "react-router-dom";
import { StorefrontSharp } from "@mui/icons-material";

function CurrencyHome() {
  const [list, setList] = useState([]);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("USD");
  const [isFrom, setIsFrom] = useState(true);
  const [fromAmount, setFromAmount] = useState();
  const [toAmount, setToAmount] = useState(0);

  function fromSubmit(e) {
    setFromAmount(e.target.value);
    setIsFrom(true);
  }

  function toSubmit(e) {
    setToAmount(e.target.value);
    setIsFrom(false);
  }

  function calculate() {
   if(from === to) {
      (isFrom)?setToAmount(fromAmount):setFromAmount(toAmount);
      return;
   }
    let rate = data[from][to];
 
    if (!rate) {
      rate = 1 / data[to][from];
    }
    console.log("rate from to", rate);
    if (isFrom) {
      setToAmount(rate * fromAmount);
    } else {
      setFromAmount(toAmount / rate);
    }
  }

  useEffect(() => {
    setIsFrom(false);
    calculate();
  }, [from]);
  useEffect(() => {
    setIsFrom(true);
    calculate();
  }, [to]);

  useEffect(() => {
    const curList = ["USD", "INR", "GBP", "EUR"];
    setList(curList);

    calculate();
  }, [fromAmount, toAmount]);

  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
        className=" bg-slate-200 "
      >
        <div className=" p-7 mr-10 mb-10">
          <CurrencyRow
            list={list}
            amount={fromAmount}
            amountChange={fromSubmit}
            currencyChange={(e) => {
              setFrom(e.target.value);
            }}
          />
          <div
            style={{
              marginLeft: "100px",
            }}
          >
            {" "}
          </div>
          <CurrencyRow
            list={list}
            amount={toAmount}
            amountChange={toSubmit}
            currencyChange={(e) => {
              setTo(e.target.value);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default CurrencyHome;
