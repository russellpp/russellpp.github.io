import React from "react";
import transactions from "../assets/transaction.png";
import { useState } from "react";
import TransactionsModal from "./TransactionsModal";

function Transactions(props) {
  const { setCurrentUser, currentUser } = props;
  const [isTransactionsOpen, setIsTransactionsOpen] = useState(false);

  //opening modal function
  function OpenTransactionsModal() {
    setIsTransactionsOpen(true);
  }

  const listTransactions = currentUser?.transactions || [];
  

  return (
    <div>
      <div className="transactionsBox" onClick={OpenTransactionsModal}>
        <nav className="transactionsNav">
          <h2>Transactions</h2>
        </nav>
        <ul className="transactionsBody">
          {listTransactions.map((list) => (
            <li>
              <div className="transactionsContainer">
                <div className="transactionsBodyLeft">
                  <div className="transactionsDate">{list.date}</div>
                  <div className="transactionsType">{list.type}</div>
                </div>
                <div className="transactionsBodyRight">
                  <div className="transactionsBalance">
                    Balance: {list.balance}
                  </div>
                  <div className="transactionsAmount">₱ ${list.amount}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <footer className="transactionsFooter">
          <span className="clickHere">Click here for more transactions</span>
        </footer>
      </div>
      {isTransactionsOpen && (
        <TransactionsModal
          currentUser={currentUser}
          setIsTransactionsOpen={setIsTransactionsOpen}
        />
      )}
    </div>
  );
}

export default Transactions;
