import React, { FC } from "react";
import { BoardSize, CellsData } from "../../types";
import Cell from "../Cell/Cell";
import styled from "styled-components";

interface BoardStyledProps {
  boardSize: BoardSize;
}

const BoardStyled = styled.div`
  border-right: 1px solid grey;
  border-bottom: 1px solid grey;
  width: ${(props: BoardStyledProps) => props.boardSize.x * 16}px;
  height: ${(props: BoardStyledProps) => props.boardSize.y * 16}px;
`;

interface BoardProps {
  cellsData: CellsData;
  boardSize: BoardSize;
  onCellClick: (cellData: number) => void;
}

const Board: FC<BoardProps> = ({ cellsData, boardSize, onCellClick }) => {
  return (
    <BoardStyled boardSize={boardSize}>
      {cellsData.map((row, iRow) => (
        <div key={iRow} style={{ display: "flex" }}>
          {row.map((cell, iCell) => (
            <Cell key={iCell} cellData={cell} onClick={onCellClick} />
          ))}
        </div>
      ))}
    </BoardStyled>
  );
};

export default Board;
