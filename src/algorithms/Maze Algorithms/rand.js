let walls = [];
const generateRecursiveDivisionMaze = (startPos, endPos, numRows, numCols) => {
  for (let i = 0; i < numCols; i++) {
    walls.push(`0, ${i}`);
  }
  for (let i = 0; i < numRows; i++) {
    walls.push(`${i}, ${numCols - 1}`);
  }
  for (let i = numCols - 1; i >= 0; i--) {
    walls.push(`${numRows - 1}, ${i}`);
  }
  for (let i = numRows - 1; i >= 0; i--) {
    walls.push(`${i}, 0`);
  }

  const doors = [];
  const rooms = [
    [
      [0, 0],
      [numCols, numRows],
    ],
  ];
  const columnWalls = [0, numCols - 1];
  const rowWalls = [0, numRows - 1];
  const threshold = 5;

  recursiveDivision(
    rooms,
    doors,
    rowWalls,
    columnWalls,
    startPos,
    endPos,
    threshold
  );

  return walls;
};

const recursiveDivision = (
  rooms,
  doors,
  rowWalls,
  columnWalls,
  startPos,
  endPos,
  threshold
) => {
  console.log(rowWalls, columnWalls, doors, rooms.length);

  if (rooms.length === 0) return;

  const [topLeft, bottomRight] = rooms.pop();

  if (bottomRight[0] - topLeft[0] > bottomRight[1] - topLeft[1]) {
    let randomWallCol = getRandomInt(bottomRight[0] - topLeft[0] - 2) + 1;

    while (
      columnWalls.includes(topLeft[1] + randomWallCol + 1) |
      columnWalls.includes(topLeft[1] + randomWallCol) |
      columnWalls.includes(topLeft[1] + randomWallCol - 1) |
      (startPos[0] === randomWallCol) |
      (endPos[0] === randomWallCol) |
      doors
        .map((door) => parseInt(door.split(", ")[1]))
        .includes([randomWallCol])
    ) {
      randomWallCol = getRandomInt(bottomRight[0] - topLeft[0] - 2) + 1;
    }

    columnWalls.push(topLeft[1] + randomWallCol);

    const randomWall = [];

    for (let i = topLeft[1]; i <= bottomRight[1] - topLeft[1]; i++) {
      randomWall.push(`${i}, ${topLeft[1] + randomWallCol}`);
    }
    const door = randomWall.splice(
      getRandomInt(randomWall.length - 2) + 1,
      1
    )[0];
    doors.push(door);
    walls = walls.concat(randomWall);

    const room1 = [topLeft, [randomWallCol, bottomRight[1]]];

    if (
      (Math.abs(room1[1][1] - room1[0][1]) > threshold) &
      (Math.abs(room1[1][0] - room1[0][0]) > threshold)
    ) {
      rooms.push(room1);
    }

    // const room2 = [[randomWallCol, topLeft[1]], bottomRight];

    // if (
    //   (room2[1][1] - room2[0][1] > threshold) &
    //   (room2[1][0] - room2[0][0] > threshold)
    // ) {
    //   rooms.push(room1);
    // }
  } else {
    let randomWallRow = getRandomInt(bottomRight[1] - topLeft[1] - 2) + 1;

    while (
      rowWalls.includes(topLeft[0] + randomWallRow + 1) |
      rowWalls.includes(topLeft[0] + randomWallRow) |
      rowWalls.includes(topLeft[0] + randomWallRow - 1) |
      (startPos[1] === randomWallRow) |
      (endPos[1] === randomWallRow) |
      doors
        .map((door) => parseInt(door.split(", ")[1]))
        .includes([randomWallRow])
    ) {
      randomWallRow = getRandomInt(bottomRight[1] - topLeft[1] - 2) + 1;
    }

    rowWalls.push(topLeft[0] + randomWallRow);

    const randomWall = [];

    for (let i = topLeft[0]; i <= bottomRight[0] - topLeft[0]; i++) {
      randomWall.push(`${topLeft[0] + randomWallRow}, ${i}`);
    }
    const door = randomWall.splice(
      getRandomInt(randomWall.length - 2) + 1,
      1
    )[0];
    doors.push(door);
    walls = walls.concat(randomWall);

    const room1 = [topLeft, [bottomRight[0], randomWallRow]];

    if (
      (room1[1][1] - room1[0][1] > threshold) &
      (room1[1][0] - room1[0][0] > threshold)
    ) {
      rooms.push(room1);
    }
    // const room2 = [[topLeft[0], randomWallRow], bottomRight];

    // if (
    //   (room2[1][1] - room2[0][1] > threshold) &
    //   (room2[1][0] - room2[0][0] > threshold)
    // ) {
    //   rooms.push(room2);
    // }
  }
  recursiveDivision(
    rooms,
    doors,
    rowWalls,
    columnWalls,
    startPos,
    endPos,
    threshold
  );
};

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

export default generateRecursiveDivisionMaze;
