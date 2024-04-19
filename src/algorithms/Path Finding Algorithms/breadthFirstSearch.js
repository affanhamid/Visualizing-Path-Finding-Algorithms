import { pointToString, stringToPoint } from "../helperFns";
import {
  get4WayNeighbors,
  getNodesInShortestPath,
  createGrid,
  get8WayNeighbors,
} from "./pathFindingHelpers";

/**
 * @param {Array<Object>} nodes The node array present in the Grid component
 * @param {Array<String>} walls The array of the coordinates of all wall nodes stored as a string
 * @param {String} startPosString The position of the start node
 * @param {String} endPosString The position of the end or the target node
 * @param {Number} height Height of the grid
 * @param {Number} width Width of the grid
 * @returns
 */
export const BFS = (
  nodes,
  walls,
  startPosString,
  endPosString,
  height,
  width,
  allowDiagonalMoves,
  setVisitedNodes,
  setShortestPath
) => {
  const startPos = stringToPoint(startPosString);
  const endPos = stringToPoint(endPosString);

  // Creating the grid
  const { grid, startNode, endNode } = createGrid(
    nodes,
    walls,
    startPos,
    endPos,
    true
  );

  // Storing all of the nodes that were visited. This is so that we can animate all of the visited
  // nodes in order.
  const visitedNodesInOrder = [];

  const unvistedNodes = [startNode];

  // This is the overall condition for the algorithm. If the unvisistedNodes array has length 0
  // Then that means that we have visited every possible node and we should stop the algorithm

  while (!!unvistedNodes.length) {
    const firstNode = unvistedNodes.shift();

    // If the firstNode is a wall, then ignore it
    if (firstNode.isWall) continue;
    if (firstNode.visited) continue;

    // Since we have visited the node, set its visited attribute to true and push it to the
    // visitedNodesInOrder array
    firstNode.visited = true;
    visitedNodesInOrder.push(firstNode);

    setVisitedNodes(
      visitedNodesInOrder.map(
        (node) => `${pointToString({ x: node.x, y: node.y })}, ${node.distance}`
      )
    );
    setShortestPath(
      getNodesInShortestPath(firstNode).map((node) =>
        pointToString({ x: node.x, y: node.y })
      )
    );

    // If the closest node is the end node, then our job is done and we have found the end node.
    if (firstNode === endNode) {
      return;
    }

    const neighbors = allowDiagonalMoves
      ? get8WayNeighbors(firstNode, grid, height, width)
      : get4WayNeighbors(firstNode, grid, height, width);

    neighbors.forEach((neighbor) => {
      if (!neighbor.visited) {
        unvistedNodes.push(neighbor);
        neighbor.prevNode = firstNode;
      }
    });
  }
  return;
};
