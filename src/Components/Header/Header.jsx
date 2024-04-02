import React from "react";
import "./Header.css";
import DropDown from "../../DropDown/DropDown";

const Header = ({
  moveStart,
  moveEnd,
  wallMode,
  eraseMode,
  visualizeAlgorithm,
  resetGrid,
  createMaze,
}) => {
  const handleMazeChange = (e) => {
    createMaze(e.target.value);
  };
  return (
    <header>
      <div className="header__left">
        <div>Cursor Mode:</div>
        <div>
          {moveStart
            ? "Moving Start Node"
            : moveEnd
            ? "Moving End Node"
            : wallMode
            ? "Creating Walls Mode"
            : eraseMode
            ? "Eraser Mode"
            : "None Selected"}
        </div>
      </div>
      <div className="header__button">
        <button onClick={visualizeAlgorithm}>Visualize Algorithm</button>
      </div>
      <div className="header__right">
        <DropDown
          name="Mazes"
          options={[
            "Select Maze",
            "Procedural Maze",
            "Random Maze (Sparse)",
            "Random Maze (Dense)",
          ]}
          handleChange={handleMazeChange}
        />
        <button onClick={resetGrid}>Reset Grid</button>
      </div>
    </header>
  );
};

export default Header;
