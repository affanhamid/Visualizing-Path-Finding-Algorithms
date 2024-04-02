import React, { useState } from "react";
import "./Header.css";

export const Header = ({
  moveStart,
  moveEnd,
  wallMode,
  setMoveStart,
  setMoveEnd,
  setWallMode,
  setVisualize,
}) => {
  return (
    <header>
      <label htmlFor="moveStart">Move Start Node</label>
      <input
        type="checkbox"
        name="moveStart"
        id="moveStart"
        onChange={() => setMoveStart((moveStart) => !moveStart)}
        checked={moveStart}
      />

      <label htmlFor="moveEnd">Move End Node</label>
      <input
        type="checkbox"
        name="moveEnd"
        id="moveEnd"
        onChange={() => setMoveEnd((moveEnd) => !moveEnd)}
        checked={moveEnd}
      />

      <label htmlFor="wallMode">Place Walls</label>
      <input
        type="checkbox"
        name="wallMode"
        id="wallMode"
        onChange={() => setWallMode((wallMode) => !wallMode)}
        checked={wallMode}
      />

      <button onClick={setVisualize(true)}>Visualize</button>
    </header>
  );
};
