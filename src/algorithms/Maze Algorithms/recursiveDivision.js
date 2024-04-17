import { getRandomInt, pointToString } from "../helperFns";
/**
 * Generates a maze based on the recursive division algorithm
 * @param {Number} width  width of the grid
 * @param {Number} height Height of the grid
 * @param {String} [skew] Bias. Could be either "horizontal skew" or "vertical skew" or none
 * @returns {Array<String>}
 */

const generateRecursiveDivisionMaze = (width, height, skew) => {
  // The algorithm considers the grid as a "room", storing the coordinates of the top left node
  // And the top right node.

  const walls = [];
  const topLeft = { x: 0, y: 0 };
  const bottomRight = { x: width, y: height };

  // Running the recursive function
  divide(walls, topLeft, bottomRight, skew);
  return walls;
};

/**
 * Determines the direction to divide a room. If the width is greater than the height, then
 * the room is horizontal and should be cut vertical. if the height is greater than the width,
 * then the room is vertical and should be cut horizontally.
 *
 * If the skew parameter is present, then the algorithm uses a random number generator, biased
 * towards either 0 or 1 depending on the type of skew to decide whether to cut the room vertically
 * or horizontally.
 */
const chooseOrientation = (width, height, skew) => {
  if (skew === "horizontal skew") {
    // Returns "horizontal" more times than vertical. From my understanding, it should have been
    // Math.random() >= 0.2 since a smaller threshold implies that the probability of the random number
    // being greater than the threshold is high. But that does not work and I'm not quite sure why.
    return Math.random() >= 0.8 ? "horizontal" : "vertical";
  } else if (skew === "vertical skew") {
    // Returns "vertical" more times than horizontal.
    return Math.random() >= 0.8 ? "vertical" : "horizontal";
  } else {
    if (width < height) {
      // The room is upright
      return "vertical";
    } else if (height < width) {
      // The room is sideways
      return "horizontal";
    } else {
      // The room is square. So just use a random number between 0 and 1 to decide the orientation.
      return Math.round(Math.random()) ? "horizontal" : "vertical";
    }
  }
};

/**
 * Given a starting point, ending point, and a door index, adds a wall to the walls array
 * @param {Array<String>} walls The global walls array. This stores the walls of the maze.
 * @param {Number} startPoint.x The x coordinate of the start of the wall to be added
 * @param {Number} startPoint.y The y coordinate of the start of the wall to be added
 * @param {Number} endPoint.x The x coordinate of the end of the wall to be added
 * @param {Number} endPoint.y The y coordinate of the end of the wall to be added
 * @param {Number} doorIdx The index of the door. This is how far from the start of the wall is the door
 */
const addWall = (walls, startPoint, endPoint, doorIdx) => {
  for (let x = 1; x < endPoint.x - startPoint.x; x++) {
    if (x !== doorIdx - startPoint.x) {
      walls.push(pointToString({ x: startPoint.x + x, y: startPoint.y }));
    }
  }
  for (let y = 1; y < endPoint.y - startPoint.y; y++) {
    if (y !== doorIdx - startPoint.y) {
      walls.push(pointToString({ x: startPoint.x, y: startPoint.y + y }));
    }
  }
};

/**
 * The recursive division function. it works by dividing the current room either vertically
 * or horizontally depending on the output of the "chooseOrientation" function. For each division,
 * it considers all of the even positions for the wall and all of the odd positions for the door.
 *
 * In this way, no two walls can be beside each other and no wall will block another wall's door.
 *
 * Then it randomly picks either the row or the column of the wall depending on the orientation and the
 * index for the door. Then it adds the wall to the walls array through the "addWall function".
 *
 * Finally the function runs itself 2 times.
 *    If the orientation is horizontal, then that means the room was cut vertically and we have
 *    a left and a right room to cut now. So the top left and the bottom right coordinates of
 *    both these rooms are found and the function is run on both the rooms
 *
 *    if the orientation is vertical, then that means the room was cut horizontally and we have a
 *    top and a bottom room to cut now. So the top left and the bottom right coordinates of
 *    both these rooms are found and the function is run on both of them.
 *
 * @param {Number} topLeft.x The x coordinate of the top left of the room
 * @param {Number} topLeft.y The y coordinate of the top left of the room
 * @param {Number} bottomRight.x The x coordinate of the bottom right of the room
 * @param {Number} bottomRight.y The y coordinate of the bottom right of the room
 * @param {*} skew The bias towards either horizontal or vertical direction.
 * @returns {null}
 */
const divide = (walls, topLeft, bottomRight, skew) => {
  // The base case. If the current room is too small, then return.
  if (bottomRight.y - topLeft.y <= 3 || bottomRight.x - topLeft.x <= 3) return;

  const possibleRows = [];
  const possibleColumns = [];

  const orientation = chooseOrientation(
    bottomRight.x - topLeft.x,
    bottomRight.y - topLeft.y,
    skew
  );
  if (orientation === "vertical") {
    for (let i = topLeft.y + 2; i <= bottomRight.y - 2; i += 2) {
      possibleRows.push(i);
    }
    for (let i = topLeft.x + 1; i <= bottomRight.x - 1; i += 2) {
      possibleColumns.push(i);
    }

    const wallY = possibleRows[getRandomInt(possibleRows.length - 1)];
    const doorX = possibleColumns[getRandomInt(possibleColumns.length - 1)];

    addWall(
      walls,
      { x: topLeft.x, y: wallY },
      { x: bottomRight.x, y: wallY },
      doorX
    );

    divide(walls, topLeft, { x: bottomRight.x, y: wallY }, skew);
    divide(walls, { x: topLeft.x, y: wallY }, bottomRight, skew);
  } else {
    for (let i = topLeft.x + 2; i <= bottomRight.x - 2; i += 2) {
      possibleColumns.push(i);
    }
    for (let i = topLeft.y + 1; i <= bottomRight.y - 3; i += 2) {
      possibleRows.push(i);
    }

    const wallX = possibleColumns[getRandomInt(possibleColumns.length - 1)];
    const doorY = possibleRows[getRandomInt(possibleRows.length - 1)];

    addWall(
      walls,
      { x: wallX, y: topLeft.y },
      { x: wallX, y: bottomRight.y },
      doorY
    );

    divide(walls, topLeft, { x: wallX, y: bottomRight.y }, skew);
    divide(walls, { x: wallX, y: topLeft.y }, bottomRight, skew);
  }
};

export default generateRecursiveDivisionMaze;
