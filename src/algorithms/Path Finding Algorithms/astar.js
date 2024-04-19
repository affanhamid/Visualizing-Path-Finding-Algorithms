import { pointToString, stringToPoint } from "../helperFns";
import {
  get8WayNeighbors,
  get4WayNeighbors,
  getNodesInShortestPath,
} from "./pathFindingHelpers";

export const astar = (
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
  const { grid, startNode, endNode } = createGrid(
    nodes,
    walls,
    startPos,
    endPos
  );
  const open = [];
  const closed = [];

  open.push(startNode);

  startNode.gCost = 0;

  while (!!open.length) {
    open.sort(
      (nodeA, nodeB) =>
        calcFCost(nodeA) - calcFCost(nodeB) || nodeA.gCost - nodeB.gCost
    );

    const currentNode = open.shift();

    closed.push(currentNode);
    setVisitedNodes(
      closed.map(
        (node) =>
          `${pointToString({ x: node.x, y: node.y })}, ${calcFCost(node)}`
      )
    );
    setShortestPath(
      getNodesInShortestPath(currentNode).map((node) =>
        pointToString({ x: node.x, y: node.y })
      )
    );

    if (currentNode === endNode) {
      return;
    }
    const neighbors = allowDiagonalMoves
      ? get8WayNeighbors(currentNode, grid, height, width)
      : get4WayNeighbors(currentNode, grid, height, width);

    neighbors
      .filter((neighbor) => !neighbor.isWall & !closed.includes(neighbor))
      .forEach((neighbor) => {
        const tempG = currentNode.gCost + getDistance(currentNode, neighbor);

        if (open.includes(neighbor)) {
          if (tempG < neighbor.gCost) {
            neighbor.gCost = tempG;
            neighbor.prevNode = currentNode;
          }
        } else {
          neighbor.gCost = tempG;
          open.push(neighbor);
          neighbor.prevNode = currentNode;
        }
        neighbor.hCost = getDistance(neighbor, endNode);
      });
  }
  alert("No solution");
  return;
};

const createGrid = (nodes, walls, startPos, endPos, shouldSetDistance) => {
  const grid = nodes;
  // The isWall attribute of each node is set to false. This will later be updated in the next loop
  // Doing it this way is slightly faster than checking the walls array for each iteration.
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      grid[y][x].isWall = false;
      grid[y][x].gCost = Infinity;
      grid[y][x].hCost = 0;
      grid[y][x].prevNode = null;
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
 * Given a 2d array of nodes, the createGrid function creates a 2d array of objects, setting the
 * distance of every node to Infinity and checking if the given node is a wall or not.
 * @param {Array<Object} nodes nodes array in the Grid component
 * @param {Array<String} walls array of the position of all the walls stored as strings
 * @param {String} startPos position of the starting node
 * @param {String} endPos position of the target ndoe
 * @returns {Object}
 */

const getDistance = (point1, point2) => {
  const xDist = Math.abs(point2.x - point1.x);
  const yDist = Math.abs(point2.y - point1.y);

  if (xDist > yDist) {
    return 14 * yDist + 10 * (xDist - yDist);
  } else {
    return 14 * xDist + 10 * (yDist - xDist);
  }
};

const calcFCost = (node) => {
  return node.gCost + node.hCost;
};
