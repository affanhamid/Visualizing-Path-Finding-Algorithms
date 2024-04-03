const generateRecursiveDivisionMaze = (startPos, endPos, numRows, numCols) => {
  const walls = [];
  addBorders(walls, numRows, numCols);
  const counter = 0;
  const doors = [];
  divide(
    walls,
    doors,
    1,
    1,
    numRows - 2,
    numCols - 2,
    chooseOrientation(numCols, numRows),
    counter
  );

  return walls;
};

const addBorders = (walls, numRows, numCols) => {
  for (let i = 0; i < numCols; i++) {
    walls.push(`${0}, ${i}`);
  }
  for (let i = 0; i < numRows; i++) {
    walls.push(`${i}, ${numCols - 1}`);
  }
  for (let i = numCols - 1; i >= 0; i--) {
    walls.push(`${numRows - 1}, ${i}`);
  }
  for (let i = numRows - 1; i >= 0; i--) {
    walls.push(`${i}, ${0}`);
  }
};

const chooseOrientation = (width, height) => {
  if (width < height) {
    return 1;
  } else if (height < width) {
    return 0;
  } else {
    Math.round(Math.random());
  }
};

const generateRooms = (y, x, wallCol, wallRow, height, width, horizontal) => {
  if (horizontal) {
    const topRoomCoords = [y, x];

    const bottomRoomCoords = [y + wallRow, x];

    const topRoomDim = [wallRow - x, width - y];

    const bottomRoomDim = [height - wallRow - x, width - y];

    return [topRoomCoords, topRoomDim, bottomRoomCoords, bottomRoomDim];
  } else {
    const leftRoomCoords = [y, x];

    const rightRoomCoords = [y, x + wallCol];

    const leftRoomDim = [height - y + 1, wallCol - x];

    const rightRoomDim = [height - y + 1, width - wallCol - x + 1];

    return [leftRoomCoords, leftRoomDim, rightRoomCoords, rightRoomDim];
  }
};

const divide = (walls, doors, y, x, height, width, horizontal) => {
  if (width < 2 || height < 2) return;

  let wallRow = y + (horizontal ? getRandomInt(height - 2) + 1 : 0);
  let wallCol = x + (horizontal ? 0 : getRandomInt(width - 2) + 1);

  const wallLength = horizontal ? width : height;

  const doorRow = wallRow + (horizontal ? 0 : getRandomInt(height - 1));
  const doorCol = wallCol + (horizontal ? getRandomInt(width - 1) : 0);

  doors.push([doorRow, doorCol]);

  if (horizontal) {
    for (let i = 0; i < wallLength; i++) {
      if (wallCol + i !== doorCol) {
        walls.push(`${wallRow}, ${wallCol + i}`);
      }
    }
  } else {
    for (let i = 0; i < wallLength; i++) {
      if (wallRow + i !== doorRow) {
        walls.push(`${wallRow + i}, ${wallCol}`);
      }
    }
  }

  const [Room1Coords, Room1Dim, Room2Coords, Room2Dim] = generateRooms(
    y,
    x,
    wallCol,
    wallRow,
    height,
    width,
    horizontal
  );

  console.log("wall: ", [wallRow, wallCol]);
  console.log("room1: ", Room1Coords, Room1Dim);
  console.log("room2: ", Room2Coords, Room2Dim);

  divide(
    walls,
    doors,
    Room1Coords[0],
    Room1Coords[1],
    Room1Dim[0],
    Room1Dim[1],
    chooseOrientation(Room1Dim[1], Room1Dim[0])
  );

  divide(
    walls,
    doors,
    Room2Coords[0],
    Room2Coords[1],
    Room2Dim[0],
    Room2Dim[1],
    chooseOrientation(Room2Dim[1], Room2Dim[0])
  );
};

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

export default generateRecursiveDivisionMaze;
