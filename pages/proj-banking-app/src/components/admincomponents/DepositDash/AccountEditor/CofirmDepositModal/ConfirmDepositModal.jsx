import React, { useEffect, useState } from "react";
import "./ConfirmDepositModal.css";

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

function ConfirmDepositModal({
  accounts,
  setAccounts,
  selectedDepositAccount,
  formRef,
  isConfirmDepositOpen,
  setIsConfirmDepositOpen,
  depositValue,
  setSelectedDepositAccount,
}) {
  const [errorDeposit, setDepositError] = useState({
    negative: false,
    noInput: false,
    noAccount: false,
  });

  useEffect(() => {
    const newBalance =
      Number(selectedDepositAccount.balance) - Number(depositValue);
   if (
      depositValue <= 0 ||
      depositValue == "" ||
      depositValue === undefined
    ) {
      setDepositError((prevState) => {
        return {
          ...prevState,
          noInput: true,
        };
      });
    } else {
      setDepositError({
        negative: false,
        noInput: false,
        noAccount: false,
      });
    }

    formRef.current.reset();
  }, [depositValue]);

  const handleError = () => {
    const successModal = (
      <div className="ModalBody">
        <span>Confirm Deposit Details</span>
        <span>{`Account Name: ${selectedDepositAccount.name}`}</span>
        <span>{`Account Number: ${selectedDepositAccount.accountNumber}`}</span>
        <span>{`Deposit Amount: ${depositValue}`}</span>
        <span>{`Balance: ${selectedDepositAccount.balance} to ${newBalance}`}</span>

        <button className="ConfirmButton" onClick={handleDeposit}>
          Confirm Deposit
        </button>
        <button className="CancelButton" onClick={handleCloseModal}>
          Cancel
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

    if (errorDeposit.noInput) {
      return errorInvalid;
    } else if (errorDeposit.noAccount) {
      return errorNoAccount;
    } else {
      return successModal;
    }

  };

  const newBalance =
    Number(selectedDepositAccount.balance) + Number(depositValue);

  const handleDeposit = () => {
    const transactionDetails = {
      type: "Deposit",
      date: timeNow(),
      amount: `${depositValue}`,
      balance: `${newBalance}`,
      id: Date.now(),
    };

    const updatedAccounts = accounts.map((account) => {
      if (selectedDepositAccount.email === account.email) {
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
    setIsConfirmDepositOpen(false);
    formRef.current.reset();
  };

  return (
    <div className="Modal">
      <div className="Container">{handleError()}</div>
    </div>
  );
}

export default ConfirmDepositModal;
