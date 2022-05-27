import React from "react";
import { fireEvent, render } from "@testing-library/react";
import App from "./App";

test("should buttons work", () => {
  const { getByTestId, getByText, queryByTestId } = render(<App />);

  expect(getByText("Игра «Жизнь»")).toBeInTheDocument();
  expect(getByTestId("formLogin")).toBeInTheDocument();
  expect(getByTestId("board")).toBeInTheDocument();
  expect(queryByTestId("settingsGame")).toBeNull();

  fireEvent.change(getByTestId("inputUserName"), {
    target: { value: "Username" },
  });
  fireEvent.click(getByTestId("l-btn-login"));

  expect(getByTestId("settingsGame")).toBeInTheDocument();

  const inputBoardSizeX = getByTestId("inputBoardSizeX");
  fireEvent.change(inputBoardSizeX, {
    target: { value: 60 },
  });
  fireEvent.click(getByTestId("s-btn-save"));
  expect(getByTestId(`${0}${59}`)).toBeInTheDocument();

  fireEvent.click(getByTestId("s-btn-start"));
  expect(queryByTestId("s-btn-start")).toBeNull();
  expect(getByTestId("s-btn-pause")).toBeInTheDocument();
  fireEvent.click(getByTestId("s-btn-pause"));
  expect(queryByTestId("s-btn-pause")).toBeNull();
  expect(queryByTestId("s-btn-start")).toBeInTheDocument();
});
