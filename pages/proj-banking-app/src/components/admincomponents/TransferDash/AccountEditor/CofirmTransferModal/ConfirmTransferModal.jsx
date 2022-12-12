import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./ConfirmTransferModal.css";

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

function ConfirmTransferModal({
  accounts,
  setAccounts,
  selectedTransferAccount,
  formRef,
  isConfirmTransferOpen,
  setIsConfirmTransferOpen,
  transferDetails,
  setSelectedTransferAccount,
}) {
  const [errorTransfer, setTransferError] = useState({
    negative: false,
    noInput: true,
    noReceiver: true,
  });

  useEffect(() => {
    const newBalance =
      Number(selectedTransferAccount.balance) - Number(transferDetails.amount);
    if (
      accounts.some(
        (account) => account.accountNumber === transferDetails.receiver
      )
    ) {
      if (newBalance < 0) {
        setTransferError({
          negative: true,
          noInput: false,
          noReceiver: false,
        });
      } else if (
        transferDetails.amount === 0 ||
        transferDetails.amount === "" ||
        transferDetails.amount === undefined
      ) {
        setTransferError({
          negative: false,
          noInput: true,
          noReceiver: false,
        });
      } else {
        setTransferError({
          negative: false,
          noInput: false,
          noReceiver: false,
        });
      }
    } else {
      setTransferError({
        negative: false,
        noInput: false,
        noReceiver: true,
      });
    }
  }, [transferDetails]);

  const handleTransfer = () => {
    const newBalance =
      Number(selectedTransferAccount.balance) - Number(transferDetails.amount);

    const receiverAcct = accounts.find((acct) => acct.accountNumber === transferDetails.receiver)
    const newRBalance = Number(receiverAcct.balance) + Number(transferDetails.amount)

    const transactionDetails = {
      type: "Send",
      date: timeNow(),
      amount: `-${transferDetails.amount}`,
      balance: `${newBalance}`,
      receiver: transferDetails.receiver,
      id: Date.now(),
    };
    const recipientTransaction = {
      type: "Receive",
      date: timeNow(),
      amount: `${transferDetails.amount}`,
      balance: `${newRBalance}`,
      sender: transferDetails.receiver,
      id: Date.now(),
    };

    const updatedAccounts = accounts.map((account) => {
      if (selectedTransferAccount.email === account.email) {
        const newTransactions = account.transactions;
        newTransactions.unshift(transactionDetails);
        const updatedDetails = {
          ...account,
          balance: newBalance,
          transactions: newTransactions,
        };

        return updatedDetails;
      } else if (account.accountNumber === transferDetails.receiver) {
        const newRTransactions = account.transactions;
        newRTransactions.unshift(recipientTransaction);
        const updatedRDetails = {
          ...account,
          balance: newRBalance,
          transactions: newRTransactions,
        };
        return updatedRDetails
      } else {
        return account;
      }
    });
    setAccounts(updatedAccounts);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setIsConfirmTransferOpen(false);
    formRef.current.reset();
  };

  const handleError = () => {
    const newBalance =
      Number(selectedTransferAccount.balance) - Number(transferDetails.amount);

    const confirmTransferModal = (
      <div className="ModalBody">
        <span>Confirm Transfer Details</span>
        <span>{`Account Name: ${selectedTransferAccount.name}`}</span>
        <span>{`Account Number: ${selectedTransferAccount.accountNumber}`}</span>
        <span>{`Transfer Amount: ${transferDetails.amount}`}</span>
        <span>{`Receiver Account: ${transferDetails.receiver}`}</span>
        <span>{`Balance: ${selectedTransferAccount.balance} to ${newBalance}`}</span>

        <button className="ConfirmButton" onClick={handleTransfer}>
          Confirm Transfer
        </button>
        <button className="CancelButton" onClick={handleCloseModal}>
          Cancel
        </button>
      </div>
    );

    const errorModal = (
      <div className="ModalBody">
        <span>Insufficient funds! Please adjust amount. </span>
        <button className="CancelButton" onClick={handleCloseModal}>
          Close
        </button>
      </div>
    );

    const errorInvalid = (
      <div className="ModalBody">
        <span>Invalid input! Please input proper value.</span>
        <button className="CancelButton" onClick={handleCloseModal}>
          Close
        </button>
      </div>
    );
    const errorNoReceiver = (
      <div className="ModalBody">
        <span>
          No receiving account input or receiver account does not exist! Please
          check if input is correct.
        </span>
        <button className="CancelButton" onClick={handleCloseModal}>
          Close
        </button>
      </div>
    );

    if (errorTransfer.negative) {
      return errorModal;
    } else if (errorTransfer.noInput) {
      return errorInvalid;
    } else if (errorTransfer.noReceiver) {
      return errorNoReceiver;
    } else {
      return confirmTransferModal;
    }
  };

  return (
    <div className="Modal">
      <div className="Container">{handleError()}</div>
    </div>
  );
}

export default ConfirmTransferModal;
