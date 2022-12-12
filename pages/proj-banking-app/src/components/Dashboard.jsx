import React from "react";
import Account from "./dashcomponents/Account";
import logo from "./assets/logo.png";
import logout from "./assets/logout.png";
/* import Transactions from './dashcomponents/Transactions' */
import Deposit from './dashcomponents/Deposit'
import Withdraw from './dashcomponents/Withdraw'
import Transactions from './dashcomponents/Transactions'
import Send from './dashcomponents/Send'
import Expenses from './dashcomponents/Expenses'
import {useState} from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useIdleTimer } from 'react-idle-timer'


function Dashboard() {
  const [currentUser, setCurrentUser] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const localAccounts = localStorage.getItem("accounts");
    if (localAccounts) {
      setAccounts(JSON.parse(localAccounts));
    }
 
   
    /* const onIdle = () =>{
      console.log('User Inactive')
    }
    const onActive =()=>{
      console.log('User Active')
    }

    const{isIdle} = useIdleTimer({
      onIdle,onActive,timeout:5*1000
    }) */},[])

  useEffect(() => {
    if (accounts.length > 0) {
      const loggedInAccount = accounts.find((account) => account.isLoggedIn);
      setCurrentUser(loggedInAccount);
      localStorage.setItem("accounts", JSON.stringify(accounts));
    }
  }, [accounts, currentUser]);

  const logOut = () => {
    const updatedAccount = {
      ...currentUser,
      isLoggedIn: false,
    };

    const updatedAccounts = accounts.map((account) => {
      if (account.email === currentUser.email) {
        return updatedAccount;
      } else {
        return account;
      }
    });
    setAccounts(updatedAccounts);
    navigate(-1);
  };

  return (
      <div className="dashboardBox" /* onIdle={isIdle} */>
        <nav className="dashboardNav">
            <img src ={logo} alt="logo" className="logo"/>
            <h1>Bank</h1>
            <div className='logoutButton'><img src = {logout} alt="logout" onClick={logOut} /></div>
        </nav>
        <div className="main">
            <div className='account'>
              <Account currentUser = {currentUser} accounts = {accounts} />
            </div>
            
            <div className='buttonContainer'>
              <Deposit setCurrentUser = {setCurrentUser} currentUser = {currentUser} accounts = {accounts} setAccounts = {setAccounts}/>
              <Withdraw setCurrentUser = {setCurrentUser} currentUser = {currentUser} accounts = {accounts} setAccounts = {setAccounts}/>
              <Send setCurrentUser = {setCurrentUser} currentUser = {currentUser} accounts = {accounts} setAccounts = {setAccounts}/>
              <Expenses/>
            </div>
            <div className='transaction'>
               <Transactions currentUser = {currentUser}/> 
            </div>
         </div>
      </div> 
  )
  }

export default Dashboard;
