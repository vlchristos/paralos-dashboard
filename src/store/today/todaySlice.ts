import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Stock } from "../../types/today/today";

type TodayState = {
  stocks: Stock[];
  selectedSector: string;
  searchTerm: string;
};

export const initialState: TodayState = {
  stocks: [],
  selectedSector: "",
  searchTerm: "",
};

export const todayReducer = createSlice({
  name: "today",
  initialState,
  reducers: {
    getTodayStocks: () => {},
    setTodayStocks: (state: TodayState, action: PayloadAction<Stock[]>) => {
      state.stocks = action.payload;
    },
    setSelectedSector: (state: TodayState, action: PayloadAction<string>) => {
      state.selectedSector = action.payload;
    },
    setSearchTerm: (state: TodayState, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const {
  getTodayStocks,
  setTodayStocks,
  setSelectedSector,
  setSearchTerm,
} = todayReducer.actions;

export default todayReducer.reducer;
