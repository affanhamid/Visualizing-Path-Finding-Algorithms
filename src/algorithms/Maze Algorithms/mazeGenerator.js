import { addBorders } from "./addBorders";
import generateRandomMaze from "./randomMaze";
import generateRecursiveDivisionMaze from "./recursiveDivision";

/**
 * Generates a maze by running the relevant algorithm from the "Maze Algorithms" directory
 * @param {String} mazeType
 * @param {Number} width
 * @param {Number} height
 * @returns  {Array}
 */

export const createMaze = (mazeType, width, height) => {
  let maze;

  if (mazeType === "Random Maze (Sparse)") {
    maze = generateRandomMaze(width, height, 0.1);
  } else if (mazeType === "Random Maze (Dense)") {
    maze = generateRandomMaze(width, height, 0.3);
  } else if (mazeType === "Recursive Division Maze") {
    maze = generateRecursiveDivisionMaze(width, height);
  } else if (mazeType === "Recursive Division Maze (horizontal skew)") {
    maze = generateRecursiveDivisionMaze(width, height, "horizontal skew");
  } else if (mazeType === "Recursive Division Maze (vertical skew)") {
    maze = generateRecursiveDivisionMaze(width, height, "vertical skew");
  }

  // Adding the borders
  const borders = addBorders(width, height);

  return borders.concat(maze);
};
