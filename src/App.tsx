import React, { useCallback, useEffect, useState } from "react";
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
import FormLogin from "./components/FormLogin/FormLogin";
import { Header } from "./elements/Header";

const initialGameSettings: GameSettings = {
  boardSize: { x: 50, y: 50 },
  boardFillPercent: 15,
  speed: 3,
};

const App = () => {
  const [settings, setSettings] = useState<GameSettings>(initialGameSettings);
  const [cellsData, setCellsData] = useState<CellsData>([] as CellsData);
  const [mode, setMode] = useState<Mode>(Mode.STOP);
  const [login, setLogin] = useState<string>("");

  useEffect(() => {
    setCellsData(resizeBoard(cellsData, settings.boardSize));
  }, [settings.boardSize]);

  useEffect(() => {
    setCellsData(generateBoard(settings));
  }, [settings.boardFillPercent]);

  useEffect(() => {
    let playGame: NodeJS.Timer;
    if (mode === Mode.PLAY) {
      playGame = setInterval(() => {
        setCellsData((prevCellsData) => nextGeneration(prevCellsData));
      }, speedToMs(settings.speed));
    } else {
      setCellsData((prevCellsData) =>
        resizeBoard(prevCellsData, settings.boardSize)
      );
    }
    return () => clearInterval(playGame);
  }, [mode, settings.boardSize, settings.speed]);

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

  const onLogin = (value: string) => {
    value ? setLogin(value) : alert("Вы не ввели имя!");
  };

  const onLogout = () => {
    setLogin("");
    setMode(Mode.STOP);
    setCellsData(generateBoard(settings));
    setSettings(initialGameSettings);
  };

  return (
    <FlexBox alignItems="center" flexDirection="vertical">
      <Header>Игра «Жизнь»</Header>
      <FlexBox gap="1rem">
        <FlexBox alignItems="center" flexDirection="vertical">
          <FormLogin login={login} onLogin={onLogin} onLogout={onLogout} />
          {login && (
            <Settings
              settings={settings}
              onChangeSettings={onChangeSettings}
              onPause={onPause}
              onStart={onStart}
              onReStart={onReStart}
              mode={mode}
            />
          )}
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
