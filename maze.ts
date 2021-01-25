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
  currentDirection: Direction = "North"
): [Direction, Coords] => {
  const dirs: Array<Direction> = ["North", "East", "South", "West"];
  const nearestCells = [
    { x: currentCoords.x, y: currentCoords.y - 1 },
    { x: currentCoords.x + 1, y: currentCoords.y },
    { x: currentCoords.x, y: currentCoords.y + 1 },
    { x: currentCoords.x - 1, y: currentCoords.y },
  ] as Array<Coords>;

  const index = dirs.indexOf(currentDirection);
  const forward = currentDirection;
  const right = dirs[index + 1] || dirs[0];
  const left = dirs[index - 1] || dirs[dirs.length - 1];
  const back = dirs[index + 2] || dirs[dirs.length - index];

  let nextCell;
  let nextDirection;
  for (let dir of [right, forward, left, back]) {
    nextCell = nearestCells[dirs.indexOf(dir)];
    if (isCellFree(nextCell, maze)) {
      nextDirection = dir;
      break;
    }
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
