export type CellsData = Array<Array<number>>;

export interface CellData {
  boardSize: BoardSize;
  cellCoord: Coordinates;
}

export interface BoardSize {
  x: number;
  y: number;
}

export interface Coordinates {
  iY: number;
  iX: number;
}
