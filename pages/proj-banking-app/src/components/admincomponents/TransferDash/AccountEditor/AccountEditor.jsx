import React from "react";
import "./AccountEditor.css";
import { useState } from "react";
import { useEffect } from "react";
import ConfirmTransferModal from "./CofirmTransferModal/ConfirmTransferModal";

function AccountEditor({
  accounts,
  setAccounts,
  selectedTransferAccount,
  setSelectedTransferAccount,
  formRef,
}) {
  const [transferDetails, setTransferDetails] = useState({
    amount:"",
    receiver: ""
  })
  const [isConfirmTransferOpen, setIsConfirmTransferOpen] = useState(false);

  const handleNumber = (e) => {
    e.preventDefault();
    setTransferDetails((prevState) => {
      return{
        ...prevState,
        amount: e.target.value
      }
    });
  };
  const handleReceiver = (e) => {
    e.preventDefault();
    setTransferDetails((prevState) => {
      return{
        ...prevState,
        receiver: e.target.value
      }
    });
  };


  const handleTransfer = (e) => {
    e.preventDefault();
    setIsConfirmTransferOpen(true);
  };

  return (
    <div className="AccountEdit">
      {isConfirmTransferOpen && (
        <ConfirmTransferModal
          accounts={accounts}
          setAccounts={setAccounts}
          selectedTransferAccount={selectedTransferAccount}
          formRef={formRef}
          isConfirmTransferOpen={isConfirmTransferOpen}
          setIsConfirmTransferOpen={setIsConfirmTransferOpen}
          transferDetails={transferDetails}
          setSelectedTransferAccount={setSelectedTransferAccount}
        />
      )}
      <form className="AccountEditForm" ref={formRef}>
        <span>Account Name</span>
        <span>{selectedTransferAccount?.name || ""}</span>

        <span>Account Number</span>
        <span>{selectedTransferAccount?.accountNumber || ""}</span>

        <span>Current Balance</span>
        <span>₱{" "}{parseFloat(selectedTransferAccount?.balance || "")
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>

        <label htmlFor="accountNumber">Transfer amount: </label>
        <input
          type="Number"
          name="accountNumber"
          id="accountName"
          autoComplete="off"
          autoFocus
          onChange={handleNumber}
        />

        <label htmlFor="Receiver">Receiver Account Number: </label>
        <input
          type="Text"
          name="Receiver"
          id="accountName"
          autoComplete="off"
          autoFocus
          onChange={handleReceiver}
        />

        <button onClick={handleTransfer}> Confirm Transfer Details</button>
      </form>
    </div>
  );
}

export default AccountEditor;
