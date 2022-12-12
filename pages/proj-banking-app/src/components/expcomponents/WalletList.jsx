import React from "react";
import { useState, useEffect } from "react";

function WalletList(props) {
  const {
    listWallets,
    currentUser,
    currentWallet,
    setCurrentWallet,
    accounts,
    setAccounts,
  } = props;

  function handleSelectWallet(indexTarget) {
    //make target iscurrentaccount true
    listWallets.map((wallet, index) => {
      if (index == indexTarget) {
        wallet.isCurrentAccount = true;
      } else {
        wallet.isCurrentAccount = false;
      }
    });
    
    //update accounts
    const updatedAccount = {
      ...currentUser,
      wallets: listWallets,
    };

    const updatedAccounts = accounts.map((account) => {
      if (account.email === currentUser.email) {
        return updatedAccount;
      } else {
        return account;
      }
    });
    setAccounts(updatedAccounts);

    // update selected wallet to current wallet
    const selectedWallet = listWallets.find((wallet) => wallet.isCurrentAccount)
    setCurrentWallet(selectedWallet)
  }

  return (
    <ul className="AccountList">
      {listWallets.map((list, index) => (
        <li
          onClick={() => handleSelectWallet(index)}
          key={index}
          className={
            currentWallet !== list ? "AccountRecord" : "SelectedAccountRecord"
          }
        >
          <span>{list.name}</span>
          <span>{list.budget}</span>
        </li>
      ))}
    </ul>
  );
}

export default WalletList;
