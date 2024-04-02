import React from "react";
import "./DropDown.css";

const DropDown = ({ name, options, handleChange }) => {
  return (
    <div className="dropDown">
      <label htmlFor="dropDown">{name}</label>
      <select name="dropDown" onChange={handleChange}>
        {options.map((option) => (
          <option value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
