import { render, cleanup, fireEvent } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import FormLogin from "./FormLogin";
import { store } from "../../state/store";
import { userActions } from "../../state/userSlice/userSlice";

afterEach(cleanup);

jest.mock("next/router", () => {
  return {
    useRouter: jest.fn(() => []),
  };
});

const mockUserName = "UserName";

describe("FormLogin", () => {
  it("render", () => {
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <FormLogin />
      </Provider>
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
    jest.spyOn(userActions, "setUser");
    const { getByTestId, queryByTestId } = render(
      <Provider store={store}>
        <FormLogin />
      </Provider>
    );

    const inputUserName = getByTestId("inputUserName");
    fireEvent.change(inputUserName, { target: { value: mockUserName } });

    expect(inputUserName).toHaveValue(mockUserName);
    fireEvent.click(getByTestId("l-btn-login"));
    expect(userActions.setUser).toBeCalledTimes(1);
    expect(userActions.setUser).toBeCalledWith(mockUserName);
    expect(queryByTestId("inputUserName")).toHaveValue("");
  });
});
