import { pointToString, getRandomPoint } from "../helperFns";

/**
 * Generates walls at random position. The number of walls depends upon the "sparsity parameter"
 * @param {Number} width - width of the grid
 * @param {Number} height - height of the grid
 * @param {Number} sparsity float
 * @returns {Array<String>}
 */

const generateRandomMaze = (width, height, sparsity) => {
  const walls = [];

  // The number of walls to be placed is a fraction of the total area of the grid
  for (let i = 0; i < height * width * sparsity; i++) {
    let randomPoint = pointToString(getRandomPoint(width, height));

    // Condition to ensure that the point we chose isn't already a wall
    while (walls.includes(randomPoint)) {
      randomPoint = pointToString(getRandomPoint(width, height));
    }

    walls.push(randomPoint);
  }

  return walls;
};

export default generateRandomMaze;
