import React from "react";
import "./ConfirmEditModal.css";

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
  const currentTime = thisTime.getDate() + "-" + month[thisTime.getMonth()];
  return currentTime;
};

function ConfirmEditModal({
  accounts,
  setAccounts,
  selectedAccount,
  formRef,
  isConfirmEditOpen,
  setIsConfirmEditOpen,
  editDetails,
  setSelectedAccount,
}) {
  const handleEdit = () => {
    const newBalance =
      Number(selectedAccount.balance) - Number(editDetails.amount);

    const transactionDetails = {
      type: "Balance-Adjustment",
      date: timeNow(),
      amount: `${newBalance}`,
      balance: `${editDetails.balance}`,
      id: Date.now(),
    };

    const updatedAccounts = accounts.map((account) => {
      if (selectedAccount.email === account.email) {
        const updatedDetails = {
          ...account,
          name: editDetails.name,
          accountNumber: editDetails.accountNumber,
          email: editDetails.email,
          password: editDetails.password,
          balance: editDetails.balance,
        };
        return updatedDetails;
      } else {
        return account;
      }
    });
    setAccounts(updatedAccounts);
    handleCloseModal();
  };
  const handleCloseModal = () => {
    setIsConfirmEditOpen(false);
    formRef.current.reset();
  };

  return (
    <div className="Modal">
      <div className="Container">
        <div className="ModalBody">
          <span>Are you sure you want to apply changes to this account?</span>
          <span>{`${selectedAccount.name} to ${editDetails.name}`}</span>
          <span>{`${selectedAccount.accountNumber} to ${editDetails.accountNumber}`}</span>
          <span>{`${selectedAccount.email} to ${editDetails.email}`}</span>
          <span>{`${selectedAccount.password} to ${editDetails.password}`}</span>
          <span>{`${selectedAccount.balance} to ${editDetails.balance}`}</span>

          <button className="ConfirmButton" onClick={handleEdit}>
            Confirm Edit
          </button>
          <button className="CancelButton" onClick={handleCloseModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmEditModal;
