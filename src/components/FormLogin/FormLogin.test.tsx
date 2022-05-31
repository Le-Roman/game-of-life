import { render, cleanup, fireEvent } from "@testing-library/react";
import React from "react";
import FormLogin from "./FormLogin";

afterEach(cleanup);

const mockUserName = "UserName";

describe("FormLogin", () => {
  it("render", () => {
    const { getByTestId, queryByTestId } = render(
      <FormLogin login={""} onLogin={() => null} onLogout={() => null} />
    );

    const inputUserName = getByTestId("inputUserName");
    expect(inputUserName).toBeInTheDocument();
    expect(inputUserName).toHaveValue("");
    expect(inputUserName).toHaveAttribute("placeholder", "Введите ваше имя");
    expect(getByTestId("l-btn-login")).toBeInTheDocument();
    expect(getByTestId("l-btn-login")).toHaveTextContent(/Старт/);
    expect(queryByTestId("greetingsUser")).toBeNull();
    expect(queryByTestId("l-btn-logout")).toBeNull();
  });

  it("enter username in input and click on start", () => {
    const onLogin = jest.fn();
    const { getByTestId } = render(
      <FormLogin login={""} onLogin={onLogin} onLogout={() => null} />
    );

    const inputUserName = getByTestId("inputUserName");
    fireEvent.change(inputUserName, { target: { value: mockUserName } });

    expect(inputUserName).toHaveValue(mockUserName);
    fireEvent.click(getByTestId("l-btn-login"));
    expect(onLogin).toBeCalledTimes(1);
    expect(onLogin).toBeCalledWith(mockUserName);
    expect(inputUserName).toHaveValue("");
  });

  it("render when user login and should logout", () => {
    const onLogout = jest.fn();
    const { getByTestId, queryByTestId } = render(
      <FormLogin
        login={mockUserName}
        onLogin={() => null}
        onLogout={onLogout}
      />
    );

    expect(queryByTestId("inputUserName")).toBeNull();
    expect(queryByTestId("l-btn-login")).toBeNull();
    expect(getByTestId("greetingsUser")).toBeInTheDocument();
    expect(getByTestId("greetingsUser")).toHaveTextContent(
      `Здравствуйте, ${mockUserName}!`
    );
    expect(getByTestId("l-btn-logout")).toBeInTheDocument();
    fireEvent.click(getByTestId("l-btn-logout"));
    expect(onLogout).toBeCalledTimes(1);
  });
});
