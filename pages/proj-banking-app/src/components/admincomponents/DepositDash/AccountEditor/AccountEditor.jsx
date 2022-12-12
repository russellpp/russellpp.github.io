import React from "react";
import "./AccountEditor.css";
import { useState } from "react";
import { useEffect } from "react";
import ConfirmDepositModal from "./CofirmDepositModal/ConfirmDepositModal";

function AccountEditor({
  accounts,
  setAccounts,
  selectedDepositAccount,
  setSelectedDepositAccount,
  formRef,
}) {
  const [depositValue, setDepositValue] = useState()
  const [isConfirmDepositOpen, setIsConfirmDepositOpen] = useState(false);

  const handleNumber = (e) => {
    e.preventDefault();
    setDepositValue(e.target.value);
  };


  const handleDeposit = (e) => {
    e.preventDefault();
    setIsConfirmDepositOpen(true);
  };

  return (
    <div className="AccountEdit">
      {isConfirmDepositOpen && (
        <ConfirmDepositModal
          accounts={accounts}
          setAccounts={setAccounts}
          selectedDepositAccount={selectedDepositAccount}
          formRef={formRef}
          isConfirmDepositOpen={isConfirmDepositOpen}
          setIsConfirmDepositOpen={setIsConfirmDepositOpen}
          depositValue={depositValue}
          setSelectedDepositAccount={setSelectedDepositAccount}
        />
      )}
      <form className="AccountEditForm" ref={formRef}>
        <span>Account Name</span>
        <span>{selectedDepositAccount?.name || ""}</span>

        <span>Account Number</span>
        <span>{selectedDepositAccount?.accountNumber || ""}</span>

        <span>Current Balance</span>
        <span>₱{" "}{parseFloat(selectedDepositAccount?.balance || "")
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>

        <label htmlFor="accountNumber">Deposit amount: </label>
        <input
          type="Number"
          name="accountNumber"
          id="accountName"
          autoComplete="off"
          autoFocus
          onChange={handleNumber}
        />
        <span></span>
        <span></span>
        <button onClick={handleDeposit}> Confirm Deposit Details</button>
      </form>
    </div>
  );
}

export default AccountEditor;
