import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import AccountDeleteModal from "./AccountDeleteModal";
import ClearRecordsModal from "./ClearRecordsModal";

function RecordsOpttionsModal({
  recordList,
  setRecordList,
  accounts,
  setAccounts,
  currentUser,
  setCurrentUser,
  currentWallet,
  setCurrentWallet,
  isOptionsModalOpen,
  setIsOptionsModalOpen,
}) {
  const [isClearModalopen, setIsClearModalOpen] = useState(false);
  const [isDeleteModalopen, setIsDeleteModalOpen] = useState(false);
  const [itemName, setItemName] = useState();
  const [itemValue, setItemValue] = useState();

  const handleItem = (e) => {
    setItemName(e.target.value);
  };

  const handleValue = (e) => {
    setItemValue(e.target.value);
  };

  const handleEditAccount = () => {
    if (!itemName || !itemValue) {
      alert('Empty fields!')
    } else if (Math.abs(itemValue) < 0) {
      alert('Must enter value above 0.')
    } else {

      const updatedWallet = {
        ...currentWallet,
        name: itemName,
        budget: itemValue,
      };
  
      const updatedWallets = currentUser.wallets.map((wallet) => {
        if (wallet.isCurrentAccount) {
          return updatedWallet;
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
      setCurrentWallet(currentWallet);
      handleCloseModal();
    }
    
  };

  const handleCloseModal = () => {
    setIsOptionsModalOpen(false);
  };

  const handleClear = () => {
    setIsClearModalOpen(true);
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="EditItemModal">
      <div className="BudgetModalContent">
        <div className="BudgetModalHeader">
          <h4 className="BudgetModalTitle">Edit Wallet</h4>
        </div>
        <div className="BudgetModalBody">
          <label htmlFor="accountName">Item name: </label>
          <input
            type="text"
            name="accountName"
            id="accountName"
            placeholder={currentWallet.name}
            autoComplete="off"
            autoFocus
            onChange={handleItem}
          />

          <label htmlFor="amount">Change Initial Budget: </label>
          <input
            type="number"
            name="amount"
            id="amount"
            placeholder={currentWallet.budget}
            autoComplete="off"
            autoFocus
            onChange={handleValue}
          />
        </div>

        <div className="BudgetModalFooter">
          <button className="OptionDeleteButton" onClick={handleClear}>
            Clear All Items
          </button>
          <button className="OptionDeleteButton" onClick={handleDelete}>
            Delete Wallet
          </button>
          <button
            className="NewBudgetAccountButton"
            onClick={handleEditAccount}
          >
            Finish Editing
          </button>
          <button className="BudgetCancelButton" onClick={handleCloseModal}>
            Cancel
          </button>
        </div>
      </div>
      {isDeleteModalopen && (
        <AccountDeleteModal
          setCurrentUser={setCurrentUser}
          currentUser={currentUser}
          accounts={accounts}
          setAccounts={setAccounts}
          currentWallet={currentWallet}
          recordList={recordList}
          setRecordList={setRecordList}
          isDeleteModalOpen={isDeleteModalopen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          setCurrentWallet={setCurrentWallet}
          isOptionsModalOpen={isOptionsModalOpen}
          setIsOptionsModalOpen={setIsOptionsModalOpen}
        />
      )}
      {isClearModalopen && (
        <ClearRecordsModal
          setCurrentUser={setCurrentUser}
          currentUser={currentUser}
          accounts={accounts}
          setAccounts={setAccounts}
          currentWallet={currentWallet}
          recordList={recordList}
          setRecordList={setRecordList}
          isClearModalOpen={isClearModalopen}
          setIsClearModalOpen={setIsClearModalOpen}
          setCurrentWallet={setCurrentWallet}
          isOptionsModalOpen={isOptionsModalOpen}
          setIsOptionsModalOpen={setIsOptionsModalOpen}
        />
      )}
    </div>
  );
}

export default RecordsOpttionsModal;
