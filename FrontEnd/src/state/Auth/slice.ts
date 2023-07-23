import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthState } from "./types";

export const initialState: AuthState = {
  isAuthenticated: false,
  loading: true,
  error: "",
  activeItem: "home",
  user: {
    role: "admin",
    userId: "sangeetha@kon.co",
  },
  status: "none",
};

const AuthSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    login: (state) => {
      state.loading = true;
    },
    currentUserLogin: (state) => {
      state.loading = true;
    },

    loginSuccess: (state, { payload }: PayloadAction<any>) => {
      state.user = payload;
      state.isAuthenticated = true;
      state.loading = false;
    },

    loginError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
      state.isAuthenticated = false;
      state.loading = false;
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.loading = false;
    },

    logout: (state) => {
      state.loading = true;
    },
    setUserData: (state, data) => {
      state.user = data.payload;
      state.isAuthenticated = true;
    },
    signUpUser: (state, data) => {
      state.user = data.payload;
      state.isAuthenticated = true;
    },
    setStatus: (state, data) => {
      state.status = data.payload;
    },

    signUpUserLoading: (state, data) => {},
    setActiveItem: (state, data) => (state.activeItem = data.payload),
  },
});

export const {
  login,
  logoutSuccess,
  loginSuccess,
  loginError,
  logout,
  setUserData,
  setActiveItem,
  signUpUser,
  currentUserLogin,
  signUpUserLoading,
  setStatus,
} = AuthSlice.actions;

export default AuthSlice.reducer;
