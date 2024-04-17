import { pointToString, stringToPoint } from "../helperFns";
import { get6WayNeighbors, getNodesInShortestPath } from "./pathFindingHelpers";

export const astar = (
  nodes,
  walls,
  startPosString,
  endPosString,
  height,
  width
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

  while (open.length > 0) {
    open.sort(
      (nodeA, nodeB) =>
        calcFCost(nodeA) - calcFCost(nodeB) || nodeA.gCost - nodeB.gCost
    );

    const currentNode = open.shift();

    if (currentNode === endNode) {
      return {
        visitedNodesInOrder: closed,
        shortestPath: getNodesInShortestPath(endNode).map((node) =>
          pointToString({ x: node.x, y: node.y })
        ),
      };
    }
    const neighbors = get6WayNeighbors(
      currentNode,
      grid,
      height,
      width,
      closed
    ).filter((neighbor) => !neighbor.isWall & !closed.includes(neighbor));

    neighbors.forEach((neighbor) => {
      const newMovementCostToNeighbor =
        currentNode.gCost + getDistance(currentNode, neighbor);

      if (
        newMovementCostToNeighbor < neighbor.gCost ||
        !open.includes(neighbor)
      ) {
        neighbor.gCost = newMovementCostToNeighbor;
        neighbor.hCost = getDistance(neighbor, endNode);
        neighbor.fCost = calcFCost(neighbor);
        neighbor.prevNode = currentNode;

        if (!open.includes(neighbor)) open.push(neighbor);
      }
    });
  }
};

const createGrid = (nodes, walls, startPos, endPos, shouldSetDistance) => {
  const grid = nodes;
  // The isWall attribute of each node is set to false. This will later be updated in the next loop
  // Doing it this way is slightly faster than checking the walls array for each iteration.
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      grid[y][x].isWall = false;
      grid[y][x].gCost = 0;
      grid[y][x].hCost = 0;
      grid[y][x].prevNode = null;
      grid[y][x].isWall = null;
      grid[y][x].djikstraDistance = null;
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
