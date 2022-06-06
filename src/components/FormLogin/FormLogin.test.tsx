import { render, cleanup, fireEvent } from "@testing-library/react";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ROUTE } from "../../constants";
import {
  UserLoginContext,
  UserLoginProvider,
} from "../UserLoginProvider/UserLoginProvider";
import FormLogin from "./FormLogin";

afterEach(cleanup);

const mockUserName = "UserName";

describe("FormLogin", () => {
  it("render", () => {
    const { getByTestId, getByText } = render(
      <UserLoginProvider>
        <MemoryRouter initialEntries={[ROUTE.AUTH]}>
          <Routes>
            <Route path={ROUTE.AUTH} element={<FormLogin />} />
          </Routes>
        </MemoryRouter>
      </UserLoginProvider>
    );

    expect(getByText("Игра «Жизнь»")).toBeInTheDocument();
    const inputUserName = getByTestId("inputUserName");
    expect(inputUserName).toBeInTheDocument();
    expect(inputUserName).toHaveValue("");
    expect(inputUserName).toHaveAttribute("placeholder", "Введите ваше имя");
    expect(getByTestId("l-btn-login")).toBeInTheDocument();
    expect(getByTestId("l-btn-login")).toHaveTextContent(/Старт/);
  });

  it("enter username in input and click on start", () => {
    const state = { login: "" };
    const onLogin = jest.fn();
    const onLogout = jest.fn();
    const { getByTestId, queryByTestId } = render(
      <UserLoginContext.Provider value={{ state, onLogin, onLogout }}>
        <MemoryRouter initialEntries={[ROUTE.AUTH]}>
          <Routes>
            <Route path={ROUTE.ROOT} element={<FormLogin />} />
            <Route path={ROUTE.AUTH} element={<FormLogin />} />
          </Routes>
        </MemoryRouter>
      </UserLoginContext.Provider>
    );

    const inputUserName = getByTestId("inputUserName");
    fireEvent.change(inputUserName, { target: { value: mockUserName } });

    expect(inputUserName).toHaveValue(mockUserName);
    fireEvent.click(getByTestId("l-btn-login"));
    expect(onLogin).toBeCalledTimes(1);
    expect(onLogin).toBeCalledWith(mockUserName);
    expect(queryByTestId("inputUserName")).toHaveValue("");
  });

  it("render when user login and should logout", () => {
    const state = { login: mockUserName };
    const onLogout = jest.fn();
    const onLogin = jest.fn();
    const { getByTestId } = render(
      <UserLoginContext.Provider value={{ state, onLogin, onLogout }}>
        <MemoryRouter initialEntries={[ROUTE.AUTH]}>
          <Routes>
            <Route path={ROUTE.AUTH} element={<FormLogin />} />
          </Routes>
        </MemoryRouter>
      </UserLoginContext.Provider>
    );

    expect(getByTestId("inputUserName")).toBeInTheDocument();
    expect(getByTestId("inputUserName")).toHaveValue("");
  });
});
