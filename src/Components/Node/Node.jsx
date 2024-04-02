import React, { useState, useEffect } from "react";
import "./Node.css";

const Node = ({
  side,
  startPos,
  endPos,
  moveStart,
  moveEnd,
  rowIdx,
  colIdx,
  setStartPos,
  setEndPos,
  mouseDown,
  wallMode,
  walls,
  setWalls,
}) => {
  const [color, setColor] = useState("white");

  useEffect(() => {
    setColor(
      (rowIdx === startPos[0]) & (colIdx === startPos[1])
        ? "green"
        : (rowIdx === endPos[0]) & (colIdx === endPos[1])
        ? "red"
        : walls.includes(`${rowIdx}, ${colIdx}`)
        ? "black"
        : "white"
    );
  }, [walls, startPos, endPos]);
  return (
    <div
      className="node"
      style={{
        width: side,
        height: side,
        background: color,
      }}
      onMouseEnter={(e) => {
        if (moveStart) {
          setStartPos([rowIdx, colIdx]);
        } else if (moveEnd) {
          setEndPos([rowIdx, colIdx]);
        }
      }}
      onMouseMove={(e) => {
        if (wallMode & mouseDown) {
          setColor("black");
          setWalls((walls) => {
            if (!walls.includes(`${rowIdx}, ${colIdx}`)) {
              return walls.concat([`${rowIdx}, ${colIdx}`]);
            } else {
              return walls;
            }
          });
        }
      }}
    ></div>
  );
};

export default Node;
