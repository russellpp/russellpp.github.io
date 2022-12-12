import React from "react";
import imgBack from "../assets/back-solid.svg";
import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  }

  return (
    <button className="BackButton" onClick={handleBack}>
      <img src={imgBack} alt="back-icon" />
    </button>
  )
}

export default BackButton;
