import { useEffect } from "react";
import { saveLocalAppState } from "../localStorage";
import { selectAppState } from "../state/appSlice/appSelectors";
import { useTypedSelector } from "./useTypedSelector";

export const useUnmountApp = () => {
  const appState = useTypedSelector(selectAppState);

  return useEffect(() => {
    return () => {
      saveLocalAppState(appState);
    };
  });
};
