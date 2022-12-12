import React from "react";
import { useState } from "react";
/* import {useEffect} from 'react'
 */
function DepositModal({
  setIsDepositOpen,
  currentUser,
  setCurrentUser,
  accounts,
  setAccounts,
}) {
  //close Modal function
  function CloseDepositModal() {
    setIsDepositOpen(false);
  }

  //setting useState for data capture
  let [depositValue, setValue] = useState();

  function getValue(deposit) {
    setValue(deposit.target.value);
    depositValue = deposit.target.value;
  }

  const thisTime = new Date();
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentTime = thisTime.getDate() + "-" + month[thisTime.getMonth()];

  function DepositMoney() {
    let balance = currentUser.balance;

    const result = Number(balance) + Number(depositValue);

    if (!depositValue) {
      alert("Enter a valid amount");
    } else if (depositValue < 0) {
      alert("Deposit value should be greater than 0");
    } else {
      currentUser.transactions.unshift({
        type: "Deposit",
        date: currentTime,
        amount: `${depositValue}`,
        balance: result,
        id: Date.now(),
      });

      const updatedAccount = {
        ...currentUser,
        balance: result,
        transactions: currentUser.transactions,
      };
      
      const updatedAccounts = accounts.map((account) => {
        if (account.email === currentUser.email) {
          return updatedAccount;
        } else {
          return account;
        }
      });
      setAccounts(updatedAccounts);
      CloseDepositModal();
    }
  }

  return (
    <div className="depositModal">
      <div className="depositModalContent">
        <div className="depositModalHeader">
          <h4 className="depositModalTitle">Deposit</h4>
        </div>
        <div className="depositModalBody">
          <div className="currentBalance">
            Current Balance: {currentUser.balance}
          </div>
          <label htmlFor="amount">Enter amount: </label>
          <input
            type="number"
            name="amount"
            id="amount"
            autoComplete="off"
            autoFocus
            onChange={getValue}
          />
        </div>
        <div className="depositModalFooter">
          <button className="depositDepositButton" onClick={DepositMoney}>
            Deposit
          </button>
          <button className="depositCancelButton" onClick={CloseDepositModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DepositModal;
