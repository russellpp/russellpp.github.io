import React from "react";
import { useState } from "react";

function WithdrawModal({
  setIsOpen,
  currentUser,
  setCurrentUser,
  accounts,
  setAccounts,
}) {
  //close Modal function
  function CloseModal() {
    setIsOpen(false);
  }

  //setting useState for data capture
  let [withdrawValue, setValue] = useState();

  let balance = currentUser.balance;

  function getValue(withdraw) {
    setValue(withdraw.target.value);
    withdrawValue = withdraw.target.value;
    console.log(withdrawValue);
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
  const currentTime =
    /* thisTime.getFullYear() */ thisTime.getDate() +
    "-" +
    month[thisTime.getMonth()];

  function WithdrawMoney() {
    const result = Number(balance) - Number(withdrawValue);

    if (result < 0) {
      alert("Insufficient funds!");
    } else if (!withdrawValue) {
      alert("Enter a valid amount");
    } else if (withdrawValue < 0) {
      alert("Withdraw value should be greater than 0");
    } else {
      currentUser.transactions.unshift({
        type: "Withdraw",
        date: currentTime,
        amount: `-${withdrawValue}`,
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

      CloseModal();
    }
  }

  return (
    <div className="withdrawModal">
      <div className="withdrawModalContent">
        <div className="withdrawModalHeader">
          <h4 className="withdrawModalTitle">Withdraw</h4>
        </div>
        <div className="withdrawModalBody">
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
        <div className="withdrawModalFooter">
          <button className="withdrawDepositButton" onClick={WithdrawMoney}>
            Withdraw
          </button>
          <button className="withdrawCancelButton" onClick={CloseModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default WithdrawModal;
