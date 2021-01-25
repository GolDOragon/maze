import { Coords, Direction, selectMove } from "./maze";

describe("selectMove", () => {
  const X = false;
  const _ = true;
  const maze = [
    [X, X, _, X, X, X],
    [X, X, _, _, _, X],
    [X, X, _, X, X, X],
    [X, X, _, _, _, _],
    [X, X, _, X, X, X],
  ];

  type Args = {
    coords: Coords;
    dir: Direction;
  };

  test("function should be defined", () => {
    expect(selectMove).toBeDefined();
  });

  test.each([
    [{ coords: { x: 2, y: 0 } } as Args, ["South", { x: 2, y: 1 }]],
    [{ coords: { x: 2, y: 4 } } as Args, ["North", { x: 2, y: 3 }]],
    [{ coords: { x: 5, y: 3 } } as Args, ["West", { x: 4, y: 3 }]],
  ])("first time should return first open direction", (args, expected) => {
    expect(selectMove(maze, args.coords)).toEqual(expected);
  });

  test.each([
    [
      { coords: { x: 2, y: 2 }, dir: "North" } as Args,
      ["North", { x: 2, y: 1 }],
    ],
    [{ coords: { x: 3, y: 3 }, dir: "West" } as Args, ["West", { x: 2, y: 3 }]],
  ])("should go forward with an open path", (args, expected) => {
    expect(selectMove(maze, args.coords, args.dir)).toEqual(expected);
  });

  test.each([
    [
      { coords: { x: 2, y: 2 }, dir: "North" } as Args,
      ["North", { x: 2, y: 1 }],
    ],
    [{ coords: { x: 3, y: 3 }, dir: "West" } as Args, ["West", { x: 2, y: 3 }]],
  ])("should go right at the bend", (args, expected) => {
    expect(selectMove(maze, args.coords, args.dir)).toEqual(expected);
  });

  test("should go back from the dead end", () => {
    expect(selectMove(maze, { x: 4, y: 1 }, "East")).toEqual([
      "West",
      { x: 3, y: 1 },
    ]);
  });
});
