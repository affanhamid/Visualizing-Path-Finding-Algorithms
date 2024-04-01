import React, { useEffect } from "react";
import "./Node.css";

const Node = ({ side, start, end, keyPressed, nodeRow, nodeCol }) => {
  useEffect(() => {
    const handleMouseEnter = (e) => {
      if (keyPressed === "s") {
        start = true;
      }
    };

    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);
  return (
    <div
      className="node"
      style={{
        width: side,
        height: side,
        background: start ? "green" : end ? "red" : "white",
      }}
    ></div>
  );
};

export default Node;
