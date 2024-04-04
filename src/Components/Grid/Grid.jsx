import React from "react";
import Node from "../Node/Node";
import "./Grid.css";

const Grid = ({
  moveStart,
  moveEnd,
  wallMode,
  mouseDown,
  eraseMode,
  numCols,
  nodeSide,
  nodes,
  setStartPos,
  setEndPos,
  walls,
  setWalls,
  visitedNodes,
  shortestPath,
  visualize,
  animatedVisitedNodes,
  setAnimatedVisitedNodes,
  animateWalls,
  setAnimateWalls,
}) => {
  return (
    <div className="visualizer__gridContainer">
      <div
        className="visualizer__grid"
        style={{ gridTemplateColumns: `repeat(${numCols}, ${nodeSide}px)` }}
      >
        {nodes.map((node) => (
          <Node
            side={node.nodeSide}
            startPos={node.startPos}
            endPos={node.endPos}
            rowIdx={node.rowIdx}
            colIdx={node.colIdx}
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
            animateWalls={animateWalls}
            setAnimateWalls={setAnimateWalls}
          />
        ))}
      </div>
    </div>
  );
};

export default Grid;
