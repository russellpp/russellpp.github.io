import React from "react";

function AccountDeleteModal({
  recordList,
  setRecordList,
  accounts,
  setAccounts,
  currentUser,
  setCurrentUser,
  currentWallet,
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  setCurrentWallet,
  isOptionsModalOpen,
  setIsOptionsModalOpen
}) {
  const handleDelete = () => {
    const updatedWallets = currentUser.wallets;
    const index = updatedWallets.findIndex((wallet) => wallet.isCurrentAccount);

    if (updatedWallets.length > 1){
      updatedWallets.splice(index, 1);
      updatedWallets[0].isCurrentAccount = true;
    } else {
      updatedWallets.splice(index, 1);
    }

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

    handleCloseModal();
    setAccounts(updatedAccounts);
    setRecordList(currentWallet?.records || [])
    setIsOptionsModalOpen(false)

  };

  const handleCloseModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="DeleteModal DeleteWalletModal">
      <div className="BudgetModalContent">
        <div className="DeleteModalExpFooter">
          <span>Are you sure you want to delete this account?</span>

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

export default AccountDeleteModal;
