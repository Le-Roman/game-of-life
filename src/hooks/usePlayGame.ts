import { useEffect } from "react";
import { selectAppState } from "../state/appSlice/appSelectors";
import { Mode } from "../types";
import { speedToMs } from "../utils";
import { useAppActions } from "./useActions";
import { useTypedSelector } from "./useTypedSelector";

export const usePlayGame = () => {
  const { mode, settings } = useTypedSelector(selectAppState);
  const { generateCellSData } = useAppActions();
  return useEffect(() => {
    let playGame: number;
    if (mode === Mode.PLAY) {
      playGame = window.setInterval(() => {
        generateCellSData();
      }, speedToMs(settings.speed));
    }

    return () => clearInterval(playGame);
  }, [mode, settings.speed, generateCellSData]);
};
