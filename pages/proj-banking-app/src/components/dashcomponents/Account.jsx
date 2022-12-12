import React from 'react'
import { useEffect, useState } from 'react';
import CardLogo from '../assets/mastercardlogo.png'


function Account(props) {
  const {currentUser} = props;

   const [user, setUser] = useState(null);
  useEffect(()=>{

    const user = JSON.parse(localStorage.getItem('accounts'));
    if(user){
      setUser(user);
    }
  }, []); 
  
if(!currentUser){
  return null;
} 

    return (
      <div className='accountContainer'>
        <div className="accountBox">
          <div className="cardContainer">
            <div className="balanceContainer">
              <span>₱</span>{currentUser.balance}
            </div>
            <div className ="cardNumberContainer">
              <div className="cardNumber">
                {currentUser.accountNumber}
              </div>
              <div className ="cardExpiration">
                {currentUser.expiration}
              </div>
            </div>
             <div className="cardLogo">
                <img src={CardLogo} alt="" />
              </div>
          </div>
        </div>
      </div>
    )
}

export default Account;
