import React from "react";
import "./ListBox.css";
import { useState } from "react";

function ListBox({
  accounts,
  setAccounts,
  selectedTransferAccount,
  setSelectedTransferAccount,
  formRef,
}) {
  const handleSelect = (indexTarget) => {
    const foundAccount = accounts.find(
      (account, index) => index === indexTarget
    );
    setSelectedTransferAccount(foundAccount);
    formRef.current.reset();
  };

  return (
    <ul className="ListBox">
      {accounts.map((account, index) => (
        <li
          className={
            account !== selectedTransferAccount ? "AccountItem" : "SelectedItem"
          }
          key={index}
          onClick={() => handleSelect(index)}
        >
          <span>{account.name}</span>
          <span>{account.accountNumber}</span>
          <span>{account.email}</span>
          <span>{account.password}</span>
          <span>₱{" "}{parseFloat(account.balance)
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
        </li>
      ))}
    </ul>
  );
}

export default ListBox;
