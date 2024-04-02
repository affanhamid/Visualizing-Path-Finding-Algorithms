import Visualizer from "./Components/Visualizer/Visualizer";
import "./App.css";
import { Header } from "./Components/Header/Header";
import { useState, useEffect } from "react";

function App() {
  const [moveStart, setMoveStart] = useState(false);
  const [moveEnd, setMoveEnd] = useState(false);
  const [wallMode, setWallMode] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);
  const [visualize, setVisualize] = useState(false);

  useEffect(() => {
    const handleMouseDown = (e) => {
      setMouseDown(true);
    };

    const handleMouseUp = (e) => {
      setMouseDown(false);
    };

    const handleKeyDown = (e) => {
      console.log(e.key);
      if (e.key === "s") {
        setMoveStart((moveStart) => !moveStart);
      } else if (e.key === "e") {
        setMoveEnd((moveEnd) => !moveEnd);
      } else if (e.key === "w") {
        setWallMode((wallMode) => !wallMode);
      }
    };

    document.addEventListener("mousedown", handleMouseDown, true);
    document.addEventListener("mouseup", handleMouseUp, true);
    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [document]);

  return (
    <div className="App">
      <Header
        moveStart={moveStart}
        moveEnd={moveEnd}
        wallMode={wallMode}
        setMoveStart={setMoveStart}
        setMoveEnd={setMoveEnd}
        setWallMode={setWallMode}
        setVisualize={setVisualize}
      />
      <Visualizer
        moveStart={moveStart}
        moveEnd={moveEnd}
        wallMode={wallMode}
        mouseDown={mouseDown}
        visualize={visualize}
      />
    </div>
  );
}

export default App;
