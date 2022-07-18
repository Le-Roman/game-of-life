import { useEffect } from "react";
import { loadLocalAppState, saveLocalAppState } from "../localStorage";
import { selectAppState } from "../state/appSlice/appSelectors";

import { useAppActions } from "./useActions";
import { useTypedSelector } from "./useTypedSelector";

export const useCellsData = () => {
  const appState = useTypedSelector(selectAppState);
  const localAppState = loadLocalAppState();
  const { setCellsData } = useAppActions();

  useEffect(() => {
    if (!localAppState) setCellsData(appState.settings);

    saveLocalAppState(appState);
  }, [appState.settings]);
};
