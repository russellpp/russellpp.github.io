import React from "react";

function AddCategory({
  defaultOptions,
  addedCategory,
  setAddedCategory,
  dataOptions,
  setDataOptions,
  isAddCategoryOpen,
  setIsAddCategoryOpen,
  incomeOptions,
  setIncomeOptions,
  expenseOptions,
  setExpenseOptions,
  isExpense

}) {
  const handleCategoryChange = (e) => {
    setAddedCategory(e.target.value);
  };

  const handleClearCategory = () => {
    isExpense ? setExpenseOptions([
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
    ]) : setIncomeOptions([
      "Salary",
      "Business Revenue",
      "Bonuses",
      "Tax Refund",
      "Gifts & Donations",
      "Others"
    ])
    isExpense ? setDataOptions(expenseOptions) : setDataOptions(incomeOptions)
  };

  const handleAddCategory = () => {
    if (addedCategory == "" || undefined ){
      alert('Empty input!')
    } else {
      isExpense ? setExpenseOptions((prevState) => {
        return [...prevState, addedCategory];
      }) : setIncomeOptions((prevState) => {
        return [...prevState, addedCategory];
      });
      setAddedCategory("");

    }
  };

  return (
    <div className="EditCategoryContainer">
      <label htmlFor="newCategory">New Category: </label>
      <input
        type="text"
        name="newCategory"
        id="newCategory"
        autoComplete="off"
        value={addedCategory}
        autoFocus
        onChange={handleCategoryChange}
      />
      <button className="NewBudgetAccountButton" onClick={handleAddCategory}>
        Add Category
      </button>
      <button className="NewBudgetAccountButton" onClick={handleClearCategory}>
        Clear Custom Categories
      </button>
    </div>
  )
}

export default AddCategory;
