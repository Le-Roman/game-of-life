import React, { useCallback, useContext, useEffect, useState } from "react";
import { CellsData, Coordinates, GameSettings, Mode } from "./types";
import {
  generateBoard,
  nextGeneration,
  resizeBoard,
  speedToMs,
  toggleCell,
} from "./utils";
import Board from "./components/Board/Board";
import Settings from "./components/Settings/Settings";
import { FlexBox } from "./elements/FlexBox";
import { Header } from "./elements/Header";
import { UserLoginContext } from "./components/UserLoginProvider/UserLoginProvider";
import { Button } from "./elements/Button/Button";

const initialGameSettings: GameSettings = {
  boardSize: { x: 50, y: 50 },
  boardFillPercent: 15,
  speed: 3,
};

const App = () => {
  const [settings, setSettings] = useState<GameSettings>(initialGameSettings);
  const [cellsData, setCellsData] = useState<CellsData>([] as CellsData);
  const [mode, setMode] = useState<Mode>(Mode.STOP);
  const {
    state: { login },
    onLogout,
  } = useContext(UserLoginContext);

  useEffect(() => {
    setCellsData((prevCellsData) =>
      resizeBoard(prevCellsData, settings.boardSize)
    );
  }, [settings.boardSize]);

  useEffect(() => {
    setCellsData(generateBoard(settings));
  }, [settings.boardFillPercent]);

  useEffect(() => {
    let playGame: number;
    if (mode === Mode.PLAY) {
      playGame = window.setInterval(() => {
        setCellsData((prevCellsData) => nextGeneration(prevCellsData));
      }, speedToMs(settings.speed));
    } else {
      setCellsData((prevCellsData) =>
        resizeBoard(prevCellsData, settings.boardSize)
      );
    }
    return () => clearInterval(playGame);
  }, [mode, settings.boardSize, settings.speed]);

  useEffect(() => {
    if (!login) {
      setMode(Mode.STOP);
      setCellsData(generateBoard(settings));
      setSettings(initialGameSettings);
    }
  }, [login]);

  const onChangeSettings = useCallback(
    (settings: GameSettings): void => setSettings(settings),
    []
  );

  const onStart = (): void => setMode(Mode.PLAY);

  const onPause = (): void => setMode(Mode.PAUSE);

  const onReStart = (): void => {
    setMode(Mode.STOP);
    setCellsData(generateBoard(settings));
  };

  const onCellClick = (coord: Coordinates): void => {
    setCellsData((prevCellsData) => toggleCell(coord, prevCellsData));
  };

  if (!login) return null;

  return (
    <FlexBox alignItems="center" flexDirection="vertical">
      <Header>Игра «Жизнь»</Header>
      <FlexBox gap="1rem">
        <FlexBox alignItems="center" flexDirection="vertical">
          <FlexBox flexDirection="vertical" width="100%">
            <label data-testid="greetingsUser">Здравствуйте, {login}!</label>
            <Button onClick={onLogout} data-testid="l-btn-logout">
              Выйти
            </Button>
          </FlexBox>
          <Settings
            settings={settings}
            onChangeSettings={onChangeSettings}
            onPause={onPause}
            onStart={onStart}
            onReStart={onReStart}
            mode={mode}
          />
        </FlexBox>
        <Board
          cellsData={cellsData}
          boardSize={settings.boardSize}
          onCellClick={onCellClick}
        />
      </FlexBox>
    </FlexBox>
  );
};

export default App;
