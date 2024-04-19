import React from "react";
import "./Header.css";
import DropDown from "../DropDown/DropDown";

export const Header = ({
  mode,
  algorithm,
  setAlgorithm,
  setAllowDiagonalMoves,
  visualizeAlgorithm,
  resetGrid,
  createMaze,
}) => {
  // Function to handle the selection of maze in the dropdown
  const handleMazeChange = (e) => {
    createMaze(e.target.value);
  };
  const handleAlgorithmChange = (e) => {
    setAlgorithm(e.target.value);
  };

  const handleAllowDiagonal = (e) => {
    setAllowDiagonalMoves(e.target.checked);
  };
  return (
    <header>
      <div className="header__left">
        <div>Cursor Mode:</div>
        <div>
          {mode === "s"
            ? "Moving Start Node"
            : mode === "e"
            ? "Moving End Node"
            : mode === "w"
            ? "Creating Walls Mode"
            : mode === "r"
            ? "Eraser Mode"
            : "None Selected"}
        </div>
      </div>
      <div className="header__button">
        <button onClick={visualizeAlgorithm}>
          Visualize {algorithm} Algorithm
        </button>
      </div>
      <div className="header__right">
        <DropDown
          name="Mazes"
          options={[
            "Select Maze",
            "Recursive Division Maze",
            "Recursive Division Maze (horizontal skew)",
            "Recursive Division Maze (vertical skew)",
            "Random Maze (Sparse)",
            "Random Maze (Dense)",
          ]}
          handleChange={handleMazeChange}
        />
        <DropDown
          name="Algorithms"
          options={[
            "Select Algorithm",
            "Djikstra's",
            "A*",
            "Greedy Best-First Search",
            "Breadth-First Search",
            "Depth-First Search",
          ]}
          handleChange={handleAlgorithmChange}
        />
        <div>
          <label htmlFor="allowDiagonalMoves">Allow Diagonal Moves:</label>
          <input type="checkbox" onChange={handleAllowDiagonal} />
        </div>
        <button onClick={resetGrid}>Reset Grid</button>
      </div>
    </header>
  );
};
