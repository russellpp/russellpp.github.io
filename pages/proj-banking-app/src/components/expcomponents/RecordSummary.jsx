import React from "react";
import { useState } from "react";
import { useEffect } from "react";

function RecordSummary({
  recordList,
  setRecordList,
  accounts,
  setAccounts,
  currentUser,
  setCurrentUser,
  currentWallet,
  dataOptions,
  setDataOptions,
  walletBalance,
  setWalletBalance,
}) {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [budget, setBudget] = useState(0);

  useEffect(() => {
    const valeuArr = [];
    recordList.map((item) => {
      if (Number(item.value) > 0) {
        valeuArr.push(Number(item.value));
      }
    });

    const sum = valeuArr.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
    setIncome(sum);
  }, [accounts, recordList]);

  useEffect(() => {
    const valeuArr = [];
    recordList.map((item) => {
      if (Number(item.value) <= 0) {
        valeuArr.push(Number(item.value));
      }
    });

    const sum = valeuArr.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
    setExpense(sum);
  }, [accounts, recordList]);

  useEffect(() => {
    setBudget(currentWallet.budget);
  }, [accounts, recordList]);

  const total = () => {
    if (isNaN(walletBalance) || !walletBalance) {
      return 0;
    } else {
      return walletBalance;
    }
  };

  const handleClick = () => {
    console.log(walletBalance);
  };

  return (
    <div className="RecordSummary">
      <span>budget</span>
      <span className="TotalExpenses">{budget}</span>
      <span>total expenses</span>
      <span className="TotalExpenses">{expense}</span>
      <span onClick={handleClick}>total income</span>
      <span className="TotalIncome">{income}</span>
      <span
        className={Number(walletBalance) <= 0 ? "NetValueNeg" : "NetValuePos"}
      >
        {total()}
      </span>
    </div>
  );
}

export default RecordSummary;
