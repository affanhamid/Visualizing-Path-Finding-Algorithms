import React from "react";
import Node from "../Node/Node";
import "./Grid.css";
import { pointToString } from "../../algorithms/helperFns";

export const Grid = ({
  gameState,
  dimensions,
  gridInfo,
  setters,
  algorithmInfo,
  wallTimeoutIds,
  nodesTimeoutIds,
  animateNodes,
}) => {
  return (
    <div className="visualizer__gridContainer">
      <div
        className="visualizer__grid"
        style={{
          gridTemplateColumns: `repeat(${dimensions.width}, ${dimensions.nodeWidth}px)`,
        }}
      >
        {gridInfo.nodes.flat().map((node, idx) => (
          <Node
            key={idx}
            nodeInfo={{
              nodeWidth: dimensions.nodeWidth,
              pos: pointToString({ x: node.x, y: node.y }),
            }}
            gridInfo={gridInfo}
            gameState={gameState}
            setters={setters}
            algorithmInfo={algorithmInfo}
            wallTimeoutIds={wallTimeoutIds}
            nodesTimeoutIds={nodesTimeoutIds}
            animateNodes={animateNodes}
          />
        ))}
      </div>
    </div>
  );
};
