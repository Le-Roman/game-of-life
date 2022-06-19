import {
  loadLocalAppState,
  loadLocalLogin,
  LocalStorage,
  saveLocalAppState,
  saveLocalLogin,
} from "./localStorage";
import { CellsData, Mode } from "./types";

const mockData = {
  login: "%user%",
  appState: {
    settings: {
      boardSize: { x: 50, y: 50 },
      boardFillPercent: 15,
      speed: 3,
    },
    cellsData: [] as CellsData,
    mode: Mode.STOP,
  },
};

describe("localstorage", () => {
  test("should key not empty", () => {
    expect(LocalStorage.LOGIN_KEY).not.toBe("");
    expect(LocalStorage.APP_STATE_KEY).not.toBe("");
  });

  test("should save and load", () => {
    saveLocalLogin(mockData.login);
    expect(loadLocalLogin()).toBe(mockData.login);

    saveLocalAppState(mockData.appState);
    expect(loadLocalAppState()).toEqual(mockData.appState);
  });
});
