import React from "react";

function CurrencyRow(props) {
  const { list, amount, amountChange, currencyChange } = props;
  return (
    <>
      <input
        value={amount}
        className=" text-2xl mx-8 "
        type="number"
        onChange={amountChange}
        placeholder="enter value"
      ></input>
      <select
        onChange={currencyChange}
        className="  bg-emerald-200 text-black px-4 py-2 rounded mr-10"
      >
        {list.map((d) => {
          return (
            <option key={d} value={d}>
              {" "}
              {d}{" "}
            </option>
          );
        })}
      </select>
    </>
  );
}

export default CurrencyRow;
