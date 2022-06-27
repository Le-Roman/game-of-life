import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadLocalLogin } from "../../localStorage";

export interface UserState {
  name: string;
}

const initialState: UserState = {
  name: loadLocalLogin() || "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
