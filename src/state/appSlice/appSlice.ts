import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadLocalAppState } from "../../localStorage";
import { CellsData, Coordinates, GameSettings, Mode } from "../../types";
import {
  generateBoard,
  nextGeneration,
  resizeBoard,
  toggleCell,
} from "../../utils";

export interface AppState {
  settings: GameSettings;
  cellsData: CellsData;
  mode: Mode;
}

export const produceAppState = (): AppState => {
  const { cellsData, settings } = loadLocalAppState();
  return {
    settings: settings || {
      boardSize: { x: 50, y: 50 },
      boardFillPercent: 15,
      speed: 3,
    },
    cellsData: cellsData || ([] as CellsData),
    mode: cellsData ? Mode.PAUSE : Mode.STOP,
  };
};

export const appSlice = createSlice({
  name: "app",
  initialState: produceAppState(),
  reducers: {
    setSettings: (state, action: PayloadAction<GameSettings>) => {
      if (
        action.payload.boardSize.x !== state.settings.boardSize.x ||
        action.payload.boardSize.y !== state.settings.boardSize.y
      ) {
        state.cellsData = resizeBoard(
          state.cellsData,
          action.payload.boardSize
        );
      }

      if (action.payload.boardFillPercent !== state.settings.boardFillPercent) {
        state.cellsData = generateBoard(action.payload);
      }
      state.settings = action.payload;
    },

    setCellsData: (state, action: PayloadAction<GameSettings>) => {
      state.cellsData = generateBoard(action.payload);
    },

    generateCellSData: (state) => {
      state.cellsData = nextGeneration(state.cellsData);
    },

    changeCellsData: (state, action: PayloadAction<Coordinates>) => {
      state.cellsData = toggleCell(action.payload, state.cellsData);
    },

    start: (state) => {
      state.mode = Mode.PLAY;
    },

    pause: (state) => {
      state.mode = Mode.PAUSE;
    },

    stop: (state) => {
      state.mode = Mode.STOP;
    },

    reStart: (state, action: PayloadAction<GameSettings>) => {
      state.cellsData = generateBoard(action.payload);
      state.settings = action.payload;
      state.mode = Mode.STOP;
    },
  },
});

export const appActions = appSlice.actions;

export default appSlice.reducer;
