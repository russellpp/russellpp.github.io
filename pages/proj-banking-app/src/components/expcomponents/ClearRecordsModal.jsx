import React from "react";
import { useState } from "react";

function ClearRecordsModal({
  recordList,
  setRecordList,
  accounts,
  setAccounts,
  currentUser,
  setCurrentUser,
  currentWallet,
  isClearModalOpen,
  setIsClearModalOpen,
  setCurrentWallet,
  isOptionsModalOpen,
  setIsOptionsModalOpen
}) {
  const handleClear = () => {
    currentWallet.records = [];

    const updatedWallets = currentUser.wallets.map((wallet) => {
      if (wallet.isCurrentAccount) {
        return currentWallet;
      } else {
        return wallet;
      }
    });

    const updatedAccount = {
      ...currentUser,
      wallets: updatedWallets,
    };

    const updatedAccounts = accounts.map((account) => {
      if (account.email === currentUser.email) {
        return updatedAccount;
      } else {
        return account;
      }
    });

    setAccounts(updatedAccounts);
    handleCloseModal();
    setIsOptionsModalOpen(false)
  };

  const handleCloseModal = () => {
    setIsClearModalOpen(false);
  };

  return (
    <div className="DeleteModal DeleteWalletModal">
      <div className="BudgetModalContent">
        <div className="DeleteModalExpFooter">
          <span>
            Are you sure you want to delete all recorded items in this account?
          </span>

          <button className="NewBudgetAccountButton" onClick={handleClear}>
            Clear
          </button>
          <button className="BudgetCancelButton" onClick={handleCloseModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default ClearRecordsModal;
