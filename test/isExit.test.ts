import { isExit } from "./maze";

describe("isExit", () => {
  const X = false;
  const _ = true;
  const maze = [
    [X, X, _, X, X, X],
    [X, X, _, _, _, X],
    [X, X, _, X, X, X],
    [X, X, _, _, _, _],
    [X, X, _, X, X, X],
  ];

  test("function should be defined", () => {
    expect(isExit).toBeDefined();
  });

  test.each([
    [{ x: 2, y: 0 }, true],
    [{ x: 5, y: 3 }, true],
    [{ x: 2, y: 4 }, true],
  ])("should return true for open outside cell", (args, expected) => {
    expect(isExit(maze, args)).toBe(expected);
  });

  test.each([
    [{ x: 2, y: 3 }, false],
    [{ x: 3, y: 3 }, false],
  ])("should return false for open inside cell", (args, expected) => {
    expect(isExit(maze, args)).toBe(expected);
  });

  test.each([
    [{ x: 1, y: 3 }, false],
    [{ x: 3, y: 3 }, false],
  ])("should return false for any close cell", (args, expected) => {
    expect(isExit(maze, args)).toBe(expected);
  });
});
