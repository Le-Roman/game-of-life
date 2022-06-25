import { saveLocalLogin } from "../../../localStorage";
import { userActions } from "../../userSlice/userSlice";
import { put } from "redux-saga/effects";

type ActionLogin = { type: typeof userActions.login.type; payload: string };

export function* onLogin(action: ActionLogin) {
  const name = action.payload;
  saveLocalLogin(name);
  yield put(userActions.setUser(name));
}

export function* onLogout() {
  saveLocalLogin("");
  yield put(userActions.setUser(""));
}
