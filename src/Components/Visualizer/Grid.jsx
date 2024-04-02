import React from "react";
import "./Grid.css";

const Grid = ({ numCols, nodeSide, nodes }) => {
  return (
    <div className="visualizer__gridContainer">
      <div
        className="visualizer__grid"
        style={{ gridTemplateColumns: `repeat(${numCols}, ${nodeSide}px)` }}
      >
        {nodes.map((Node) => Node)}
      </div>
    </div>
  );
};

export default Grid;
