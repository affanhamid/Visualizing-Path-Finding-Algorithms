import React, { useEffect, useRef } from "react";
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
  eraseMode,
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
  const nodeRef = useRef(null);

  useEffect(() => {
    const animateNode = (nodeArray, className, speed) => {
      const index = nodeArray
        .map((node) => node.split(", ").slice(0, 2).join(", "))
        .indexOf(`${rowIdx}, ${colIdx}`);

      if (index > 0) {
        const distance = parseInt(
          nodeArray[index].split(", ")[nodeArray[index].split(", ").length - 1]
        );
        setTimeout(() => {
          nodeRef.current.classList.add(className);
          if (index === nodeArray.length - 1) setAnimatedVisitedNodes(true);
        }, distance * speed);
      }
    };
    if (visualize & (visitedNodes.length !== 0)) {
      animateNode(visitedNodes, "visited", 100);

      if (animatedVisitedNodes & (shortestPath.length !== 0)) {
        animateNode(shortestPath, "shortestPath", 50);
      }
    } else {
      nodeRef.current.classList.remove("visited");
      nodeRef.current.classList.remove("shortestPath");
    }
  }, [
    visualize,
    rowIdx,
    colIdx,
    visitedNodes,
    setAnimatedVisitedNodes,
    animatedVisitedNodes,
    shortestPath,
  ]);

  useEffect(() => {
    if (animateWalls) {
      const wallIndex = walls.indexOf(`${rowIdx}, ${colIdx}`);
      if (wallIndex >= 0) {
        setTimeout(() => {
          nodeRef.current.classList.add("wall");
          if (wallIndex === walls.length - 1) {
            setAnimateWalls(false);
          }
        }, wallIndex * 50);
      }
    }
  }, [animateWalls, colIdx, rowIdx, walls, setAnimateWalls]);

  const handleMouseEnter = (e) => {
    if (moveStart) {
      setStartPos([rowIdx, colIdx]);
    } else if (moveEnd) {
      setEndPos([rowIdx, colIdx]);
    }
  };

  const handleMouse = (e) => {
    if (wallMode & mouseDown) {
      setWalls((walls) => {
        if (
          !walls.includes(`${rowIdx}, ${colIdx}`) &
          !((startPos[0] === rowIdx) & (startPos[1] === colIdx)) &
          !((endPos[0] === rowIdx) & (endPos[1] === colIdx))
        ) {
          return walls.concat([`${rowIdx}, ${colIdx}`]);
        } else {
          return walls;
        }
      });
    } else if (eraseMode & mouseDown) {
      setWalls((walls) => {
        if (walls.includes(`${rowIdx}, ${colIdx}`)) {
          return [
            ...walls.slice(0, walls.indexOf(`${rowIdx}, ${colIdx}`)),
            ...walls.slice(
              walls.indexOf(`${rowIdx}, ${colIdx}`) + 1,
              walls.length
            ),
          ];
        } else {
          return walls;
        }
      });
    }
  };

  useEffect(() => {
    if ((rowIdx === startPos[0]) & (colIdx === startPos[1]))
      nodeRef.current.classList.add("start");
    else {
      nodeRef.current.classList.remove("start");
    }
    if ((rowIdx === endPos[0]) & (colIdx === endPos[1]))
      nodeRef.current.classList.add("end");
    else {
      nodeRef.current.classList.remove("end");
    }
    if (walls.includes(`${rowIdx}, ${colIdx}`) & !animateWalls)
      nodeRef.current.classList.add("wall");
    else {
      nodeRef.current.classList.remove("wall");
    }
  }, [walls, startPos, endPos, colIdx, rowIdx, animateWalls]);

  return (
    <div
      className="node"
      ref={nodeRef}
      style={{
        width: side,
        height: side,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouse}
      onClick={handleMouse}
    >
      {`${rowIdx}, ${colIdx}`}
    </div>
  );
};

export default Node;
