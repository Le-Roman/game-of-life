import React from "react";
import { fireEvent, render } from "@testing-library/react";
import App from "./App";
import { UserLoginContext } from "./components/UserLoginProvider/UserLoginProvider";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ROUTE } from "./constants";

describe("App", () => {
  it("render test if there is no user", () => {
    const state = { login: "" };
    const onLogin = jest.fn();
    const onLogout = jest.fn();

    const { queryByTestId } = render(
      <UserLoginContext.Provider value={{ state, onLogin, onLogout }}>
        <MemoryRouter initialEntries={[ROUTE.ROOT]}>
          <Routes>
            <Route path={ROUTE.ROOT} element={<App />} />
          </Routes>
        </MemoryRouter>
      </UserLoginContext.Provider>
    );

    expect(queryByTestId("Игра «Жизнь»")).toBeNull();
    expect(queryByTestId("greetingsUser")).toBeNull();
    expect(queryByTestId("l-btn-logout")).toBeNull();
    expect(queryByTestId("board")).toBeNull();
    expect(queryByTestId("settingsGame")).toBeNull();
  });

  it("should buttons work", () => {
    const state = { login: "username" };
    const onLogin = jest.fn();
    const onLogout = jest.fn();

    const { getByTestId, getByText, queryByTestId } = render(
      <UserLoginContext.Provider value={{ state, onLogin, onLogout }}>
        <MemoryRouter initialEntries={[ROUTE.ROOT]}>
          <Routes>
            <Route path={ROUTE.ROOT} element={<App />} />
          </Routes>
        </MemoryRouter>
      </UserLoginContext.Provider>
    );

    expect(getByText("Игра «Жизнь»")).toBeInTheDocument();
    expect(getByTestId("greetingsUser")).toBeInTheDocument();
    expect(getByTestId("greetingsUser")).toHaveTextContent(
      `Здравствуйте, ${state.login}!`
    );
    expect(getByTestId("l-btn-logout")).toBeInTheDocument();
    expect(getByTestId("board")).toBeInTheDocument();
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
});
