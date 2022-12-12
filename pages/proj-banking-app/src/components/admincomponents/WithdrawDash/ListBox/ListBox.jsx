import React from "react";
import "../../ManageUsers/ListBox/ListBox.css";
import { useState } from "react";

function ListBox({
  accounts,
  setAccounts,
  selectedWithdrawAccount,
  setSelectedWithdrawAccount,
  formRef,
}) {
  const handleSelect = (indexTarget) => {
    const foundAccount = accounts.find(
      (account, index) => index === indexTarget
    );
    setSelectedWithdrawAccount(foundAccount);
    formRef.current.reset();
  };

  return (
    <ul className="ListBox">
      {accounts.map((account, index) => (
        <li
          className={
            account !== selectedWithdrawAccount ? "AccountItem" : "SelectedItem"
          }
          key={index}
          onClick={() => handleSelect(index)}
        >
          <span>{account.name}</span>
          <span>{account.accountNumber}</span>
          <span>email: {account.email}</span>
          <span>password: {account.password}</span>
          <span>
            ₱{" "}
            {parseFloat(account.balance)
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default ListBox;
