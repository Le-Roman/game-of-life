import React, { FC } from "react";
import styled from "styled-components";

const CellStyled = styled.div`
  width: 16px;
  height: 16px;
  border-top: 1px solid grey;
  border-left: 1px solid grey;
  box-sizing: border-box;

  &:hover {
    border: 3px solid black;
  }
`;

interface CellProps {
  cellData: number;
  onClick: (cellData: number) => void;
}

const Cell: FC<CellProps> = ({ cellData, onClick }) => {
  return <CellStyled data-testid={`cell-${cellData}`} onClick={() => onClick(cellData)} />;
};

export default Cell;
