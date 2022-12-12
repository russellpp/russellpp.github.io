import React from "react";
import RecordList from "./RecordList";
import { useState } from "react";

function RecordItemEditModal({
  recordList,
  setRecordList,
  accounts,
  setAccounts,
  currentUser,
  setCurrentUser,
  currentWallet,
  isEditModalOpen,
  setIsEditModalOpen,
  selectedItem,
  dataOptions,
}) {
  const [itemName, setItemName] = useState();
  const [itemValue, setItemValue] = useState();
  const [itemCategory, setItemCategory] = useState();
  const [isExpense, setIsExpense] = useState(true);

  const handleItem = (e) => {
    setItemName(e.target.value);
  };

  const handleValue = (e) => {
    isExpense
      ? setItemValue(parseFloat(-1 * e.target.value).toFixed(2))
      : setItemValue(parseFloat(e.target.value).toFixed(2));
  };

  const handleGetCategory = (e) => {
    setItemCategory(e.target.value);
  };

  const handleEditItem = () => {
    if (!itemCategory || !itemName || !itemValue ) {
      alert("Empty field!");
    } else if (Math.abs(itemValue) <= 0) {
      alert("Invalid amount");
    } else {
      const indexItem = currentWallet.records.findIndex(
        (item) => item.uniqueId == selectedItem.item.uniqueId
      );

      const editedItem = {
        id: selectedItem.item.id,
        name: itemName,
        category: itemCategory,
        value: itemValue,
        uniqueId: selectedItem.item.uniqueId,
      };

      currentWallet.records[indexItem] = editedItem;

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
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  const handleToggle = () => {
    setIsExpense(!isExpense);
    console.log(isExpense);
  };

  return (
    <div className="EditItemModal">
      <div className="BudgetModalContent">
        <div className="BudgetModalHeader">
          <h4 className="BudgetModalTitle">Edit Item</h4>
        </div>
        <div className="BudgetModalBody">
          <div
            onClick={handleToggle}
            className={`wrg-toggle ${isExpense ? "wrg-toggle--checked" : ""}`}
          >
            <div className="wrg-toggle-container">
              <div className="wrg-toggle-check">
                <span>Expense</span>
              </div>
              <div className="wrg-toggle-uncheck">
                <span>Income</span>
              </div>
            </div>
            <div className="wrg-toggle-circle"></div>
            <input
              className="wrg-toggle-input"
              type="checkbox"
              aria-label="Toggle Button"
            />
          </div>

          <label htmlFor="accountName">Item name: </label>
          <input
            type="text"
            name="accountName"
            id="accountName"
            placeholder={selectedItem.item.name}
            autoComplete="off"
            autoFocus
            onChange={handleItem}
          />

          <label htmlFor="category">Select Category: </label>
          <select
            name="category"
            id="category"
            list="options"
            autoComplete="off"
            autoFocus
            onChange={handleGetCategory}
          >
            <option disabled selected>
              Select new category...
            </option>
            {dataOptions.map((item, index) => {
              return (
                <option key={index} value={item.displayValue}>
                  {item}
                </option>
              );
            })}
          </select>

          <label htmlFor="amount">Enter value: </label>
          <input
            type="number"
            name="amount"
            id="amount"
            placeholder={Math.abs(selectedItem.item.value)}
            autoComplete="off"
            autoFocus
            onChange={handleValue}
          />
        </div>
        <div className="BudgetModalFooter">
          <button className="NewBudgetAccountButton" onClick={handleEditItem}>
            Finish Editing
          </button>
          <button className="BudgetCancelButton" onClick={handleCloseModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecordItemEditModal;
