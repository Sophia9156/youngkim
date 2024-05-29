import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export * from "./sagas";

interface LoginState {
  loading: boolean;
  isLoggingIn: boolean | null;
  user: string | null;
}

const initialState: LoginState = {
  loading: false,
  isLoggingIn: null,
  user: null,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginRequest: (state) => ({
      ...state,
      loading: true,
      user: null,
    }),
    loginSuccess: (state, action: PayloadAction<string>) => ({
      loading: false,
      isLoggingIn: true,
      user: action.payload,
    }),
    loginFailure: (state) => ({
      ...state,
      loading: false,
      user: null,
    }),
    logoutRequest: (state) => ({
      ...state,
      loading: true,
    }),
    logoutSuccess: (state) => ({
      loading: false,
      isLoggingIn: false,
      user: null,
    }),
    logoutFailure: (state) => ({
      ...state,
      loading: false,
      user: state.user,
    }),
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
} = loginSlice.actions;
export default loginSlice.reducer;
