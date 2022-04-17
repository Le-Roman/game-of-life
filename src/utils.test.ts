import { BoardSize, Coordinates } from "./types";
import { generateBoardXY, counter } from "./utils";

test("base test generateBoardXY", () => {
  const boardSize: BoardSize = { x: 3, y: 3 };
  expect(generateBoardXY(boardSize)).toEqual([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]);
});

test("base test counter", () => {
  const factor = 10;
  const cellCoord: Coordinates = { iY: 2, iX: 3 };
  expect(counter(factor, cellCoord)).toBe(24);
});
