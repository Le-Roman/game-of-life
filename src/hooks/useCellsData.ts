import { useEffect } from "react";
import { loadLocalAppState, saveLocalAppState } from "../localStorage";
import { selectAppState } from "../state/appSlice/appSelectors";

import { useAppActions } from "./useActions";
import { useTypedSelector } from "./useTypedSelector";

export const useCellsData = () => {
  const appState = useTypedSelector(selectAppState);
  const { cellsData } = loadLocalAppState();
  const { setCellsData } = useAppActions();

  return useEffect(() => {
    if (!cellsData) setCellsData(appState.settings);

    saveLocalAppState(appState);
  }, [appState.settings]);
};
