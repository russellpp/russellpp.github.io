import React from 'react'
import WithdrawModal from './WithdrawModal'
import withdraw from '../assets/withdraw.png'
import { useState } from 'react';




function Withdraw(props) {
    const {setCurrentUser, currentUser, accounts, setAccounts} = props;
    
    const [isOpen, setIsOpen] = useState(false);

    //opening modal function
    function OpenWithdrawModal(){
      setIsOpen(true);
    }
    

  return (
    <div>
        <div className="withdrawBox" onClick ={OpenWithdrawModal}>
            <img src={withdraw} alt="withdraw logo" className='withdrawLogo'></img>
            <h2>Withdraw</h2>
        </div>
        {isOpen && <WithdrawModal setCurrentUser ={setCurrentUser} currentUser ={currentUser} accounts = {accounts} setAccounts = {setAccounts} setIsOpen={setIsOpen}/>}
    </div>
  )
}

export default Withdraw
