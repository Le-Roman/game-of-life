import React, { useState } from "react";
import { BoardSize, CellsData } from "./types";
import { generateBoardXY } from "./utils";
import Board from "./components/Board/Board";
import styled from "styled-components";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const App = () => {
  const [boardSize] = useState<BoardSize>({ x: 25, y: 25 });
  const [cellsData] = useState<CellsData>(generateBoardXY(boardSize));

  const onCellClick = (cellData: number): void => {
    alert(`Номер квадрата: ${cellData}`);
  };

  return (
    <AppContainer>
      <h1>Нажмите на клетку</h1>
      <Board
        cellsData={cellsData}
        boardSize={boardSize}
        onCellClick={onCellClick}
      />
    </AppContainer>
  );
};

export default App;
