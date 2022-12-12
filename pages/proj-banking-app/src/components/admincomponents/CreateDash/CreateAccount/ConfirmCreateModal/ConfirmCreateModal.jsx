import React from "react";
import { useState, useEffect } from "react";
import "./ConfirmCreateModal.css";

const emailValidation = (email) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
};

function ConfirmCreateModal({
  accounts,
  setAccounts,
  createRef,
  isConfirmCreateModal,
  setIsConfirmCreateModal,
  newDetails,
}) {
  const [createSuccess, setCreateSuccess] = useState(false);
  const [errorCreate, setErrorCreate] = useState({
    isAcctNoInvalid: false,
    isEmailInvalid: false,
    isBalanceInvalid: false,
    isNameInvalid: false,
    isPasswordInvalid: false,
  });

  useEffect(() => {
    if (newDetails.name === "") {
      setErrorCreate((prevState) => {
        return {
          ...prevState,
          isNameInvalid: true,
        };
      });
    } else if (
      newDetails.accountNumber === "" ||
      isNaN(parseFloat(newDetails.accountNumber)) ||
      `${newDetails.accountNumber}`.length !== 9 ||
      accounts.some((acct) => acct.accountNumber === newDetails.accountNumber)
    ) {
      setErrorCreate((prevState) => {
        return {
          ...prevState,
          isAcctNoInvalid: true,
        };
      });
    } else if (!emailValidation(newDetails.email) || newDetails.email === "" || accounts.some((acct) => acct.email === newDetails.email)) {
      setErrorCreate((prevState) => {
        return {
          ...prevState,
          isEmailInvalid: true,
        };
      });
    } else if (
      `${newDetails.password}`.length < 8 ||
      newDetails.password === ""
    ) {
      setErrorCreate((prevState) => {
        return {
          ...prevState,
          isPasswordInvalid: true,
        };
      });
    } else if (newDetails.balance < 0 || newDetails.balance == "") {
      setErrorCreate((prevState) => {
        return {
          ...prevState,
          isBalanceInvalid: true,
        };
      });
    } else {
      setErrorCreate({
        isAcctNoInvalid: false,
        isEmailInvalid: false,
        isBalanceInvalid: false,
        isNameInvalid: false,
      });
      setCreateSuccess(true);
    }
  }, [newDetails]);

  const handleError = () => {
    const successModal = (
      <div className="ModalBody">
        <span>{`Account Name: ${newDetails.name}`}</span>
        <span>{`Account Number: ${newDetails.accountNumber}`}</span>
        <span>{`Email: ${newDetails.email}`}</span>
        <span>{`Password: ${newDetails.password}`}</span>
        <span>{`Initial balance: ${newDetails.balance}`}</span>

        <button className="ConfirmButton" onClick={handleCreate}>
          Create Account
        </button>
        <button className="CancelButton" onClick={handleCloseModal}>
          Cancel
        </button>
      </div>
    );

    const errorEmail = (
      <div className="ModalBody">
        <span>Invalid email! Input proper email format.</span>
        <button className="CancelButton" onClick={handleCloseModal}>
          Close
        </button>
      </div>
    );

    const errorName = (
      <div className="ModalBody">
        <span>Invalid Account Name! Input proper name format.</span>
        <button className="CancelButton" onClick={handleCloseModal}>
          Close
        </button>
      </div>
    );

    const errorAcctNo = (
      <div className="ModalBody">
        <span>
          Invalid Account Number! Either Account number already exists or not in
          proper format.
        </span>
        <button className="CancelButton" onClick={handleCloseModal}>
          Close
        </button>
      </div>
    );

    const errorBalance = (
      <div className="ModalBody">
        <span>Invalid Initial Deposit! Please input proper value.</span>
        <button className="CancelButton" onClick={handleCloseModal}>
          Close
        </button>
      </div>
    );

    const errorPassword = (
      <div className="ModalBody">
        <span>Invalid Password! Password must have at least 8 characters.</span>
        <button className="CancelButton" onClick={handleCloseModal}>
          Close
        </button>
      </div>
    );

    if (errorCreate.isAcctNoInvalid) {
      return errorAcctNo;
    } else if (errorCreate.isBalanceInvalid) {
      return errorBalance;
    } else if (errorCreate.isEmailInvalid) {
      return errorEmail;
    } else if (errorCreate.isNameInvalid) {
      return errorName;
    } else if (errorCreate.isPasswordInvalid) {
      return errorPassword;
    } else {
      return successModal;
    }
  };

  const handleCreate = () => {
    setAccounts((prevState) => {
      return [...prevState, newDetails];
    });
    handleCloseModal();
  };
  const handleCloseModal = () => {
    setIsConfirmCreateModal(false);
    if (createSuccess) {
      createRef.current.reset();
    }
  };

  return (
    <div className="Modal">
      <div className="Container">{handleError()}</div>
    </div>
  );
}

export default ConfirmCreateModal;
