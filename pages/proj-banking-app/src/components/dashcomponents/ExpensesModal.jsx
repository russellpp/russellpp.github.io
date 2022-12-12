import React from 'react'






function ExpensesModal(props) {

    const {setIsExpensesOpen} = props;

    //close Modal function
    function CloseExpensesModal(){
        setIsExpensesOpen(false);
    }
  
    
 
  
    

  return (
    <div className = "expensesModal">
        <div className="expensesModalContent">
            <div className="expensesModalHeader">
                <h4 className='expensesModalTitle'>Expenses</h4>
            </div>
            <div className="expensesModalBody">
            <div className="currentBalance">Current Balance: {/* {currentUser.balance}< */}</div>
               <label htmlFor="amount">Enter amount: </label>
               <input type="number" name='amount' id='amount' autoComplete='off' autoFocus /* onChange={getValue} *//>
            </div>
            <div className="expensesModalFooter">
               {/*  <button className="depositDepositButton" onClick={DepositMoney}>Deposit</button> */}
                <button className="expensesCancelButton" onClick={CloseExpensesModal}>Cancel</button>
            </div>
        </div>  
    </div>
  )
}

export default ExpensesModal
