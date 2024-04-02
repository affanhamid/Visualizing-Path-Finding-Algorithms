import React, { useState, useEffect } from "react";
import Node from "../Node/Node";
import "./Visualizer.css";
import { djikstra } from "../../algorithms/djikstra";

const Visualizer = ({ moveStart, moveEnd, wallMode, mouseDown, visualize }) => {
  const nodeSide = 30;
  const numRows = 23;
  const numCols = 56;
  const [startPos, setStartPos] = useState([1, 1]);
  const [endPos, setEndPos] = useState([1, 3]);
  const [nodes, setNodes] = useState([]);
  const [walls, setWalls] = useState([]);

  useEffect(() => {
    const temp_list = [];
    for (let rowIdx = 1; rowIdx <= numRows; rowIdx++) {
      for (let colIdx = 1; colIdx <= numCols; colIdx++) {
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
            mouseDown={mouseDown}
            walls={walls}
            setWalls={setWalls}
          />
        );
      }
    }
    setNodes(temp_list);
  }, [startPos, endPos, moveStart, mouseDown, moveEnd]);

  useEffect(() => {
    if (visualize) {
      djikstra(nodes, startPos, endPos);
    }
  }, [visualize]);

  return (
    <div className="visualizer">
      <div
        className="visualizer__grid"
        style={{ gridTemplateColumns: `repeat(${numCols}, ${nodeSide}px)` }}
      >
        {nodes.map((Node) => Node)}
      </div>
    </div>
  );
};

export default Visualizer;
