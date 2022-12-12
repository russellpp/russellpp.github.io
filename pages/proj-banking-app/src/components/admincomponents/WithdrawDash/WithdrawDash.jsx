import React from "react";
import ListBox from "./ListBox/ListBox";
import "./WithdrawDash.css";
import { useState, useRef } from "react";
import AccountEditor from "./AccountEditor/AccountEditor";

function WithdrawDash({ accounts, setAccounts }) {
  const [selectedWithdrawAccount, setSelectedWithdrawAccount] = useState(accounts[0]);
  const formRef = useRef()


  return (
    <div className="AdminDashContainer">
      <div className="AdminDashHeader">
        <span>Withdraw</span>
      </div>
      <div className="AdminDashBody">
        <div className="AccountListWrapper">
          <div className="SearchBarContainer"><span>user accounts</span></div>
          <div className="ListBoxWrapper">
            <ListBox
              accounts={accounts}
              setAccounts={setAccounts}
              selectedWithdrawAccount={selectedWithdrawAccount}
              setSelectedWithdrawAccount={setSelectedWithdrawAccount}
              formRef={formRef}
            />
          </div>
        </div>
        <AccountEditor
          accounts={accounts}
          setAccounts={setAccounts}
          selectedWithdrawAccount={selectedWithdrawAccount}
          formRef={formRef}
          setSelectedWithdrawAccount={setSelectedWithdrawAccount}
        />
      </div>
      <div className="AdminDashFooter"><span>totally secure bank</span></div>
    </div>
  );
}

export default WithdrawDash;
