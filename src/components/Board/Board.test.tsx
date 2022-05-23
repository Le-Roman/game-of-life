import React from "react";
import { render, screen } from "@testing-library/react";
import Board from "./Board";
import { BoardSize, CellsData } from "../../types";
import { generateBoardXY } from "../../utils";

test("render all celss in Border component", () => {
  const boardSize: BoardSize = { x: 10, y: 10 };
  const cellsData: CellsData = generateBoardXY(boardSize);
  const onCellClick = jest.fn();

  render(
    <Board
      boardSize={boardSize}
      cellsData={cellsData}
      onCellClick={onCellClick}
    />
  );

  expect(screen.getAllByTestId(/cell/).length).toEqual(
    boardSize.x * boardSize.y
  );
});
