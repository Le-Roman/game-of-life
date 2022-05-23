import { BoardSize, CellsData, Coordinates } from "./types";

export const generateBoardXY = (boardSize: BoardSize): CellsData => {
  return Array.from(Array(boardSize.y)).map((_, iY) =>
    Array.from(Array(boardSize.x)).map((_, iX) =>
      counter(boardSize.x, { iY, iX })
    )
  );
};

export const counter = (factor: number, cellCoord: Coordinates): number => {
  const positionY: number = cellCoord.iY;
  const positionX: number = cellCoord.iX + 1;
  const positionGlob: number = positionY * factor + positionX;
  return positionGlob;
};
