import React, { useCallback } from "react";
import { Coordinates, GameSettings } from "./types";
import Board from "./components/Board/Board";
import Settings from "./components/Settings/Settings";
import { FlexBox } from "./elements/FlexBox";
import { Header } from "./elements/Header";
import { Button } from "./elements/Button/Button";
import { useAppActions, useUserActions } from "./hooks/useActions";
import { useTypedSelector } from "./hooks/useTypedSelector";
import { useCellsData } from "./hooks/useCellsData";
import { useLogin } from "./hooks/useLogin";
import { selectAppState } from "./state/appSlice/appSelectors";
import { selectUserState } from "./state/userSlice/userSelectors";
import { useUnmountApp } from "./hooks/useUnmountApp";

const App = () => {
  const { setSettings, start, pause, reStart, changeCellsData } =
    useAppActions();
  const { settings, cellsData, mode } = useTypedSelector(selectAppState);
  const { name } = useTypedSelector(selectUserState);
  const { logout } = useUserActions();
  const { isLogined } = useLogin();

  useCellsData();
  useUnmountApp();

  const onStart = () => start();
  const onPause = () => pause();
  const onReStart = () => reStart(settings);

  const onChangeSettings = useCallback(
    (settings: GameSettings) => setSettings(settings),
    [setSettings]
  );

  if (!isLogined) return null;

  return (
    <FlexBox alignItems="center" flexDirection="vertical">
      <Header>Игра «Жизнь»</Header>
      <FlexBox gap="1rem">
        <FlexBox alignItems="center" flexDirection="vertical">
          <FlexBox flexDirection="vertical" width="100%">
            <label data-testid="greetingsUser">Здравствуйте, {name}!</label>
            <Button onClick={logout} data-testid="l-btn-logout">
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
          onCellClick={changeCellsData}
          boardSize={settings.boardSize}
        />
      </FlexBox>
    </FlexBox>
  );
};

export default App;
