import React from "react";
import { useEffect } from "react";
import { useState } from "react";

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
const currentTime =
  /* thisTime.getFullYear() */ thisTime.getDate() +
  "-" +
  month[thisTime.getMonth()];

function SendModal({
  setIsOpen,
  currentUser,
  accounts,
  setAccounts,
  setCurrentUser,
}) {
  const [errorSend, setErrorSend] = useState({
    isEmpty: false,
    isAmountInvalid: false,
    isAcctInvalid: false,
  });
  const [sendDetails, setSendDetails] = useState({
    amount: "",
    receiver: "",
    sender: currentUser?.accountNumber || "",
  });

  //handle send

  const handleGetReceiver = (e) => {
    setSendDetails((prevState) => {
      return { ...prevState, receiver: e.target.value };
    });
  };

  const handleGetAmount = (e) => {
    setSendDetails((prevState) => {
      return { ...prevState, amount: e.target.value };
    });
  };

  useEffect(() => {
    const newBalance = Number(currentUser.balance) - Number(sendDetails.amount);
    setErrorSend({
      isEmpty: false,
      isAmountInvalid: false,
      isAcctInvalid: false,
    });

    if (accounts.some((acct) => acct.accountNumber === sendDetails.receiver)) {
      if (sendDetails.amount == "" || sendDetails.receiver == "") {
        setErrorSend((prevState) => {
          return {
            ...prevState,
            isEmpty: true,
          };
        });
      } else if (newBalance < 0 || sendDetails.amount < 0) {
        setErrorSend((prevState) => {
          return {
            ...prevState,
            isAmountInvalid: true,
          };
        });
      } else if (sendDetails.receiver === currentUser.accountNumber) {
        setErrorSend((prevState) => {
          return {
            ...prevState,
            isAcctInvalid: true,
          };
        });
      } else {
        setErrorSend({
          isEmpty: false,
          isAmountInvalid: false,
          isAcctInvalid: false,
        });
      }
    } else {
      setErrorSend({
        isEmpty: false,
        isAmountInvalid: false,
        isAcctInvalid: true,
      });
    }
  }, [sendDetails]);

  const handleSend = () => {
    if (errorSend.isEmpty) {
      alert("Empty field submitted. Please input value.");
    } else if (errorSend.isAmountInvalid) {
      alert("Insufficient funds or invalid amount!");
    } else if (errorSend.isAcctInvalid) {
      alert("Invalid account number! Please input correct account number.");
    } else {
      const newBalance =
        Number(currentUser.balance) - Number(sendDetails.amount);
      const receiverUser = accounts.find(
        (account) => account.accountNumber === sendDetails.receiver
      );

      const transactionDetails = {
        type: "Send",
        date: currentTime,
        amount: `-${sendDetails.amount}`,
        balance: `${newBalance}`,
        receiver: sendDetails.receiver,
        id: Date.now(),
      };

      const newTransactions = currentUser.transactions.unshift(transactionDetails);
     currentUser.transactions = newTransactions
      
      /* setCurrentUser((prevState) => {
        return {
          ...prevState,
          balance: newBalance,
          transactions: newTransactions,
        };
      }); */

      //update receiver end

      const newRBalance =
        Number(receiverUser.balance) + Number(sendDetails.amount);
      receiverUser.balance = `${newRBalance}`;

      const receiverTransaction = {
        type: "Receive",
        date: currentTime,
        amount: sendDetails.amount,
        balance: `${newRBalance}`,
        id: Date.now(),
      };

      receiverUser.transactions.unshift(receiverTransaction);

      const updatedAccount = {
        ...currentUser,
        balance: `${newBalance}`,
        transactions: currentUser.transactions,
      };

      const updatedAccounts = accounts.map((account) => {
        if (account.email === currentUser.email) {
          return updatedAccount;
        } else if (account.accountNumber === sendDetails.receiver) {
          return receiverUser;
        } else {
          return account;
        }
      });
      
      setAccounts(updatedAccounts);
      alert(
        `Successfully sent ${sendDetails.amount} to ${receiverUser.name}(${receiverUser.accountNumber})`
      );
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="sendModal">
      <div className="sendModalContent">
        <div className="sendModalHeader">
          <h4 className="sendModalTitle">Send</h4>
        </div>
        <div className="sendModalBody">
          <label htmlFor="amount">Enter amount: </label>
          <input
            type="number"
            name="amount"
            id="amount"
            required
            autoComplete="off"
            autoFocus
            onChange={handleGetAmount}
          />
        </div>
        <div className="sendModalBody">
          <label htmlFor="account">Enter account number: </label>
          <input
            type="text"
            name="account"
            id="amount"
            required
            autoComplete="off"
            autoFocus
            onChange={handleGetReceiver}
          />
        </div>
        <div className="sendModalFooter">
          <button className="sendDepositButton" onClick={handleSend}>
            Send
          </button>
          <button className="sendCancelButton" onClick={handleCloseModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default SendModal;
