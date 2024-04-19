import { pointToString, stringToPoint } from "../helperFns";
import {
  get4WayNeighbors,
  get8WayNeighbors,
  getNodesInShortestPath,
} from "./pathFindingHelpers";

/**
 * Djikstra's algorithm. It works by setting the "distance" attribute of each node to be Infinity.
 * Then the start node's distance is set to 0.
 * Then the neighbors (Top node, bottom node, left node, right node) of the start node are found
 * All of the neighbors of the start node are then set to a distance of 1.
 * Then the neighbors of the neighbors are found. The distance of these neighbors is then set to be 1+1
 * Then this is repeated until one of the neighbors found is the end node.
 *
 * @param {Array<Object>} nodes The node array present in the Grid component
 * @param {Array<String>} walls The array of the coordinates of all wall nodes stored as a string
 * @param {String} startPosString The position of the start node
 * @param {String} endPosString The position of the end or the target node
 * @param {Number} height Height of the grid
 * @param {Number} width Width of the grid
 * @returns
 */
export const greedyBFS = (
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

  // Setting the starting node's distance to 0
  startNode.distance = 0;

  // Since the gird array is a 2d array, it will be a hassle to work with. So we flatten it to be 1d
  const unvistedNodes = grid.flat();

  // This is the overall condition for the algorithm. If the unvisistedNodes array has length 0
  // Then that means that we have visited every possible node and we should stop the algorithm
  while (!!unvistedNodes.length) {
    // Sorting the unvisitedNodes based on distance. For the very first run, since every node has
    // a distance of Infinity and the starting node has a distance of 0. The start node will be
    // taken out as the closestNode. Then after the neighbors of the starting node are found,
    // its neighhbors will be taken out and so forth.
    unvistedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
    const closestNode = unvistedNodes.shift();

    // If the cloestNode is a wall, then ignore it
    if (closestNode.isWall) continue;

    setVisitedNodes(
      visitedNodesInOrder.map(
        (node) => `${pointToString({ x: node.x, y: node.y })}, ${node.distance}`
      )
    );
    setShortestPath(
      getNodesInShortestPath(closestNode).map((node) =>
        pointToString({ x: node.x, y: node.y })
      )
    );

    // If the closest node has a distance of Infinity, this means that our algorithm has reached
    // a deadend. Since the closest node is often the neighbor of another visited nodes, it can't
    // have an infinite distance. If it does, then that means that it isn't the neighbor of any
    // of the visited nodes. This means that this node is unreachable from the starting point.
    if (closestNode.distance === Infinity) {
      return;
    }

    // Since we have visited the node, set its visited attribute to true and push it to the
    // visitedNodesInOrder array
    closestNode.visited = true;
    visitedNodesInOrder.push(closestNode);

    // If the closest node is the end node, then our job is done and we have found the end node.
    if (closestNode === endNode) {
      return;
    }

    // This updates the distance of the top, bottom, left, and right nodes of the closestNode
    // to be 1 plus the distance of the cloest node. If the closest node is the starting node,
    // then its neighbors will have a distance of 0+1 = 1.
    // If the closest node has a distance of for example 5 from the starting node, then its
    // neighbors will have a distance of 5+1 = 6.
    updateUnvisitedNeighbors(
      closestNode,
      grid,
      height,
      width,
      endNode,
      allowDiagonalMoves
    );
  }
};

const createGrid = (nodes, walls, startPos, endPos, shouldSetDistance) => {
  const grid = nodes;
  // The isWall attribute of each node is set to false. This will later be updated in the next loop
  // Doing it this way is slightly faster than checking the walls array for each iteration.
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      grid[y][x].isWall = false;
      grid[y][x].distance = Infinity;
    }
  }

  walls.forEach((wallNode) => {
    const wallNodePos = stringToPoint(wallNode);
    grid[wallNodePos[1]][wallNodePos[0]].isWall = true;
  });

  const startNode = grid[startPos[1]][startPos[0]];
  const endNode = grid[endPos[1]][endPos[0]];

  return { grid: grid, startNode: startNode, endNode: endNode };
};

/**
 * Setting the distance of each of the neighbors to be 1 plus the distance of the given node
 * Also setting the prevNode attribute of each of the neighbors to the given node.
 * The prevNode attribute will help determine the shortest path.
 *
 * @param {Object} node
 * @param {Array<Array>} grid
 * @param {Number} height
 * @param {Number} width
 */
const updateUnvisitedNeighbors = (
  node,
  grid,
  height,
  width,
  endNode,
  allowDiagonalMoves
) => {
  const neighbors = allowDiagonalMoves
    ? get8WayNeighbors(node, grid, height, width)
    : get4WayNeighbors(node, grid, height, width);
  neighbors.forEach((neighbor) => {
    if (neighbor.distance === Infinity) {
      neighbor.distance = manhattenDistance(neighbor, endNode);
      neighbor.prevNode = node;
    }
  });
};

const manhattenDistance = (pointA, pointB) => {
  return Math.abs(pointA.x - pointB.x) + Math.abs(pointA.y - pointB.y);
};
