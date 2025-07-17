import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TodayStock } from "../../types/today/today";

type TodayState = {
  stocks: TodayStock[];
};

export const initialState: TodayState = {
  stocks: [],
};

export const todayReducer = createSlice({
  name: "today",
  initialState,
  reducers: {
    getTodayStocks: () => {},
    setTodayStocks: (
      state: TodayState,
      action: PayloadAction<TodayStock[]>,
    ) => {
      state.stocks = action.payload;
    },
  },
});

export const { getTodayStocks, setTodayStocks } = todayReducer.actions;

export default todayReducer.reducer;
