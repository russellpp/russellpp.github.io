import React from "react";
import Sidebar from "./admincomponents/Sidebar/Sidebar";
import ManageUsers from "./admincomponents/ManageUsers/ManageUsers";
import CreateDash from "./admincomponents/CreateDash/CreateDash";
import DepositDash from "./admincomponents/DepositDash/DepositDash";
import TransferDash from "./admincomponents/TransferDash/TransferDash";
import WithdrawDash from "./admincomponents/WithdrawDash/WithdrawDash";
import "./admindashboard.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function AdminDashboard() {
  const [accounts, setAccounts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

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

  const [dashState, setDashState] = useState({
    main: true,
    deposit: false,
    withdraw: false,
    transfer: false,
    create: false,
  });

  return (
    <div className="adminDashboard">
      <div className="sideBar">
        <Sidebar
          dashState={dashState}
          setDashState={setDashState}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          accounts={accounts}
          setAccounts={setAccounts}
        />
      </div>
      <div className="adminContent">
        {dashState.main && (
          <ManageUsers accounts={accounts} setAccounts={setAccounts} />
        )}
        {dashState.create && (
          <CreateDash accounts={accounts} setAccounts={setAccounts} />
        )}
        {dashState.deposit && (
          <DepositDash accounts={accounts} setAccounts={setAccounts} />
        )}
        {dashState.withdraw && (
          <WithdrawDash accounts={accounts} setAccounts={setAccounts} />
        )}
        {dashState.transfer && (
          <TransferDash accounts={accounts} setAccounts={setAccounts} />
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
