import React from "react";
import "./Toggle.css";

const Toggle = ({ toggleVar, toggleMessage }) => {
  return (
    <div className="toggle">
      <label className={`${toggleVar ? "active" : ""}`}>{toggleMessage}</label>
    </div>
  );
};

export default Toggle;
