import React, { FC, memo, useCallback } from "react";
import styled from "styled-components";
import { CELL_SIZE } from "../../constants";
import { CellState, Coordinates } from "../../types";

interface CellStyledProps {
  cellSize: number;
  cellData: CellState;
}

const CellStyled = styled.div<CellStyledProps>`
  background-color: ${({ cellData }) => (cellData ? "black" : "white")};
  width: ${({ cellSize }) => cellSize}px;
  height: ${({ cellSize }) => cellSize}px;
  border: 1px solid grey;
  box-sizing: border-box;
  border-radius: 50%;

  &:hover {
    border: 2px solid black;
  }
`;

interface CellProps {
  cellData: CellState;
  x: number;
  y: number;
  onClick: (coord: Coordinates) => void;
}

const Cell: FC<CellProps> = memo(({ cellData, x, y, onClick }) => {
  const handleOnClick = useCallback(() => onClick({ x, y }), [onClick, x, y]);
  return (
    <CellStyled
      data-testid={`${y}${x}`}
      onClick={handleOnClick}
      cellSize={CELL_SIZE}
      cellData={cellData}
    />
  );
});

export default Cell;
