import React from "react";

function RecordItemDeleteModal({
  recordList,
  setRecordList,
  accounts,
  setAccounts,
  currentUser,
  setCurrentUser,
  currentWallet,
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  selectedItem,
}) {
  const handleCloseModal = () => {
    setIsDeleteModalOpen(false);
  };
  const handleDelete = () => {
    const indexItem = currentWallet.records.findIndex(
      (item) => item.uniqueId == selectedItem.item.uniqueId
    );

    currentWallet.records.splice(indexItem, 1);
    
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
    setRecordList(currentWallet.records);
    handleCloseModal()
  };


  return (
    <div className="DeleteModal DeleteWalletModal">
      <div className="BudgetModalContent">
        <div className="DeleteModalExpFooter">
          <span>Are you sure you want to delete this item?</span>
          <span>{selectedItem.item.name}</span>
          <span>{selectedItem.item.category}</span>
          <span>{Math.abs(selectedItem.item.value)}</span>

          <button className="NewBudgetAccountButton" onClick={handleDelete}>
            Delete
          </button>
          <button className="BudgetCancelButton" onClick={handleCloseModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default RecordItemDeleteModal;
