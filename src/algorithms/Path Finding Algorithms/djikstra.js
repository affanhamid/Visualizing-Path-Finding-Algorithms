const djikstra = (walls, startPos, endPos, numRows, numCols) => {
  const { grid, startNode, endNode } = createGrid(
    walls,
    startPos,
    endPos,
    numRows,
    numCols
  );

  const visitedNodesInOrder = [];

  startNode.distance = 0;
  const unvistedNodes = grid.flat();
  while (!!unvistedNodes.length) {
    unvistedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
    const closestNode = unvistedNodes.shift();

    if (closestNode.isWall) continue;

    if (closestNode.distance === Infinity)
      return {
        visitedNodesInOrder: visitedNodesInOrder.map(
          (node) => `${node.rowIdx}, ${node.colIdx}, ${node.distance}`
        ),
        shortestPath: [],
        success: false,
      };

    closestNode.visited = true;

    visitedNodesInOrder.push(closestNode);

    if (closestNode === endNode) {
      return {
        visitedNodesInOrder: visitedNodesInOrder.map(
          (node) => `${node.rowIdx}, ${node.colIdx}, ${node.distance}`
        ),
        shortestPath: getNodesInShortestPath(endNode).map(
          (node) => `${node.rowIdx}, ${node.colIdx}, ${node.distance}`
        ),
        success: true,
      };
    }
    updateUnvisitedNeighbors(closestNode, grid, numRows, numCols);
  }
};

const createGrid = (walls, startPos, endPos, numRows, numCols) => {
  const grid = [];

  for (let rowIdx = 0; rowIdx < numRows; rowIdx++) {
    const row = [];
    for (let colIdx = 0; colIdx < numCols; colIdx++) {
      row.push({
        rowIdx,
        colIdx,
        distance: Infinity,
        isWall: walls.includes(`${rowIdx}, ${colIdx}`),
      });
    }
    grid.push(row);
  }

  const startNode = grid[startPos[0]][startPos[1]];
  const endNode = grid[endPos[0]][endPos[1]];

  return { grid: grid, startNode: startNode, endNode: endNode };
};

const getUnvisitedNeighbors = (node, grid, numRows, numCols) => {
  const neighbors = [];
  const { rowIdx, colIdx } = node;
  if (rowIdx > 0) neighbors.push(grid[rowIdx - 1][colIdx]);
  if (rowIdx < numRows - 1) neighbors.push(grid[rowIdx + 1][colIdx]);
  if (colIdx > 0) neighbors.push(grid[rowIdx][colIdx - 1]);
  if (colIdx < numCols - 1) neighbors.push(grid[rowIdx][colIdx + 1]);
  return neighbors;
};

const updateUnvisitedNeighbors = (node, grid, numRows, numCols) => {
  const neighbors = getUnvisitedNeighbors(node, grid, numRows, numCols);
  neighbors.forEach((neighbor) => {
    if (neighbor.distance === Infinity) {
      neighbor.distance = node.distance + 1;
      neighbor.prevNode = node;
    }
  });
};

export const getNodesInShortestPath = (endNode) => {
  const nodesInShortestPath = [];
  let currNode = endNode;
  while (currNode != null) {
    nodesInShortestPath.unshift(currNode);
    currNode = currNode.prevNode;
  }
  return nodesInShortestPath;
};

export default djikstra;
