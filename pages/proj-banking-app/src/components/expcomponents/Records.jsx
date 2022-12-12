import React from "react";
import RecordList from "./RecordList";
import RecordSummary from "./RecordSummary";
import AddItemButton from "./AddItemButton";
import RecordsOptionButton from "./RecordsOptionButton";
import { useState } from "react";
import { useEffect } from "react";
import WalletList from "./WalletList";

function Records({
  accounts,
  setAccounts,
  currentUser,
  setCurrentUser,
  currentWallet,
  walletBalance,
  setWalletBalance,
  setCurrentWallet,
  walletList,
  setWalletlist
}) {
  const [recordList, setRecordList] = useState([]);


  const defaultOptions = [
    "Food & Drinks",
    "Shopping",
    "Housing",
    "Transportation",
    "Vehicle",
    "Life & Entertainment",
    "Communication, PC",
    "Financial Expenses",
    "Investments",
    "Income",
    "Others",
  ];
  const [dataOptions, setDataOptions] = useState(defaultOptions);

  useEffect(() => {
    if (currentUser === null) {
      setRecordList([]);
    } else if (currentWallet === null || currentWallet === undefined || currentWallet == []) {
      setRecordList([]);
    } else {
      setRecordList(currentWallet.records);
    }
  }, [accounts, currentWallet]);

  useEffect(() => {
    const valeuArr = [];
    valeuArr.push(Number(currentWallet.budget));
    recordList.map((item) => valeuArr.push(Number(item.value)));
    const sum = valeuArr.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
    setWalletBalance(sum);

  }, [recordList, accounts]);

  /* useEffect(()=> {
    if (walletList.length > 0) {
      const string = walletBalance.toString()
      
      setCurrentWallet((prevState) => {
        return {
          ...prevState,
          balance: string
        }
      })
      
      
    }
  }, [accounts])

  useEffect(()=>{
    
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
    })

    setAccounts(updatedAccounts);
  },[walletBalance]) */

  return (
    <div className="Records">
      <AddItemButton
        recordList={recordList}
        setRecordList={setRecordList}
        setCurrentUser={setCurrentUser}
        currentUser={currentUser}
        accounts={accounts}
        setAccounts={setAccounts}
        currentWallet={currentWallet}
        dataOptions={dataOptions}
        setDataOptions={setDataOptions}
      />
      <RecordsOptionButton
        setCurrentUser={setCurrentUser}
        currentUser={currentUser}
        accounts={accounts}
        setAccounts={setAccounts}
        currentWallet={currentWallet}
        recordList={recordList}
        setRecordList={setRecordList}
        dataOptions={dataOptions}
        setDataOptions={setDataOptions}
        setCurrentWallet={setCurrentWallet}
      />

      <RecordList
        recordList={recordList}
        setRecordList={setRecordList}
        setCurrentUser={setCurrentUser}
        currentUser={currentUser}
        accounts={accounts}
        setAccounts={setAccounts}
        currentWallet={currentWallet}
        dataOptions={dataOptions}
        setDataOptions={setDataOptions}
        setCurrentWallet={setCurrentWallet}
      />
      <RecordSummary
        recordList={recordList}
        setRecordList={setRecordList}
        setCurrentUser={setCurrentUser}
        currentUser={currentUser}
        accounts={accounts}
        setAccounts={setAccounts}
        currentWallet={currentWallet}
        dataOptions={dataOptions}
        setDataOptions={setDataOptions}
        walletBalance={walletBalance}
        setWalletBalance={setWalletBalance}
      />
    </div>
  );
}

export default Records;
