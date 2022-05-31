import React, { FC, memo } from "react";
import { BoardSize, CellsData, Coordinates } from "../../types";
import Cell from "../Cell/Cell";
import styled from "styled-components";
import { CELL_SIZE } from "../../constants";

interface BoardStyledProps {
  boardSize: BoardSize;
  cellSize: number;
}

const BoardStyled = styled.div<BoardStyledProps>`
  width: ${({ boardSize: { x }, cellSize }) => x * cellSize}px;
  height: ${({ boardSize: { y }, cellSize }) => y * cellSize}px;
`;

interface BoardProps {
  cellsData: CellsData;
  boardSize: BoardSize;
  onCellClick: (coord: Coordinates) => void;
}

const Board: FC<BoardProps> = memo(({ cellsData, boardSize, onCellClick }) => {
  return (
    <BoardStyled boardSize={boardSize} cellSize={CELL_SIZE} data-testid="board">
      {cellsData.map((row, iRow) => (
        <div key={iRow} style={{ display: "flex" }}>
          {row.map((cell, iCell) => (
            <Cell
              key={`${iRow}${iCell}`}
              cellData={cell}
              x={iCell}
              y={iRow}
              onClick={onCellClick}
            />
          ))}
        </div>
      ))}
    </BoardStyled>
  );
});

export default Board;
