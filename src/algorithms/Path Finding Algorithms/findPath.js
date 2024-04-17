import { djikstra } from "./djikstra";
import { astar } from "./astar";
import { greedyBFS } from "./greedyBestFirstSearch";
const findPath = (
  nodes,
  walls,
  startPos,
  endPos,
  height,
  width,
  allowDiagonalMoves,
  algorithm
) => {
  if (algorithm === "Djikstra's") {
    return djikstra(
      nodes,
      walls,
      startPos,
      endPos,
      height,
      width,
      allowDiagonalMoves
    );
  } else if (algorithm === "A*") {
    return astar(
      nodes,
      walls,
      startPos,
      endPos,
      height,
      width,
      allowDiagonalMoves
    );
  } else if (algorithm === "Greedy Best-First Search") {
    return greedyBFS(
      nodes,
      walls,
      startPos,
      endPos,
      height,
      width,
      allowDiagonalMoves
    );
  } else {
    alert("Select an algorithm first!");
  }
};

export default findPath;
