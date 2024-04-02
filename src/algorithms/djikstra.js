export const djikstra = (nodes, startPos, endPos) => {
  const visitedNodesInOrder = [];

  const { grid, startNode, endNode } = getAllNodes(nodes, startPos, endPos);
  startNode.distance = 0;

  const unvisitedNodes = grid;

  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);

    const closestNode = unvisitedNodes.shift();

    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.isVVisited = true;
    visitedNodesInOrderpush(closestNode);

    if (closestNode === endNode) return visitedNodesInOrder;

    updateUnvisitedNeighbors(closestNode, grid);
  }
};

const updateUnvisitedNeighbors = (node, grid) => {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
};

const getUnvisitedNeighbors = (node, grid) => {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
};

const sortNodesByDistance = (nodes) => {
  nodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
};

const getAllNodes = (nodes, startPos, endPos) => {
  const grid = nodes.map((Node) => ({
    rowIdx: Node.props.rowIdx,
    colIdx: Node.props.colIdx,
    distance: Infinity,
  }));

  const startNode = grid.find(
    (Node) => (Node.rowIdx === startPos[0]) & (Node.colIdx === startPos[1])
  );
  const endNode = grid.find(
    (Node) => (Node.rowIdx === endPos[0]) & (Node.colIdx === endPos[1])
  );

  return { grid: grid, startNode: startNode, endNode: endNode };
};
