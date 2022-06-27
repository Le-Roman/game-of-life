import React, { useCallback } from "react";
import { Coordinates, GameSettings } from "./types";
import Board from "./components/Board/Board";
import Settings from "./components/Settings/Settings";
import { FlexBox } from "./elements/FlexBox";
import { Header } from "./elements/Header";
import { Button } from "./elements/Button/Button";
import { useAppActions, useUserActions } from "./hooks/useActions";
import { useTypedSelector } from "./hooks/useTypedSelector";
import { usePlayGame } from "./hooks/usePlayGame";
import { useCellsData } from "./hooks/useCellsData";
import { useLogin } from "./hooks/useLogin";
import { saveLocalLogin } from "./localStorage";
import { selectAppState } from "./state/appSlice/appSelectors";
import { selectUserState } from "./state/userSlice/userSelectors";
import { useUnmountApp } from "./hooks/useUnmountApp";

const App = () => {
  const { setSettings, start, pause, stop, reStart, changeCellsData } =
    useAppActions();
  const { settings, cellsData, mode } = useTypedSelector(selectAppState);
  const { name } = useTypedSelector(selectUserState);
  const { setUser } = useUserActions();
  const { isLogined } = useLogin();

  useCellsData();
  usePlayGame();
  useUnmountApp();

  const onStart = () => start();
  const onPause = () => pause();
  const onReStart = () => reStart(settings);

  const onChangeSettings = useCallback(
    (settings: GameSettings) => setSettings(settings),
    [setSettings]
  );

  const onLogout = () => {
    saveLocalLogin("");
    setUser("");
    stop();
  };

  const onCellClick = (coord: Coordinates) => changeCellsData(coord);

  if (!isLogined) return null;

  return (
    <FlexBox alignItems="center" flexDirection="vertical">
      <Header>Игра «Жизнь»</Header>
      <FlexBox gap="1rem">
        <FlexBox alignItems="center" flexDirection="vertical">
          <FlexBox flexDirection="vertical" width="100%">
            <label data-testid="greetingsUser">Здравствуйте, {name}!</label>
            <Button onClick={onLogout} data-testid="l-btn-logout">
              Выйти
            </Button>
          </FlexBox>
          <Settings
            mode={mode}
            settings={settings}
            onPause={onPause}
            onStart={onStart}
            onReStart={onReStart}
            onChangeSettings={onChangeSettings}
          />
        </FlexBox>
        <Board
          cellsData={cellsData}
          onCellClick={onCellClick}
          boardSize={settings.boardSize}
        />
      </FlexBox>
    </FlexBox>
  );
};

export default App;
