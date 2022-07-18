import { configureStore } from "@reduxjs/toolkit";
import appSlice, { initialState } from "./appSlice/appSlice";
import userSlice from "./userSlice/userSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga/saga";
import { loadLocalAppState, loadLocalLogin } from "../localStorage";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    app: appSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
