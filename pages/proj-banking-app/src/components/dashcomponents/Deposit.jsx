import React from 'react'
import DepositModal from './DepositModal'
import deposit from '../assets/deposit.png'
import { useState } from 'react';




function Deposit(props) {
    const {setCurrentUser, currentUser, accounts, setAccounts} = props;
  
    const [isDepositOpen, setIsDepositOpen] = useState(false);

    //opening modal function
    function OpenDepositModal(){
      setIsDepositOpen(true);
    }


    

  return (
    <div>
        <div className="depositBox" onClick ={OpenDepositModal}>
            <img src ={deposit} alt="deposit logo" className='depositLogo'></img>
            <h2>Deposit</h2>
        </div>
        {isDepositOpen && <DepositModal setCurrentUser ={setCurrentUser} currentUser = {currentUser} setIsDepositOpen={setIsDepositOpen} accounts = {accounts} setAccounts = {setAccounts}/>}
        
    </div>
  )
}

export default Deposit
