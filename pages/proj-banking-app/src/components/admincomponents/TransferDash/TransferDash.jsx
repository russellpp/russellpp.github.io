import React from "react";
import ListBox from "./ListBox/ListBox";
import "./TransferDash.css";
import { useState, useRef } from "react";
import AccountEditor from "./AccountEditor/AccountEditor";

function TransferDash({ accounts, setAccounts }) {
  const [selectedTransferAccount, setSelectedTransferAccount] = useState(accounts[0]);
  const formRef = useRef()


  return (
    <div className="AdminDashContainer">
      <div className="AdminDashHeader">
        <span>Transfer</span>
      </div>
      <div className="AdminDashBody">
        <div className="AccountListWrapper">
          <div className="SearchBarContainer"><span>user accounts</span></div>
          <div className="ListBoxWrapper">
            <ListBox
              accounts={accounts}
              setAccounts={setAccounts}
              selectedTransferAccount={selectedTransferAccount}
              setSelectedTransferAccount={setSelectedTransferAccount}
              formRef={formRef}
            />
          </div>
        </div>
        <AccountEditor
          accounts={accounts}
          setAccounts={setAccounts}
          selectedTransferAccount={selectedTransferAccount}
          formRef={formRef}
          setSelectedTransferAccount={setSelectedTransferAccount}
        />
      </div>
      <div className="AdminDashFooter"><span>totally secure Bank</span></div>
    </div>
  );
}

export default TransferDash;
