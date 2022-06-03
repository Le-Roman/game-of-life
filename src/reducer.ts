import { ActionType } from "./types";
import { Action, State } from "./types";

export const initialState: State = { login: "" };

export const reducer = (state: State, action: Action): State => {
  console.log({ action });

  switch (action.type) {
    case ActionType.LOGIN:
      return { ...state, login: action.payload };
    case ActionType.LOGOUT:
      return { ...state, login: "" };
    default:
      return state;
  }
};
