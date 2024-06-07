import React from "react";
import "./DropDown.css";

const DropDown = ({ options, handleChange, dropDownRef }) => {
  return (
    <div className="dropDown">
      <select name="dropDown" onChange={handleChange} ref={dropDownRef}>
        {options.map((option, idx) => (
          <option
            value={option}
            key={idx}
            disabled={idx === 0}
            selected={idx === 0}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
