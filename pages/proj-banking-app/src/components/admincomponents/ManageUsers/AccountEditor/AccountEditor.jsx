import React from "react";
import "./AccountEditor.css";
import { useState } from "react";
import { useEffect } from "react";
import ConfirmEditModal from "./CofirmEditModal/ConfirmEditModal";

function AccountEditor({
  accounts,
  setAccounts,
  selectedAccount,
  setSelectedAccount,
  formRef,
}) {
  const [editDetails, setEditDetails] = useState({
    name: "",
    accountNumber: "",
    email: "",
    password: "",
    balance: "",
  });

  const [isConfirmEditOpen, setIsConfirmEditOpen] = useState(false);

  useEffect(() => {
    setEditDetails((prevState) => {
      return {
        name: selectedAccount?.name || "",
        accountNumber: selectedAccount?.accountNumber || "",
        email: selectedAccount?.email || "",
        password: selectedAccount?.password || "",
        balance: selectedAccount?.balance || "",
      };
    });
  }, [selectedAccount]);

  const handleNumber = (e) => {
    e.preventDefault();
    setEditDetails((prevState) => {
      return {
        ...prevState,
        accountNumber: e.target.value,
      };
    });
  };

  const handleName = (e) => {
    e.preventDefault();
    setEditDetails((prevState) => {
      return {
        ...prevState,
        name: e.target.value,
      };
    });
  };

  const handleEmail = (e) => {
    e.preventDefault();
    setEditDetails((prevState) => {
      return {
        ...prevState,
        email: e.target.value,
      };
    });
  };

  const handlePassword = (e) => {
    e.preventDefault();
    setEditDetails((prevState) => {
      return {
        ...prevState,
        password: e.target.value,
      };
    });
  };

  const handleBalance = (e) => {
    e.preventDefault();
    setEditDetails((prevState) => {
      return {
        ...prevState,
        balance: e.target.value,
      };
    });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setIsConfirmEditOpen(true);
  };

  return (
    <div className="AccountEdit">
      {isConfirmEditOpen && (
        <ConfirmEditModal
          accounts={accounts}
          setAccounts={setAccounts}
          selectedAccount={selectedAccount}
          formRef={formRef}
          isConfirmEditOpen={isConfirmEditOpen}
          setIsConfirmEditOpen={setIsConfirmEditOpen}
          editDetails={editDetails}
          setSelectedAccount={setSelectedAccount}
        />
      )}
      <form className="AccountEditForm" ref={formRef}>
        <label htmlFor="accountName">Account Name: </label>
        <input
          type="text"
          name="accountName"
          id="accountName"
          placeholder={selectedAccount?.name || ""}
          autoComplete="off"
          autoFocus
          onChange={handleName}
        />

        <label htmlFor="accountNumber">Account Number: </label>
        <input
          type="text"
          name="accountNumber"
          id="accountName"
          placeholder={selectedAccount?.accountNumber || ""}
          autoComplete="off"
          autoFocus
          onChange={handleNumber}
        />

        <label htmlFor="email">Email: </label>
        <input
          type="text"
          name="email"
          id="accountName"
          placeholder={selectedAccount?.email || ""}
          autoComplete="off"
          autoFocus
          onChange={handleEmail}
        />

        <label htmlFor="password">Password: </label>
        <input
          type="text"
          name="password"
          id="accountName"
          placeholder={selectedAccount?.password || ""}
          autoComplete="off"
          autoFocus
          onChange={handlePassword}
        />

        <label htmlFor="balance">Balance: </label>
        <input
          type="text"
          name="balance"
          id="accountName"
          placeholder={selectedAccount?.balance || ""}
          autoComplete="off"
          autoFocus
          onChange={handleBalance}
        />

        <button onClick={handleEdit}> Confirm Edit Details</button>
      </form>
    </div>
  );
}

export default AccountEditor;
