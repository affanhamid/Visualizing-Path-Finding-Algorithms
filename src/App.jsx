import { useState, useCallback, useEffect, useRef } from "react";
import Grid from "./Components/Visualizer/Grid";
import Header from "./Components/Header/Header";
import Node from "./Components/Node/Node";
import djikstra from "./algorithms/Path Finding Algorithms/djikstra";
import generateRandomMaze from "./algorithms/Maze Algorithms/randomMaze";
import "./App.css";

const nodeSide = 30;
const numRows = 23;
const numCols = 56;

function App() {
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };

  const getRandomPoint = (numRows, numCols) => {
    return [getRandomInt(numRows), getRandomInt(numCols)];
  };

  const [moveStart, setMoveStart] = useState(false);
  const [moveEnd, setMoveEnd] = useState(false);
  const [wallMode, setWallMode] = useState(false);
  const [eraseMode, setEraseMode] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);
  const [startPos, setStartPos] = useState(getRandomPoint(numRows, numCols));
  const [endPos, setEndPos] = useState(getRandomPoint(numRows, numCols));
  while (endPos == startPos) {
    setEndPos(getRandomPoint(numRows, numCols));
  }
  const [nodes, setNodes] = useState([]);
  const [walls, setWalls] = useState([]);
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [shortestPath, setShortestPath] = useState([]);
  const [visualize, setVisualize] = useState(false);
  const [animatedVisitedNodes, setAnimatedVisitedNodes] = useState(false);

  const appRef = useRef(null);

  useEffect(() => {
    const temp_list = [];
    for (let rowIdx = 0; rowIdx < numRows; rowIdx++) {
      for (let colIdx = 0; colIdx < numCols; colIdx++) {
        temp_list.push(
          <Node
            side={nodeSide}
            startPos={startPos}
            endPos={endPos}
            rowIdx={rowIdx}
            colIdx={colIdx}
            moveStart={moveStart}
            moveEnd={moveEnd}
            setStartPos={setStartPos}
            setEndPos={setEndPos}
            wallMode={wallMode}
            eraseMode={eraseMode}
            mouseDown={mouseDown}
            walls={walls}
            setWalls={setWalls}
            visitedNodes={visitedNodes}
            shortestPath={shortestPath}
            visualize={visualize}
            animatedVisitedNodes={animatedVisitedNodes}
            setAnimatedVisitedNodes={setAnimatedVisitedNodes}
          />
        );
      }
    }
    setNodes(temp_list);
  }, [
    startPos,
    endPos,
    moveStart,
    mouseDown,
    moveEnd,
    wallMode,
    walls,
    eraseMode,
    shortestPath,
    visitedNodes,
    visualize,
    animatedVisitedNodes,
  ]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "s") {
      setMoveStart((moveStart) => !moveStart);
      setMoveEnd((moveEnd) => false);
      setWallMode((wallMode) => false);
      setEraseMode((eraseMode) => false);
    } else if (e.key === "e") {
      setMoveEnd((moveEnd) => !moveEnd);
      setMoveStart((moveStart) => false);
      setWallMode((wallMode) => false);
      setEraseMode((eraseMode) => false);
    } else if (e.key === "w") {
      setWallMode((wallMode) => !wallMode);
      setEraseMode((eraseMode) => false);
      setMoveStart((moveStart) => false);
      setMoveEnd((moveEnd) => false);
    } else if (e.key === "r") {
      setEraseMode((eraseMode) => !eraseMode);
      setWallMode((wallMode) => false);
      setMoveStart((moveStart) => false);
      setMoveEnd((moveEnd) => false);
    }
  }, []);

  const handleMouseDown = useCallback((e) => {
    setMouseDown((mouseDown) => true);
  }, []);

  const handleMouseUp = useCallback((e) => {
    setMouseDown((mouseDown) => false);
  }, []);

  const visualizeAlgorithm = () => {
    setVisualize(true);
    const { visitedNodesInOrder, shortestPath, success } = djikstra(
      walls,
      startPos,
      endPos,
      numRows,
      numCols
    );
    setVisitedNodes(visitedNodesInOrder);
    setShortestPath(shortestPath);
  };

  const resetGrid = () => {
    setAnimatedVisitedNodes(false);
    setVisitedNodes(false);
    setShortestPath(false);
    setStartPos(getRandomPoint(numRows, numCols));
    setEndPos(getRandomPoint(numRows, numCols));
    setWalls([]);
    setVisualize(false);
  };

  const createMaze = (mazeType) => {
    if (visualize) resetGrid();
    if (mazeType === "Random Maze (Sparse)") {
      const maze = generateRandomMaze(startPos, endPos, numRows, numCols, 0.1);
      setWalls(maze);
    } else if (mazeType === "Random Maze (Dense)") {
      const maze = generateRandomMaze(startPos, endPos, numRows, numCols, 0.3);
      console.log(
        maze.includes(startPos.join(", ")),
        maze.includes(endPos.join(", "))
      );
      setWalls(maze);
    }
  };

  return (
    <div
      className="App"
      onKeyDown={handleKeyDown}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      tabIndex={0}
      ref={appRef}
    >
      <Header
        moveStart={moveStart}
        moveEnd={moveEnd}
        wallMode={wallMode}
        eraseMode={eraseMode}
        visualizeAlgorithm={visualizeAlgorithm}
        resetGrid={resetGrid}
        createMaze={createMaze}
      />
      <Grid
        moveStart={moveStart}
        moveEnd={moveEnd}
        wallMode={wallMode}
        mouseDown={mouseDown}
        eraseMode={eraseMode}
        numCols={numCols}
        nodeSide={nodeSide}
        nodes={nodes}
      />
    </div>
  );
}

export default App;
