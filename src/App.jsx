import { useState, useCallback, useEffect, useRef } from "react";
import {
  getRandomPoint,
  pointToString,
  chooseSafePoint,
} from "./algorithms/helperFns";
import { Grid, Header } from "./Components";
import { createMaze } from "./algorithms/Maze Algorithms/mazeGenerator";
import findPath from "./algorithms/Path Finding Algorithms/findPath";
import "./App.css";

const nodeWidth = 30;
const height = 25;
const width = 53;

function App() {
  // Boolean variables for various events
  const [mode, setMode] = useState("");
  const [mouseState, setMouseState] = useState(0);

  // Positions for start and end nodes
  const [startPos, setStartPos] = useState(
    pointToString(getRandomPoint(width, height))
  );
  const [endPos, setEndPos] = useState(
    pointToString(getRandomPoint(width, height))
  );

  // Nodes and walls
  const [nodes, setNodes] = useState([]);
  const [walls, setWalls] = useState([]);

  const [algorithm, setAlgorithm] = useState("");
  const [allowDiagonalMoves, setAllowDiagonalMoves] = useState("");

  // Results from the path finding algorithm
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [shortestPath, setShortestPath] = useState([]);

  // Ref for the app div
  const appRef = useRef(null);

  // Creating the node data and saving to the nodes variable
  useEffect(() => {
    const temp_list = [];
    for (let y = 0; y < height; y++) {
      let row = [];
      for (let x = 0; x < width; x++) {
        row.push({
          startPos: startPos,
          endPos: endPos,
          x: x,
          y: y,
        });
      }
      temp_list.push(row);
    }
    setNodes(temp_list);
  }, [endPos, startPos]);

  // Getting the output from the path finding algorithm
  const visualizeAlgorithm = () => {
    const { visitedNodesInOrder, shortestPath } = findPath(
      nodes,
      walls,
      startPos,
      endPos,
      height,
      width,
      allowDiagonalMoves,
      algorithm
    );
    setVisitedNodes(visitedNodesInOrder);
    setShortestPath(shortestPath);
  };

  // Reseting the grid by setting all the values back to default

  const resetGrid = () => {
    setVisitedNodes([]);
    setShortestPath([]);
    setStartPos(pointToString(getRandomPoint(width, height)));
    setEndPos(pointToString(getRandomPoint(width, height)));
    setWalls([]);
  };

  /**
   * Handling events for various user key presses
   * Pressing s moves the start node to the cursor until e is pressed again
   * Pressing e moves the end node to the cursor until e is pressed again
   * Pressing w enables wall mode. Clicking on any node turns it into a wall
   * Pressing r enables erasor mode. Clicking on any wall turns it back to normal
   * @param {Event} e
   * @param {React.Component} mode
   * @returns
   */
  const handleKeyDown = (e, mode) => {
    if (["s", "e", "w", "r"].includes(e.key)) {
      return mode === e.key ? "" : e.key;
    }
  };

  return (
    <div
      className="App"
      onKeyDown={useCallback(
        (e) => {
          setMode(handleKeyDown(e, mode));
        },
        [mode]
      )}
      onMouseDown={useCallback((e) => {
        setMouseState(1);
      }, [])}
      onMouseUp={useCallback((e) => {
        setMouseState(0);
      }, [])}
      tabIndex={0}
      ref={appRef}
    >
      <Header
        mode={mode}
        visualizeAlgorithm={visualizeAlgorithm}
        resetGrid={resetGrid}
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        setAllowDiagonalMoves={setAllowDiagonalMoves}
        createMaze={(mazeType) => {
          const maze = createMaze(mazeType, width, height);
          setStartPos(chooseSafePoint(maze, width, height));
          setEndPos(chooseSafePoint(maze, width, height));
          setWalls(maze);
        }}
      />
      <Grid
        gameState={{ mode: mode, mouseState: mouseState }}
        dimensions={{ width: width, height: height, nodeWidth: nodeWidth }}
        gridInfo={{
          nodes: nodes,
          walls: walls,
          startPos: startPos,
          endPos: endPos,
        }}
        setters={{
          setStartPos: setStartPos,
          setEndPos: setEndPos,
          setWalls: setWalls,
        }}
        algorithmInfo={{
          visitedNodes: visitedNodes,
          shortestPath: shortestPath,
        }}
      />
    </div>
  );
}

export default App;
