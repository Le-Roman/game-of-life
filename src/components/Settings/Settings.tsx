import React, { ChangeEvent, FC, memo, useCallback, useState } from "react";
import { Button } from "../../elements/Button/Button";
import { FlexBox } from "../../elements/FlexBox";
import InputRange from "../../elements/InputRange/InputRange";
import { GameSettings, Mode } from "../../types";

interface SettingsPropsType {
  settings: GameSettings;
  onChangeSettings: (settings: GameSettings) => void;
  onStart: () => void;
  onPause: () => void;
  onReStart: () => void;
  mode: Mode;
}

const Settings: FC<SettingsPropsType> = ({
  settings,
  onChangeSettings,
  onStart,
  onPause,
  onReStart,
  mode,
}) => {
  const { boardSize, boardFillPercent, speed } = settings;

  const [boardSizeX, setBoardSizeX] = useState<number>(boardSize.x);
  const [boardSizeY, setBoardSizeY] = useState<number>(boardSize.y);
  const [boardFill, setBoardFill] = useState<number>(boardFillPercent);
  const [gameSpeed, setGameSpeed] = useState<number>(speed);
  const [changed, setChanged] = useState(false);

  const getNewSettings = (): GameSettings => {
    return {
      boardFillPercent: boardFill,
      speed: gameSpeed,
      boardSize: {
        x: boardSizeX,
        y: boardSizeY,
      },
    };
  };

  const save = (): void => {
    onChangeSettings(getNewSettings());
    setChanged(false);
  };

  const cancel = (): void => {
    setBoardSizeX(boardSize.x);
    setBoardSizeY(boardSize.y);
    setGameSpeed(speed);
    setChanged(false);
  };

  const reRun = (): void => {
    onReStart();
    setChanged(false);
  };

  const onChangeBoardSizeX = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setBoardSizeX(parseInt(e.target.value, 10)), setChanged(true);
  }, []);

  const onChangeBoardSizeY = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setBoardSizeY(parseInt(e.target.value, 10));
    setChanged(true);
  }, []);

  const onChangeBoardFillPercent = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setBoardFill(parseInt(e.target.value, 10));
      setChanged(true);
    },
    []
  );

  const onChangeSpeed = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setGameSpeed(parseInt(e.target.value, 10));
    setChanged(true);
  }, []);

  return (
    <FlexBox flexDirection={"vertical"} data-testid="settingsGame">
      <label htmlFor="boardSizeX">Ширина поля</label>
      <InputRange
        id="boardSizeX"
        data-testid="inputBoardSizeX"
        value={boardSizeX}
        min={10}
        max={80}
        onChange={onChangeBoardSizeX}
      />
      <label htmlFor="boardSizeY">Высота поля</label>
      <InputRange
        id="boardSizeY"
        data-testid="inputBoardSizeY"
        value={boardSizeY}
        min={10}
        max={80}
        onChange={onChangeBoardSizeY}
      />
      <label htmlFor="speed">Скорость</label>
      <InputRange
        id="speed"
        data-testid="inputSpeed"
        value={gameSpeed}
        min={1}
        max={5}
        onChange={onChangeSpeed}
      />
      <label htmlFor="boardFillPercent">Начальный процент заполнения</label>
      <InputRange
        id="boardFillPercent"
        data-testid="inputBoardFillPercent"
        value={boardFill}
        min={0}
        max={99}
        onChange={onChangeBoardFillPercent}
        disabled={mode !== Mode.STOP}
      />
      <FlexBox justifyContent={"space-around"}>
        <Button onClick={save} disabled={!changed} data-testid="s-btn-save">
          Применить
        </Button>
        <Button onClick={cancel} disabled={!changed} data-testid="s-btn-cancel">
          Отменить
        </Button>
      </FlexBox>
      {(mode === Mode.PLAY || mode === Mode.PAUSE) && (
        <Button type="button" onClick={reRun} data-testid="s-btn-reStart">
          Начать заново
        </Button>
      )}
      {mode === Mode.PLAY ? (
        <Button onClick={onPause} data-testid="s-btn-pause">
          Пауза
        </Button>
      ) : (
        <Button onClick={onStart} mode="primary" data-testid="s-btn-start">
          {mode === Mode.PAUSE ? "Возобновить" : "Старт"}
        </Button>
      )}
    </FlexBox>
  );
};

export default Settings;
