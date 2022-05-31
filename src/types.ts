import { cellStateAlive, cellStateEmpty } from "./constants";

export type CellState = typeof cellStateAlive | typeof cellStateEmpty;
export type CellsData = Array<Array<CellState>>;

export interface GameSettings {
  boardSize: BoardSize;
  boardFillPercent: number;
  speed: number;
}

export interface BoardSize {
  x: number;
  y: number;
}

export interface Coordinates {
  x: number;
  y: number;
}

export enum Mode {
  PAUSE = "PAUSE",
  PLAY = "PLAY",
  STOP = "STOP",
}
