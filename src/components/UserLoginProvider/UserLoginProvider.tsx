import React from "react";
import { createContext, useReducer } from "react";
import { initialState, reducer } from "../../reducer";
import { ActionType, State } from "../../types";

interface ContextState {
  state: State;
  onLogin: (login: string) => void;
  onLogout: () => void;
}

export const UserLoginContext = createContext({} as ContextState);

export const UserLoginProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onLogin = (login: string) =>
    login
      ? dispatch({ type: ActionType.LOGIN, payload: login })
      : alert("Вы не ввели имя!");

  const onLogout = () => {
    dispatch({
      type: ActionType.LOGOUT,
    });
  };

  return (
    <UserLoginContext.Provider value={{ state, onLogin, onLogout }}>
      {children}
    </UserLoginContext.Provider>
  );
};