import React, { useState, useEffect } from "react";
import Node from "../Node/Node";
import "./Visualizer.css";

const Visualizer = () => {
  const nodeSide = 30;
  const numRows = 23;
  const numCols = 56;
  const [start_row, start_col] = [1, 1];
  const [end_row, end_col] = [20, 35];
  const [nodes, setNodes] = useState([]);
  const [keyPressed, setKeyPressed] = useState("");

  useEffect(() => {
    const temp_list = [];
    for (let row_idx = 1; row_idx <= numRows; row_idx++) {
      for (let col_idx = 1; col_idx <= numCols; col_idx++) {
        temp_list.push(
          <Node
            side={nodeSide}
            start={
              (row_idx === start_row) & (col_idx === start_col) ? true : false
            }
            end={(row_idx === end_row) & (col_idx === end_col) ? true : false}
            nodeRow={row_idx}
            nodeCol={col_idx}
            keyPressed={keyPressed}
          />
        );
      }
    }
    setNodes(temp_list);
  }, [start_row, start_col, end_row, end_col]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;
      setKeyPressed(key);
    };
    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handleKeyUp = (e) => {
      setKeyPressed("");
    };
    document.addEventListener("keyup", handleKeyUp, true);

    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

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
