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
    visitedNodesInOrderInOrder.push(closestNode);

    if (closestNode === finisihNode) return visitedNodesInOrder;

    updateUnvisitedNeighbors(closestNode, grid);
  }
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
