import React, { useEffect, useRef } from "react";
import "./Node.css";
import { pointToString } from "../../algorithms/helperFns";

const Node = ({
  nodeInfo,
  gridInfo,
  gameState,
  setters,
  algorithmInfo,
  wallTimeoutIds,
  nodesTimeoutIds,
  animateNodes,
}) => {
  const nodeRef = useRef(null);
  // Setting the start or node node to the current node depending on the "mode"
  const handleMouseEnter = (e) => {
    const wallIndex = gridInfo.walls.indexOf(nodeInfo.pos);

    if (gameState.mode === "s") {
      if (wallIndex === -1) {
        setters.setStartPos(nodeInfo.pos);
      }
    } else if (gameState.mode === "e") {
      if (wallIndex === -1) {
        setters.setEndPos(nodeInfo.pos);
      }
    }
  };

  // Adding the current node position to the walls array or removing it from the array depending
  // on the mode
  const handleMouse = (e) => {
    if ((gameState.mode === "w") & gameState.mouseState) {
      setters.setWalls((walls) => {
        if (
          !gridInfo.walls.includes(nodeInfo.pos) &
          !(gridInfo.startPos === pointToString(nodeInfo.pos)) &
          !(gridInfo.endPos === pointToString(nodeInfo.pos))
        ) {
          return gridInfo.walls.concat([nodeInfo.pos]);
        } else {
          return walls;
        }
      });
    } else if ((gameState.mode === "r") & gameState.mouseState) {
      setters.setWalls((walls) => {
        if (walls.includes(nodeInfo.pos)) {
          return [
            ...walls.slice(0, walls.indexOf(nodeInfo.pos)),
            ...walls.slice(walls.indexOf(nodeInfo.pos) + 1, walls.length),
          ];
        } else {
          return walls;
        }
      });
    }
  };

  // Setting the class of the given node based on the grid information
  useEffect(() => {
    if (gridInfo.startPos === nodeInfo.pos) {
      nodeRef.current.classList.add("start");
    } else {
      nodeRef.current.classList.remove("start");
    }
    if (gridInfo.endPos === nodeInfo.pos) {
      nodeRef.current.classList.add("end");
    } else {
      nodeRef.current.classList.remove("end");
    }

    const wallIndex = gridInfo.walls.indexOf(nodeInfo.pos);
    if (wallIndex >= 0)
      if (gridInfo.shouldAnimateWalls) {
        const animateWallsTimeout = setTimeout(() => {
          nodeRef.current.classList.add("wall");
          if (wallIndex >= gridInfo.walls.length - 1) {
            setters.setShouldAnimateWalls(false);
          }
        }, 20 * wallIndex);
        wallTimeoutIds.current.push(animateWallsTimeout);
      } else {
        nodeRef.current.classList.add("wall");
      }
    else {
      nodeRef.current.classList.remove("wall");
    }

    const visitedIndex = algorithmInfo.visitedNodes
      .map((nodeString) => nodeString.split(", ").slice(0, 2).join(", "))
      .indexOf(nodeInfo.pos);

    const shortestPathIndex = algorithmInfo.shortestPath.indexOf(nodeInfo.pos);

    if (visitedIndex >= 0) {
      const visitedNodesTimeout = setTimeout(() => {
        if (
          (gridInfo.startPos !== nodeInfo.pos) &
          (gridInfo.endPos !== nodeInfo.pos)
        ) {
          nodeRef.current.classList.add(
            animateNodes ? "animated_visited" : "visited"
          );
          nodeRef.current.classList.remove(
            !animateNodes ? "animated_visited" : "visited"
          );
        }
      }, 10 * visitedIndex * animateNodes);
      nodesTimeoutIds.current.push(visitedNodesTimeout);
    } else {
      nodeRef.current.classList.remove("animated_visited");
      nodeRef.current.classList.remove("visited");
    }
    if (shortestPathIndex >= 0) {
      const shortestPathTimeout = window.setTimeout(() => {
        if (
          (gridInfo.startPos !== nodeInfo.pos) &
          (gridInfo.endPos !== nodeInfo.pos)
        ) {
          nodeRef.current.classList.add(
            animateNodes ? "animated_shortestPath" : "shortestPath"
          );
          nodeRef.current.classList.remove(
            !animateNodes ? "animated_shortestPath" : "shortestPath"
          );
        }
      }, (50 * shortestPathIndex + 10 * algorithmInfo.visitedNodes.length - 1) * animateNodes);
      nodesTimeoutIds.current.push(shortestPathTimeout);
    } else {
      nodeRef.current.classList.remove("animated_shortestPath");
      nodeRef.current.classList.remove("shortestPath");
    }
  }, [gridInfo, nodeInfo, gameState, algorithmInfo]);

  return (
    <div className="node">
      <div
        ref={nodeRef}
        style={{
          width: nodeInfo.nodeWidth,
          height: nodeInfo.nodeWidth,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouse}
        onClick={handleMouse}
      ></div>
    </div>
  );
};

export default Node;
