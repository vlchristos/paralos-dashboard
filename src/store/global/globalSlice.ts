import { createSlice } from "@reduxjs/toolkit";

type GlobalState = {
  systemThemeMode: string;
  mainMenuOpen: boolean;
};

export const initialState: GlobalState = {
  systemThemeMode: "",
  mainMenuOpen: true,
};

export const globalReducer = createSlice({
  name: "global",
  initialState,
  reducers: {
    setSystemThemeMode: (state, action) => {
      state.systemThemeMode = action.payload;
    },
    toggleMainMenu: (state) => {
      state.mainMenuOpen = !state.mainMenuOpen;
    },
  },
});

export const { setSystemThemeMode, toggleMainMenu } = globalReducer.actions;

export default globalReducer.reducer;
