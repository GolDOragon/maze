const X = false; // wall
const _ = true; // pass
const maze = [
  [X, X, X, X, _, X, X, X, X],
  [X, _, X, _, _, X, _, _, X],
  [X, _, X, X, _, X, _, X, X],
  [_, _, X, _, _, _, _, X, _],
  [X, _, X, _, X, _, X, X, X],
  [X, _, _, _, X, _, _, _, X],
  [X, X, X, X, X, X, X, X, X],
];

const isCellFree = (coords: Coords, maze: Maze): boolean => {
  if (!coords || !maze[coords.y] || !maze[coords.y][coords.x]) {
    return false;
  }
  return maze[coords.y][coords.x];
};

const writePath = (nextCell: Coords, path: Array<Coords>): Array<Coords> => {
  const previousCell = path[path.length - 2] || null;

  if (!previousCell) {
    return [...path, nextCell];
  }

  if (previousCell.x === nextCell.x && previousCell.y === nextCell.y) {
    return path.slice(0, -1);
  }

  return [...path, nextCell];
};

export const isExit = (maze: Maze, coords: Coords): boolean => {
  if (!coords) return false;

  const currentCell = maze[coords.y][coords.x];

  if (!currentCell) return false;

  let isRightLeft = coords.x === 0 || coords.x === maze[coords.y].length - 1;
  let isTopDown = coords.y === 0 || coords.y === maze.length - 1;

  if (!isRightLeft && !isTopDown) return false;

  return currentCell;
};

export const selectMove = (
  maze: Maze,
  currentCoords: Coords,
  currentDirection: Direction = null
): [Direction, Coords] => {
  const dirs: Array<Direction> = ["North", "East", "South", "West"];
  const nearestCells = [
    { x: currentCoords.x, y: currentCoords.y - 1 },
    { x: currentCoords.x + 1, y: currentCoords.y },
    { x: currentCoords.x, y: currentCoords.y + 1 },
    { x: currentCoords.x - 1, y: currentCoords.y },
  ] as Array<Coords>;

  let reverseDirection = null;
  if (currentDirection) {
    const index = dirs.indexOf(currentDirection) + 2;
    reverseDirection = dirs[index] || dirs[index - dirs.length];
  }

  let nextCell;
  let nextDirection = currentDirection;
  let isFirstCircle = true;
  while (!isCellFree(nextCell, maze)) {
    nextDirection = dirs[dirs.indexOf(nextDirection) + 1] || dirs[0];

    if (nextDirection === currentDirection) {
      isFirstCircle = false;
    }
    if (nextDirection === reverseDirection && isFirstCircle) continue;

    nextCell = nearestCells[dirs.indexOf(nextDirection)];
  }

  return [nextDirection, nextCell];
};

export default function walk(maze: Maze, start: Coords): Array<Coords> {
  let path: Array<Coords> = [];

  let [currentDirection, nextCell] = selectMove(maze, start);

  while (!isExit(maze, nextCell)) {
    path = writePath(nextCell, path);
    [currentDirection, nextCell] = selectMove(
      maze,
      path[path.length - 1],
      currentDirection
    );
  }

  path = writePath(nextCell, path);

  return [start, ...path];
}

export interface Coords {
  x: number;
  y: number;
}
export type Maze = boolean[][];
export type Direction = "North" | "West" | "South" | "East";
