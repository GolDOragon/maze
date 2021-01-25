import walk from "../maze";

describe("Maze", () => {
  const X = false;
  const _ = true;

  test("function should be defined", () => {
    expect(walk).toBeDefined();
  });

  describe("should find simple path", () => {
    describe("north and south", () => {
      test("go to the North", () => {
        const maze = [
          [X, _, X],
          [X, _, X],
          [X, _, X],
        ];

        expect(walk(maze, { x: 1, y: 2 })).toEqual([
          { x: 1, y: 2 },
          { x: 1, y: 1 },
          { x: 1, y: 0 },
        ]);
      });
      test("go to the South", () => {
        const maze = [
          [X, _, X],
          [X, _, X],
          [X, _, X],
        ];

        expect(walk(maze, { x: 1, y: 0 })).toEqual([
          { x: 1, y: 0 },
          { x: 1, y: 1 },
          { x: 1, y: 2 },
        ]);
      });
    });

    describe("East and West", () => {
      test("go to the East", () => {
        const maze = [
          [X, X, X],
          [_, _, _],
          [X, X, X],
        ];

        expect(walk(maze, { x: 0, y: 1 })).toEqual([
          { y: 1, x: 0 },
          { y: 1, x: 1 },
          { y: 1, x: 2 },
        ]);
      });
      test("go to the West", () => {
        const maze = [
          [X, X, X],
          [_, _, _],
          [X, X, X],
        ];

        expect(walk(maze, { x: 0, y: 1 })).toEqual([
          { y: 1, x: 0 },
          { y: 1, x: 1 },
          { y: 1, x: 2 },
        ]);
      });
    });
  });

  describe("take turns", () => {
    const maze = [
      [X, X, X, X],
      [X, _, _, _],
      [X, _, X, X],
      [X, _, X, X],
    ];

    test.each([
      [
        { x: 1, y: 3 },
        [
          { x: 1, y: 3 },
          { x: 1, y: 2 },
          { x: 1, y: 1 },
          { x: 2, y: 1 },
          { x: 3, y: 1 },
        ],
      ],
      [
        { x: 3, y: 1 },
        [
          { x: 3, y: 1 },
          { x: 2, y: 1 },
          { x: 1, y: 1 },
          { x: 1, y: 2 },
          { x: 1, y: 3 },
        ],
      ],
    ])("should", (arg, expected) => {
      expect(walk(maze, arg)).toEqual(expected);
    });
  });

  describe("go through maze", () => {
    const maze1 = [
      [X, X, _, X, X, X],
      [X, X, _, _, _, X],
      [X, X, _, X, X, X],
      [X, X, _, _, _, _],
      [X, X, _, X, X, X],
    ];
    const maze2 = [
      [X, X, _, X, X, X],
      [X, X, _, _, _, X],
      [X, X, _, X, X, X],
      [X, X, _, _, X, _],
      [X, X, _, X, X, X],
    ];
    const maze3 = [
      [X, X, X, X, _, X, X, X, X],
      [X, _, X, _, _, X, _, _, X],
      [X, _, X, X, _, X, _, X, X],
      [_, _, X, _, _, _, _, X, _],
      [X, _, X, _, X, _, X, X, X],
      [X, _, _, _, X, _, _, _, X],
      [X, X, X, X, X, X, X, X, X],
    ];
    const maze4 = [
      [X, _, X, X, X, _, X, X, X],
      [X, _, _, _, X, _, _, _, X],
      [X, _, X, _, X, X, _, _, X],
      [X, _, _, X, X, X, _, X, X],
      [X, _, _, _, _, _, _, _, X],
      [X, _, _, X, X, X, X, _, X],
      [X, X, X, X, X, X, X, X, X],
    ];

    test.each([
      [
        { maze: maze1, start: { x: 2, y: 4 } },
        [
          { x: 2, y: 4 },
          { x: 2, y: 3 },
          { x: 3, y: 3 },
          { x: 4, y: 3 },
          { x: 5, y: 3 },
        ],
      ],
      [
        { maze: maze2, start: { x: 2, y: 4 } },
        [
          { x: 2, y: 4 },
          { x: 2, y: 3 },
          { x: 2, y: 2 },
          { x: 2, y: 1 },
          { x: 2, y: 0 },
        ],
      ],
      [
        { maze: maze3, start: { x: 0, y: 3 } },
        [
          { x: 0, y: 3 },
          { x: 1, y: 3 },
          { x: 1, y: 4 },
          { x: 1, y: 5 },
          { x: 2, y: 5 },
          { x: 3, y: 5 },
          { x: 3, y: 4 },
          { x: 3, y: 3 },
          { x: 4, y: 3 },
          { x: 4, y: 2 },
          { x: 4, y: 1 },
          { x: 4, y: 0 },
        ],
      ],
      [
        { maze: maze4, start: { x: 1, y: 0 } },
        [
          { x: 1, y: 0 },
          { x: 1, y: 1 },
          { x: 1, y: 2 },
          { x: 1, y: 3 },
          { x: 1, y: 4 },
          { x: 1, y: 5 },
          { x: 2, y: 5 },
          { x: 2, y: 4 },
          { x: 3, y: 4 },
          { x: 4, y: 4 },
          { x: 5, y: 4 },
          { x: 6, y: 4 },
          { x: 6, y: 3 },
          { x: 6, y: 2 },
          { x: 7, y: 2 },
          { x: 7, y: 1 },
          { x: 6, y: 1 },
          { x: 5, y: 1 },
          { x: 5, y: 0 },
        ],
      ],
    ])("go through maze", (args, expected) => {
      expect(walk(args.maze, args.start)).toEqual(expected);
    });
  });
});
