import React from "react";
import "./ExpensesDashboard.css";
import AccountContainer from "./expcomponents/AccountContainer";
import Records from "./expcomponents/Records";
import { useState, useEffect } from "react";
import BackButton from "./expcomponents/BackButton";

function ExpensesDashboard(props) {
  const [currentUser, setCurrentUser] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [currentWallet, setCurrentWallet] = useState([]);
  const [walletBalance, setWalletBalance] = useState(0);
  const [walletList, setWalletList] = useState([]);

  /* useEffect(() => {
    if (WalletsNow.length > 0){
      WalletsNow.map((wallet) => wallet.isCurrentAccount = false);
      WalletsNow[WalletsNow.length - 1].isCurrentAccount = true
    }
  }, [isExpensesOpen]) */

  useEffect(() => {
    const localAccounts = localStorage.getItem("accounts");
    if (localAccounts) {
      setAccounts(JSON.parse(localAccounts));
    }
  }, []);

  useEffect(() => {
    if (accounts.length > 0) {
      const loggedInAccount = accounts.find((account) => account.isLoggedIn);
      setCurrentUser(loggedInAccount);
      localStorage.setItem("accounts", JSON.stringify(accounts));
    }
  }, [accounts, currentUser]);

  return (
    <div className="BudgetAppContainer">
      <AccountContainer
        setCurrentUser={setCurrentUser}
        currentUser={currentUser}
        accounts={accounts}
        setAccounts={setAccounts}
        currentWallet={currentWallet}
        setCurrentWallet={setCurrentWallet}
        walletBalance={walletBalance}
        setWalletBalance={setWalletBalance}
        walletList={walletList}
        setWalletList={setWalletList}
      />
      <div className="SummaryContainer">
        <BackButton />
        <Records
          setCurrentUser={setCurrentUser}
          currentUser={currentUser}
          accounts={accounts}
          setAccounts={setAccounts}
          currentWallet={currentWallet}
          setCurrentWallet={setCurrentWallet}
          walletBalance={walletBalance}
          setWalletBalance={setWalletBalance}
          walletList={walletList}
          setWalletList={setWalletList}
        />
      </div>
    </div>
  );
}

export default ExpensesDashboard;
