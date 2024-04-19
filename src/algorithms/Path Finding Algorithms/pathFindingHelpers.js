import { stringToPoint } from "../helperFns";
/**
 * Starting from the end node, use the prevNode attribute to find a node chain from the endNode
 * to the startNode.
 * @param {Object} endNode
 * @returns
 */
export const getNodesInShortestPath = (endNode) => {
  const nodesInShortestPath = [];
  let currNode = endNode;
  while (currNode != null) {
    nodesInShortestPath.unshift(currNode);
    currNode = currNode.prevNode;
  }
  return nodesInShortestPath;
};

export const createGrid = (
  nodes,
  walls,
  startPos,
  endPos,
  shouldSetDistance
) => {
  const grid = nodes;
  // The isWall attribute of each node is set to false. This will later be updated in the next loop
  // Doing it this way is slightly faster than checking the walls array for each iteration.
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      grid[y][x].isWall = false;
      grid[y][x].prevNode = null;
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
 * Getting the top, left, bottom, and right neighbors of a node
 * @param {Object} node
 * @param {Array<Array>} grid
 * @param {Number} height
 * @param {Number} width
 * @returns
 */
export const get4WayNeighbors = (node, grid, height, width) => {
  const neighbors = [];
  const { x, y } = node;
  if (y > 0) neighbors.push(grid[y - 1][x]);
  if (y < height - 1) neighbors.push(grid[y + 1][x]);
  if (x > 0) neighbors.push(grid[y][x - 1]);
  if (x < width - 1) neighbors.push(grid[y][x + 1]);
  return neighbors;
};

/**
 * Getting the top, left, bottom, and right neighbors of a node
 * @param {Object} node
 * @param {Array<Array>} grid
 * @param {Number} height
 * @param {Number} width
 * @returns
 */
export const get8WayNeighbors = (node, grid, height, width, closed) => {
  const neighbors = [];
  const { x, y } = node;
  if ((y > 0) & (x > 0)) neighbors.push(grid[y - 1][x - 1]);
  if (y > 0) neighbors.push(grid[y - 1][x]);
  if ((y > 0) & (x < width - 1)) neighbors.push(grid[y - 1][x + 1]);
  if (x < width - 1) neighbors.push(grid[y][x + 1]);
  if ((x < width - 1) & (y < height - 1)) neighbors.push(grid[y + 1][x + 1]);
  if (y < height - 1) neighbors.push(grid[y + 1][x]);
  if ((x > 0) & (y < height - 1)) neighbors.push(grid[y + 1][x - 1]);
  if (x > 0) neighbors.push(grid[y][x - 1]);

  return neighbors;
};
