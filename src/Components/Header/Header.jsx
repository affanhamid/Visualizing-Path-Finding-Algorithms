import React, { useRef } from "react";
import "./Header.css";
import DropDown from "../DropDown/DropDown";
import { NodeType } from "../Modal/Modal";

export const Header = ({
  mode,
  algorithm,
  setAlgorithm,
  setAllowDiagonalMoves,
  visualizeAlgorithm,
  resetGrid,
  createMaze,
  setAnimateNodes,
}) => {
  const diagonalMovesRef = useRef(null);
  const algRef = useRef(null);
  const mazeRef = useRef(null);
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
        <div className="header_legend">
          <div>
            <NodeType type="start" text="Start Node" />
          </div>
          <div>
            <NodeType type="end" text="End Node" />
          </div>
          <div>
            <NodeType type="visited" text="Visited Node" />
          </div>
          <div>
            <NodeType type="shortestPath" text="Shortest Path" />
          </div>
        </div>
      </div>
      <div className="header__button">
        <button
          onClick={() => {
            setAnimateNodes(1);
            visualizeAlgorithm();
          }}
        >
          {algorithm !== "" ? (
            <span>
              Visualize <b>{algorithm}</b>
            </span>
          ) : (
            "Select an Algorithm"
          )}
        </button>
      </div>
      <div className="header__right">
        <div className="header__modeSelector">
          <div
            style={{
              color:
                mode === "s"
                  ? "var(--shortest-path)"
                  : mode === "e"
                  ? "var(--end-color)"
                  : "",
            }}
          >
            <span>Mode:</span>
            {mode === "s"
              ? "Moving Start"
              : mode === "e"
              ? "Moving End"
              : mode === "w"
              ? "Creating Walls"
              : mode === "r"
              ? "Eraser"
              : "None Selected"}
          </div>
        </div>
        <div>
          <button
            onClick={() => {
              diagonalMovesRef.current.checked = false;
              setAllowDiagonalMoves(false);
              algRef.current.selectedIndex = 0;
              mazeRef.current.selectedIndex = 0;
              setAlgorithm("");
              resetGrid();
            }}
          >
            Reset Grid
          </button>
        </div>
        <div>
          <DropDown
            options={[
              "Select Maze",
              "Recursive Division Maze",
              "Recursive Division Maze (horizontal skew)",
              "Recursive Division Maze (vertical skew)",
              "Random Maze (Sparse)",
              "Random Maze (Dense)",
            ]}
            handleChange={handleMazeChange}
            dropDownRef={mazeRef}
          />
          <DropDown
            options={[
              "Select Algorithm",
              "Djikstra's",
              "A*",
              "Greedy Best-First Search",
              "Breadth-First Search",
              "Depth-First Search",
            ]}
            handleChange={handleAlgorithmChange}
            dropDownRef={algRef}
          />
          <div className="checkBoxInput">
            <label htmlFor="allowDiagonalMoves">Allow Diagonal Moves:</label>
            <input
              ref={diagonalMovesRef}
              type="checkbox"
              onChange={handleAllowDiagonal}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
