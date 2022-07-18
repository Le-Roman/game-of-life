import styled from "styled-components";
import { CellState } from "../types";

interface CellStyledProps {
  cellSize: number;
  cellData: CellState;
}

export const CellStyled = styled.div<CellStyledProps>`
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
