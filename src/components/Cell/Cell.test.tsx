import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import Cell from "./Cell";

test('call an alert when clicking on a Сell', () => {
    const cellData: number = 1
    window.alert = jest.fn()

    render(<Cell cellData={cellData} onClick={window.alert}/>)

    userEvent.click(screen.getByTestId(`cell-${cellData}`));
    expect(window.alert).toHaveBeenCalledTimes(1);
    expect(window.alert).toHaveBeenCalledWith(cellData);
})