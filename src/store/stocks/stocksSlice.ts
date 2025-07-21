import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Stock } from "../../types/today/today";

type StocksState = {
  availableStocks: Stock[];
  selectedSector: string;
  searchTerm: string;
};

export const initialState: StocksState = {
  availableStocks: [],
  selectedSector: "",
  searchTerm: "",
};

export const stocksReducer = createSlice({
  name: "stocks",
  initialState,
  reducers: {
    getAvailableStocks: () => {},
    setAvailableStocks: (
      state: StocksState,
      action: PayloadAction<Stock[]>,
    ) => {
      state.availableStocks = action.payload;
    },
    setSelectedSector: (state: StocksState, action: PayloadAction<string>) => {
      state.selectedSector = action.payload;
    },
    setSearchTerm: (state: StocksState, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const {
  getAvailableStocks,
  setAvailableStocks,
  setSelectedSector,
  setSearchTerm,
} = stocksReducer.actions;

export default stocksReducer.reducer;
