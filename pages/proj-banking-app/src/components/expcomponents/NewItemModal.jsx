import React, { useEffect } from "react";
import { useState } from "react";
import AddCategory from "./AddCategoryModal";

const timeNow = () => {
  const thisTime = new Date();
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let hrs = thisTime.getHours();
  if (hrs < 10) {
    hrs = "0" + hrs;
  }
  let min = thisTime.getMinutes();
  if (min < 10) {
    min = "0" + min;
  }

  const currentTime =
    thisTime.getDate() +
    "-" +
    month[thisTime.getMonth()] +
    " " +
    hrs +
    ":" +
    min;
  return currentTime;
};

function NewItemModal({
  setIsAddItemModalOpen,
  isAddItemModalOpen,
  recordList,
  setRecordList,
  accounts,
  setAccounts,
  currentUser,
  setCurrentUser,
  currentWallet,
  dataOptions,
  setDataOptions,
}) {
  const [itemName, setItemName] = useState();
  const [itemValue, setItemValue] = useState();
  const [itemCategory, setItemCategory] = useState();
  const [itemId, setItemId] = useState();
  const [addedCategory, setAddedCategory] = useState("");
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [buttontext, setButtonText] = useState("Edit Categories");
  const [isExpense, setIsExpense] = useState(true);
  const [incomeOptions, setIncomeOptions] = useState([
    "Salary",
    "Business Revenue",
    "Bonuses",
    "Tax Refund",
    "Gifts & Donations",
    "Others",
  ]);
  const [expenseOptions, setExpenseOptions] = useState([
    "Food & Drinks",
    "Shopping",
    "Housing",
    "Transportation",
    "Vehicle",
    "Life & Entertainment",
    "Communication, PC",
    "Financial Expenses",
    "Investments",
    "Others",
  ]);

  useEffect(() => {
    isExpense ? setDataOptions(expenseOptions) : setDataOptions(incomeOptions);
  }, [isExpense, dataOptions, addedCategory, incomeOptions, expenseOptions]);

  const handleToggle = () => {
    setIsExpense(!isExpense);
    console.log(isExpense);
  };

  const handleCloseModal = () => {
    setIsAddItemModalOpen(false);
  };

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

  const handleOpenExtension = () => {
    if (isAddCategoryOpen) {
      setIsAddCategoryOpen(false);
      setButtonText("Edit Categories");
    } else {
      setIsAddCategoryOpen(true);
      setButtonText("Close Editing");
    }
  };

  const handleAddItem = () => {
    if (itemName == "" || !itemName || !itemCategory || !itemValue) {
      alert("Empty input!");
    } else if (Math.abs(itemValue) <= 0) {
      alert("Invalid amount!");
    } else {
      //add new record

      const newRecord = {
        id: timeNow(),
        name: itemName,
        category: itemCategory,
        value: itemValue,
        uniqueId: Date.now(),
      };

      currentWallet.records.push(newRecord);

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

  return (
    <div className="ItemModal">
      <div className="BudgetModalContent">
        <div className="BudgetModalHeader">
          <h4 className="BudgetModalTitle">New Item</h4>
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
              Select category...
            </option>
            {dataOptions.map((item, index) => {
              return (
                <option key={index} value={item.displayValue}>
                  {item}
                </option>
              );
            })}
          </select>

          <button
            className={
              isAddCategoryOpen ? "RedButton" : "NewBudgetAccountButton"
            }
            onClick={handleOpenExtension}
          >
            {buttontext}
          </button>

          {isAddCategoryOpen && (
            <AddCategory
              isAddCategoryOpen={isAddCategoryOpen}
              setIsAddCategoryOpen={setIsAddCategoryOpen}
              setDataOptions={setDataOptions}
              dataOptions={dataOptions}
              addedCategory={addedCategory}
              setAddedCategory={setAddedCategory}
              incomeOptions={incomeOptions}
              setIncomeOptions={setIncomeOptions}
              expenseOptions={expenseOptions}
              setExpenseOptions={setExpenseOptions}
              isExpense={isExpense}
            />
          )}

          <label htmlFor="amount">Enter value: </label>
          <input
            type="number"
            name="amount"
            id="amount"
            autoComplete="off"
            autoFocus
            onChange={handleValue}
          />
        </div>
        <div className="BudgetModalFooter">
          <button className="NewBudgetAccountButton" onClick={handleAddItem}>
            Add Item
          </button>
          <button className="BudgetCancelButton" onClick={handleCloseModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewItemModal;
