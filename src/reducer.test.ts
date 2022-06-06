import { reducer } from "./reducer";
import { ActionType, State } from "./types";

describe("reducer", () => {
  const initialState: State = { login: "" };
  it("return default value", () => {
    const result = reducer(initialState, { type: ActionType.TEST });
    expect(result).toEqual(initialState);
  });

  it(`return with action ${ActionType.LOGIN}`, () => {
    const result = reducer(initialState, {
      type: ActionType.LOGIN,
      payload: "username",
    });
    expect(result).toEqual({ login: "username" });
  });

  it(`return with action ${ActionType.LOGOUT}`, () => {
    const result = reducer(initialState, { type: ActionType.LOGOUT });
    expect(result).toEqual(initialState);
  });
});
