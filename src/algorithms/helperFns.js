const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

/**
 * Get a random point between the width and height. The -2 and +1 shifts are so that
 *  the random point is not at any of the borders of the grid.
 * @param {Number} width
 * @param {Height} height
 * @returns
 */
const getRandomPoint = (width, height) => {
  return { x: getRandomInt(width - 2) + 1, y: getRandomInt(height - 2) + 1 };
};

/**
 * Convert a {x, y} object to a "x, y" string
 * @param {Number} pos.x
 * @param {Number} pos.y
 * @returns
 */
const pointToString = (pos) => {
  return `${pos.x}, ${pos.y}`;
};

/**
 * Converting a "x, y" string to {x, y} object
 * @param {String} pointString
 * @returns
 */
const stringToPoint = (pointString) => {
  return pointString.split(", ").map((coord) => parseInt(coord));
};

/**
 * Given all of the walls of a maze, find random points which are not wall nodes. This is
 * to find positions for the start and end node.
 * @param {Array<String>} maze array of all of the wall nodes
 * @param {Number} width
 * @param {Numbre} height
 * @returns
 */
const chooseSafePoint = (maze, width, height) => {
  let safePoint = pointToString(getRandomPoint(width, height));
  while (maze.includes(safePoint)) {
    safePoint = pointToString(getRandomPoint(width, height));
  }
  return safePoint;
};

module.exports = {
  getRandomInt,
  getRandomPoint,
  pointToString,
  stringToPoint,
  chooseSafePoint,
};
