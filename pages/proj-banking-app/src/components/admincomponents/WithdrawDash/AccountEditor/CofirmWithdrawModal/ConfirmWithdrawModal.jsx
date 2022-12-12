import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./ConfirmWithdrawModal.css";

const timeNow = () => {
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
  return currentTime;
};

function ConfirmWithdrawModal({
  accounts,
  setAccounts,
  selectedWithdrawAccount,
  formRef,
  isConfirmWithdrawOpen,
  setIsConfirmWithdrawOpen,
  withdrawValue,
  setSelectedWithdrawAccount,
}) {
  const [errorWithdraw, setWithdrawError] = useState({
    negative: false,
    noInput: false,
    noAccount: false,
  });

  useEffect(() => {
    const newBalance =
      Number(selectedWithdrawAccount.balance) - Number(withdrawValue);
    if (newBalance < 0) {
      setWithdrawError((prevState) => {
        return {
          ...prevState,
          negative: true,
        };
      });
    } else if (
      withdrawValue <= 0 ||
      withdrawValue == "" ||
      withdrawValue === undefined
    ) {
      setWithdrawError((prevState) => {
        return {
          ...prevState,
          noInput: true,
        };
      });
    } else {
      setWithdrawError({
        negative: false,
        noInput: false,
        noAccount: false,
      });
    }

    formRef.current.reset();
  }, [withdrawValue]);

  const handleWithdraw = () => {
    const newBalance =
      Number(selectedWithdrawAccount.balance) - Number(withdrawValue);
    const transactionDetails = {
      type: "Withdraw",
      date: timeNow(),
      amount: `-${withdrawValue}`,
      balance: `${newBalance}`,
      id: Date.now(),
    };

    const updatedAccounts = accounts.map((account) => {
      if (selectedWithdrawAccount.email === account.email) {
        const newTransactions = account.transactions;
        newTransactions.unshift(transactionDetails);
        const updatedDetails = {
          ...account,
          balance: newBalance,
          transactions: newTransactions,
        };

        return updatedDetails;
      } else {
        return account;
      }
    });
    setAccounts(updatedAccounts);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setIsConfirmWithdrawOpen(false);
    formRef.current.reset();
  };

  const handleError = () => {
    const newBalance =
      Number(selectedWithdrawAccount.balance) - Number(withdrawValue);
    const confirmWithdrawModal = (
      <div className="ModalBody">
        <span>Confirm Withdraw Details</span>
        <span>{`Account Name: ${selectedWithdrawAccount.name}`}</span>
        <span>{`Account Number: ${selectedWithdrawAccount.accountNumber}`}</span>
        <span>{`Withdraw Amount: ${withdrawValue}`}</span>
        <span>{`Balance: ${selectedWithdrawAccount.balance} to ${newBalance}`}</span>

        <button className="ConfirmButton" onClick={handleWithdraw}>
          Confirm Withdraw
        </button>
        <button className="CancelButton" onClick={handleCloseModal}>
          Cancel
        </button>
      </div>
    );

    const errorModal = (
      <div className="ModalBody">
        <span>Insufficient funds! Please adjust amount. </span>
        <button className="CancelButton" onClick={handleCloseModal}>
          Close
        </button>
      </div>
    );

    const errorInvalid = (
      <div className="ModalBody">
        <span>Invalid input! Please input proper value.</span>
        <button className="CancelButton" onClick={handleCloseModal}>
          Close
        </button>
      </div>
    );
    const errorNoAccount = (
      <div className="ModalBody">
        <span>No account selected! Please select account.</span>
        <button className="CancelButton" onClick={handleCloseModal}>
          Close
        </button>
      </div>
    );

    if (errorWithdraw.negative) {
      return errorModal;
    } else if (errorWithdraw.noInput) {
      return errorInvalid;
    } else if (errorWithdraw.noAccount) {
      return errorNoAccount;
    } else {
      return confirmWithdrawModal;
    }
  };

  return (
    <div className="Modal">
      <div className="Container">{handleError()}</div>
    </div>
  );
}

export default ConfirmWithdrawModal;
