import React from "react";
import "./Header.css";
import Toggle from "../Toggle/Toggle";

const Header = ({
  moveStart,
  moveEnd,
  wallMode,
  eraseMode,
  visualizeAlgorithm,
}) => {
  return (
    <header>
      <div className="header__top"></div>
      <div className="header__button">
        <button onClick={visualizeAlgorithm}>Visualize</button>
      </div>
      <div className="header__bottom">
        <Toggle toggleVar={moveStart} toggleMessage="Move Start Node" />
        <Toggle toggleVar={moveEnd} toggleMessage="Move End Node" />
        <Toggle toggleVar={wallMode} toggleMessage="Add Walls" />
        <Toggle toggleVar={eraseMode} toggleMessage="Remove Walls" />
      </div>
    </header>
  );
};

export default Header;
