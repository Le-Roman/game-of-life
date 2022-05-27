import React, { FC, useState } from "react";
import { BoardSize, CellsData, Coordinates } from "../../types";
import Cell from "../Cell/Cell";
import styled from "styled-components";
import { generateBoardXY } from "../../utils";
import { cellSize } from "../../constants";

interface BoardStyledProps {
  boardSize: BoardSize;
  cellSize: number;
}

const BoardStyled = styled.div`
  width: ${({ boardSize: { x }, cellSize }: BoardStyledProps) =>
    x * cellSize}px;
  height: ${({ boardSize: { y }, cellSize }: BoardStyledProps) =>
    y * cellSize}px;
`;

interface BoardProps {
  cellsData: CellsData;
  boardSize: BoardSize;
  onCellClick: (coord: Coordinates) => void;
}

const Board: FC<BoardProps> = ({ cellsData, boardSize, onCellClick }) => {
  return (
    <BoardStyled boardSize={boardSize} cellSize={cellSize}>
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
};

export default Board;
