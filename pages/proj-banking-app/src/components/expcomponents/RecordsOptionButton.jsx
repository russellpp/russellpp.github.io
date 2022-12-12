import React from "react";
import { useState } from "react";
import imgOptions from "../assets/settings-icon.svg";
import RecordsOptionsModal from "./RecordsOptionsModal"

function RecordsOptionButton({
    recordList,
    setRecordList,
    accounts,
    setAccounts,
    currentUser,
    setCurrentUser,
    currentWallet,
    setCurrentWallet
}) {
    const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsOptionsModalOpen(true)
    }


  return (
    <div className="OptionsButtonContainer">
        <button className="AccountOptionButton" onClick={handleOpenModal}>
        <img src={imgOptions} />
        </button>
        {isOptionsModalOpen && (<RecordsOptionsModal 
        setCurrentUser={setCurrentUser}
        currentUser={currentUser}
        accounts={accounts}
        setAccounts={setAccounts}
        currentWallet={currentWallet}
        recordList={recordList}
        setRecordList={setRecordList}
        isOptionsModalOpen={isOptionsModalOpen}
        setIsOptionsModalOpen={setIsOptionsModalOpen}
        setCurrentWallet={setCurrentWallet}
        />)}

    </div>
  )
}

export default RecordsOptionButton;
