import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Stock } from "../../types/today/today";
import type { StockData } from "../../types/stocks/stocks";

export const PERIODS = [
  { value: "1", label: "1M" },
  { value: "6", label: "6M" },
  { value: "12", label: "1Y" },
  { value: "max", label: "Max" },
];

export type Period = "1" | "6" | "1" | "max";

type StocksState = {
  availableStocks: Stock[];
  selectedSector: string;
  searchTerm: string;
  selectedStock: string;
  selectedStockData: StockData[];
  periodMonths: Period;
};

export const initialState: StocksState = {
  availableStocks: [],
  selectedSector: "",
  searchTerm: "",
  selectedStock: "",
  selectedStockData: [],
  periodMonths: "1",
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
    setSelectedStock: (state: StocksState, action: PayloadAction<string>) => {
      state.selectedStock = action.payload;
    },
    setSelectedStockData: (
      state: StocksState,
      action: PayloadAction<StockData[]>,
    ) => {
      state.selectedStockData = action.payload;
    },
    setPeriod: (state: StocksState, action: PayloadAction<Period>) => {
      state.periodMonths = action.payload;
    },
    clearSelectedStockData: (state: StocksState) => {
      state.selectedStock = "";
      state.selectedStockData = [];
    },
  },
});

export const {
  getAvailableStocks,
  setAvailableStocks,
  setSelectedSector,
  setSearchTerm,
  setSelectedStock,
  setSelectedStockData,
  setPeriod,
  clearSelectedStockData,
} = stocksReducer.actions;

export default stocksReducer.reducer;
