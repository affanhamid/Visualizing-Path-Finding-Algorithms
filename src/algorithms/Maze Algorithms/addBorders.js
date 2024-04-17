import { pointToString } from "../helperFns";

/**
 * Returns the position the top, right, bottom, and left borders of a grid
 * @param {Number} width
 * @param {Number} height
 * @returns {Array}
 */

export const addBorders = (width, height) => {
  const borders = [];

  // Adding the top border
  for (let i = 0; i < width; i++) {
    borders.push(pointToString({ x: i, y: 0 }));
  }

  // Adding the left border
  for (let i = 0; i < height; i++) {
    borders.push(pointToString({ x: width - 1, y: i }));
  }

  // Adding the bottom border
  for (let i = width - 1; i >= 0; i--) {
    borders.push(pointToString({ x: i, y: height - 1 }));
  }

  // Adding the right border
  for (let i = height - 1; i >= 0; i--) {
    borders.push(pointToString({ x: 0, y: i }));
  }

  return borders;
};
