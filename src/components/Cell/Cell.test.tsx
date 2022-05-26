import React from "react";
import { cleanup, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Cell from "./Cell";
import { CellState } from "../../types";

afterEach(cleanup);

describe("Cell", () => {
  it("click Сell", () => {
    const cellData: CellState = 1;
    const x = 10;
    const y = 10;
    const onClick = jest.fn();

    const { getByTestId } = render(
      <Cell cellData={cellData} x={x} y={y} onClick={onClick} />
    );

    userEvent.click(getByTestId(`${y}${x}`));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith({ x, y });
  });
});
