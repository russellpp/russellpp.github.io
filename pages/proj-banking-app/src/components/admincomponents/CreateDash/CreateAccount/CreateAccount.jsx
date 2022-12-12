import React from "react";
import { useState } from "react";
import "./CreateAccount.css";
import ConfirmCreateModal from "./ConfirmCreateModal/ConfirmCreateModal";
import { useEffect } from "react";

function CreateAccount({ accounts, setAccounts, createRef }) {
  const [isConfirmCreateModal, setIsConfirmCreateModal] = useState(false);
  

  const [newDetails, setNewDetails] = useState({
    name: "",
    accountNumber: "",
    email: "",
    password: "",
    balance: "",
    expiration: "12/26",
    isLoggedIn: false,
    isAdmin: false,
    transactions: [],
    wallets: [],
  });

  const handleName = (e) => {
    setNewDetails((prevState) => {
      return {
        ...prevState,
        name: e.target.value,
      };
    });
  };

  const handleNumber = (e) => {
    setNewDetails((prevState) => {
      return {
        ...prevState,
        accountNumber: e.target.value,
      };
    });
  };

  const handleEmail = (e) => {
    setNewDetails((prevState) => {
      return {
        ...prevState,
        email: e.target.value,
      };
    });
  };

  const handlePassword = (e) => {
    setNewDetails((prevState) => {
      return {
        ...prevState,
        password: e.target.value,
      };
    });
  };

  

  const handleBalance = (e) => {
    setNewDetails((prevState) => {
      return {
        ...prevState,
        balance: `${e.target.value}`,
      };
    });
  };

  const handleCreate = (e) => {
    console.log(newDetails)
    e.preventDefault();
    setIsConfirmCreateModal(true);
  };

  



  return (
    <div className="AccountEdit">
      {isConfirmCreateModal && (
        <ConfirmCreateModal
          accounts={accounts}
          setAccounts={setAccounts}
          isConfirmCreateModal={isConfirmCreateModal}
          setIsConfirmCreateModal={setIsConfirmCreateModal}
          newDetails={newDetails}
          createRef={createRef}
        />
      )}
      <form className="AccountEditForm" ref={createRef}>
        <label htmlFor="accountName">Account Name: </label>
        <input
          type="text"
          name="accountName"
          id="accountName"
          placeholder="Account Name"
          autoComplete="off"
          autoFocus
          onChange={handleName}
        />

        <label htmlFor="accountNumber">Account Number: </label>
        <input
          type="text"
          name="accountNumber"
          id="accountName"
          placeholder="Account Number"
          autoComplete="off"
          autoFocus
          onChange={handleNumber}
        />

        <label htmlFor="email">Email: </label>
        <input
          type="text"
          name="email"
          id="accountName"
          placeholder="Email"
          autoComplete="off"
          autoFocus
          onChange={handleEmail}
        />

        <label htmlFor="password">Password: </label>
        <input
          type="text"
          name="password"
          id="accountName"
          placeholder="Password"
          autoComplete="off"
          autoFocus
          onChange={handlePassword}
        />

        <label htmlFor="balance">Balance: </label>
        <input
          type="Number"
          name="balance"
          id="accountName"
          placeholder="Initial Deposit Value"
          autoComplete="off"
          autoFocus
          onChange={handleBalance}
        />
      </form>
      <button onClick={handleCreate}> Create Account</button>
    </div>
  );
}

export default CreateAccount;
