import React, { useState } from "react";
import { useEffect } from "react";
import imgDelete from "../assets/delete-icon.svg";
import imgEdit from "../assets/edit-icon.svg";
import RecordItemDeleteModal from "./RecordItemDeleteModal";
import RecordItemEditModal from "./RecordItemEditModal";
import RecordsOptionButton from "./RecordsOptionButton";

function RecordList({
  recordList,
  setRecordList,
  accounts,
  setAccounts,
  currentUser,
  setCurrentUser,
  currentWallet,
  dataOptions,
  setDataOptions,
}) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  const handleDeleteModal = (item) => {
    setSelectedItem(item);
    setIsDeleteModalOpen(true);
  };

  const handleEditModal = (item) => {
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };

  return (
    <div className="ListWrapper">
      <ul className="RecordList">
        {recordList.map((item, index) => (
          <li className="RecordItem" key={index}>
            <div className="RecordContainer">
              <span className="RecordCategory">{item.category}</span>
              <span className="RecordId">{item.id}</span>
              <span className={Number(item.value) <= 0 ? "RecordValue" : "RecordValueIncome"}>{item.value}</span>
              <span className="RecordName">{item.name}</span>
              <button onClick={() => handleEditModal({ item })}>
                <img src={imgEdit} />
              </button>
              <button onClick={() => handleDeleteModal({ item })}>
                <img src={imgDelete} />
              </button>
            </div>
          </li>
        ))}
      </ul>
      {isDeleteModalOpen && (
        <RecordItemDeleteModal
          setCurrentUser={setCurrentUser}
          currentUser={currentUser}
          accounts={accounts}
          setAccounts={setAccounts}
          currentWallet={currentWallet}
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          selectedItem={selectedItem}
          recordList={recordList}
          setRecordList={setRecordList}
          dataOptions={dataOptions}
          setDataOptions={setDataOptions}
        />
      )}
      {isEditModalOpen && (
        <RecordItemEditModal
          setCurrentUser={setCurrentUser}
          currentUser={currentUser}
          accounts={accounts}
          setAccounts={setAccounts}
          currentWallet={currentWallet}
          isEditModalOpen={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
          selectedItem={selectedItem}
          recordList={recordList}
          setRecordList={setRecordList}
          dataOptions={dataOptions}
          setDataOptions={setDataOptions}
        />
      )}
      
    </div>
  );
}

export default RecordList;
