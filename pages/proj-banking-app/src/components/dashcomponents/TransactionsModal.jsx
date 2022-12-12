import React from 'react'
import {useState} from 'react';

function TransactionsModal({setIsTransactionsOpen, currentUser}) {

  const [isDeposit, setIsDeposit] = useState(false);

  function CloseTransactionsModal(){
    setIsTransactionsOpen(false);
  }

  const listTransactions = currentUser.transactions;

/*   
  {listTransactions.map((list) => (
    <li>{list.date}</li> ))} */
/*   <li>{list.date} || {list.type} || {list.amount} || {list.balance}</li>
 */



  return (
     <div className = "transactionsModal">
        <div className="transactionsModalContent">
            <div className="transactionsModalHeader">
                <h4 className='transactionsModalTitle'>Transactions</h4>
            </div>
            <div className="transactionsModalBody">
            {listTransactions.map((list) =>
            (
              <>  
              <div className='transactionsContainer'>
                <div className='transactionsBodyLeft'>
                  <div className='transactionsDate'>{list.date}</div>
                  <div className='transactionsType'>{list.type}</div>
                </div>
                <div className='transactionsBodyRight'>
                  <div className='transactionsBalance'>Balance: {list.balance}</div>
                  <div className='transactionsAmount'>PHP {list.amount}</div>
                </div>
              </div>
              </>
              ))} 
            </div>
            <div className="transactionsModalFooter">
              <button className="transactionsCancelButton" onClick={CloseTransactionsModal}>Close</button>
            </div>
        </div>  
    </div>
  )
}

export default TransactionsModal
