import reducer, { UserState, userActions } from "./userSlice";

jest.mock("../../localStorage", () => {
  return {
    loadLocalLogin: jest.fn(() => undefined),
  };
});

describe("userSlice reducer", () => {
  const initialState: UserState = {
    name: "",
  };

  const mockUserName = "%user%";

  it("setUser", () => {
    let newState = reducer(initialState, userActions.setUser(mockUserName));
    expect(newState.name).toBe(mockUserName);
    newState = reducer(newState, userActions.setUser(""));
    expect(newState.name).toBe("");
  });
});
