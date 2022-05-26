import React, { FC } from "react";
import styled from "styled-components";
import { cellSize } from "../../constants";
import { CellState, Coordinates } from "../../types";

interface CellStyledProps {
  cellSize: number;
  cellData: CellState;
}

const CellStyled = styled.div`
  background-color: ${({ cellData }: CellStyledProps) =>
    cellData ? "black" : "white"};
  width: ${({ cellSize }: CellStyledProps) => cellSize}px;
  height: ${({ cellSize }: CellStyledProps) => cellSize}px;
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

const Cell: FC<CellProps> = ({ cellData, x, y, onClick }) => {
  const handleOnClick = () => onClick({ x, y });
  return (
    <CellStyled
      data-testid={`${y}${x}`}
      onClick={handleOnClick}
      cellSize={cellSize}
      cellData={cellData}
    />
  );
};

export default Cell;
