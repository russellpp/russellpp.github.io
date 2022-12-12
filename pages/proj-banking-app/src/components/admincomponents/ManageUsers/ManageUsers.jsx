import React from "react";
import ListBox from "./ListBox/ListBox";
import "./ManageUsers.css";
import { useState, useRef } from "react";
import AccountEditor from "./AccountEditor/AccountEditor";

function ManageUsers({ accounts, setAccounts }) {
  const [selectedAccount, setSelectedAccount] = useState(accounts[0]);
  const formRef = useRef()


  return (
    <div className="AdminDashContainer">
      <div className="AdminDashHeader">
        <span>Manage Accounts</span>
      </div>
      <div className="AdminDashBody">
        <div className="AccountListWrapper">
          <div className="SearchBarContainer"><span>manage user accounts</span></div>
          <div className="ListBoxWrapper">
            <ListBox
              accounts={accounts}
              setAccounts={setAccounts}
              selectedAccount={selectedAccount}
              setSelectedAccount={setSelectedAccount}
              formRef={formRef}
            />
          </div>
        </div>
        <AccountEditor
          accounts={accounts}
          setAccounts={setAccounts}
          selectedAccount={selectedAccount}
          formRef={formRef}
          setSelectedAccount={setSelectedAccount}
        />
      </div>
      <div className="AdminDashFooter"><span>totally secure bank</span></div>
    </div>
  );
}

export default ManageUsers;
