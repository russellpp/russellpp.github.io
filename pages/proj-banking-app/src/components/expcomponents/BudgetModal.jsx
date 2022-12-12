import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function BudgetModal({
  walletList,
  setWalletList,
  setIsBudgetOpen,
  currentUser,
  accounts,
  setAccounts,
  currentWallet,
  setCurrentWallet,
  walletBalance,
  setWalletBalance,
}) {
  const [budgetValue, setBudgetValue] = useState();
  const [budgetAccount, setBudgetAccount] = useState();
  const [errorCreate, setErorCreate] = useState({
    isEmpty: false,
    isInvalidAmount: false,
  });

  const handleCloseModal = () => {
    setIsBudgetOpen(false);
  };

  const handleWalletValue = (e) => {
    setBudgetValue(e.target.value);
  };

  const handleWalletName = (e) => {
    setBudgetAccount(e.target.value);
  };

  useEffect(() => {
    if (
      budgetValue === "" ||
      budgetAccount === "" ||
      !budgetValue ||
      !budgetAccount
    ) {
      setErorCreate((prevState) => {
        return {
          ...prevState,
          isEmpty: true,
        };
      });
    } else if (budgetValue <= 0) {
      setErorCreate((prevState) => {
        return {
          ...prevState,
          isInvalidAmount: true,
        };
      });
    } else {
      setErorCreate({
        isEmpty: false,
        isInvalidAmount: false,
      });
    }
  }, [budgetValue, budgetAccount]);

  const handleCreateWallet = () => {
    if (errorCreate.isInvalidAmount) {
      alert("Invalid amount!");
    } else if (errorCreate.isEmpty) {
      alert("Empty input!");
    } else {
      const wallets = currentUser.wallets;
      if (wallets.length > 0) {
        wallets.map((wallet) => {
          wallet.isCurrentAccount = false;
        });
      }
      const newWallet = {
        name: budgetAccount,
        budget: budgetValue,
        isCurrentAccount: true,
        records: [],
      };
      wallets.push(newWallet);
      const updatedAccount = {
        ...currentUser,
        wallets: wallets,
      };
      const updatedAccounts = accounts.map((account) => {
        if (account.email === currentUser.email) {
          return updatedAccount;
        } else {
          return account;
        }
      });
      const selectedWallet = wallets.find((wallet) => wallet.isCurrentAccount);
      console.log(selectedWallet);
      setCurrentWallet(selectedWallet);
      setAccounts(updatedAccounts);
      handleCloseModal();
    }
  };

  return (
    <div className="BudgetModal">
      <div className="BudgetModalContent">
        <div className="BudgetModalHeader">
          <h4 className="BudgetModalTitle">New Account</h4>
        </div>
        <div className="BudgetModalBody">
          <label htmlFor="accountName">Budget account name: </label>
          <input
            type="text"
            name="amountName"
            id="amountName"
            autoComplete="off"
            autoFocus
            onChange={handleWalletName}
          />

          <label htmlFor="amount">Enter initial budget: </label>
          <input
            type="number"
            name="amount"
            id="amount"
            autoComplete="off"
            autoFocus
            onChange={handleWalletValue}
          />
        </div>
        <div className="BudgetModalFooter">
          <button
            className="NewBudgetAccountButton"
            onClick={handleCreateWallet}
          >
            Add Account
          </button>
          <button className="BudgetCancelButton" onClick={handleCloseModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default BudgetModal;
