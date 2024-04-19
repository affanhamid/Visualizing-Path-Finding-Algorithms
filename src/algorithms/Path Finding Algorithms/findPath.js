import { djikstra } from "./djikstra";
import { astar } from "./astar";
import { greedyBFS } from "./greedyBestFirstSearch";
import { BFS } from "./breadthFirstSearch";
import { DFS } from "./depthFirstSearch";
const findPath = (
  nodes,
  walls,
  startPos,
  endPos,
  height,
  width,
  allowDiagonalMoves,
  setVisitedNodes,
  setShortestPath,
  algorithm
) => {
  if (algorithm === "Djikstra's") {
    djikstra(
      nodes,
      walls,
      startPos,
      endPos,
      height,
      width,
      allowDiagonalMoves,
      setVisitedNodes,
      setShortestPath
    );
  } else if (algorithm === "A*") {
    astar(
      nodes,
      walls,
      startPos,
      endPos,
      height,
      width,
      allowDiagonalMoves,
      setVisitedNodes,
      setShortestPath
    );
  } else if (algorithm === "Greedy Best-First Search") {
    greedyBFS(
      nodes,
      walls,
      startPos,
      endPos,
      height,
      width,
      allowDiagonalMoves,
      setVisitedNodes,
      setShortestPath
    );
  } else if (algorithm === "Breadth-First Search") {
    BFS(
      nodes,
      walls,
      startPos,
      endPos,
      height,
      width,
      allowDiagonalMoves,
      setVisitedNodes,
      setShortestPath
    );
  } else if (algorithm === "Depth-First Search") {
    DFS(
      nodes,
      walls,
      startPos,
      endPos,
      height,
      width,
      allowDiagonalMoves,
      setVisitedNodes,
      setShortestPath
    );
  } else {
    alert("Select an algorithm first!");
  }
};

export default findPath;
