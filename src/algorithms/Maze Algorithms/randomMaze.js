const generateRandomMaze = (startPos, endPos, numRows, numCols, sparsity) => {
  const startString = startPos.join(", ");
  const endString = endPos.join(", ");

  const walls = [];
  for (let i = 0; i < numRows * numCols * sparsity; i++) {
    let randomPoint = getRandomPoint(numRows, numCols).join(", ");

    while (
      (randomPoint === startString) |
      (randomPoint === endString) |
      walls.includes(randomPoint)
    ) {
      randomPoint = [getRandomPoint(numRows, numCols)].join(", ");
    }
    walls.push(randomPoint);
  }

  return walls;
};

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

const getRandomPoint = (numRows, numCols) => {
  return [getRandomInt(numRows), getRandomInt(numCols)];
};
export default generateRandomMaze;
