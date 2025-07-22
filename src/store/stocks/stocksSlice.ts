import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Stock } from "../../types/today/today";
import type { StockData } from "../../types/stocks/stocks";

export const PERIODS = [
  { value: "1m", label: "1M" },
  { value: "6m", label: "6M" },
  { value: "1y", label: "1Y" },
  { value: "max", label: "Max" },
];

export type Period = "1m" | "6m" | "1y" | "max";

type StocksState = {
  availableStocks: Stock[];
  selectedSector: string;
  searchTerm: string;
  selectedStock: string;
  selectedStockData: StockData[];
  period: Period;
};

export const initialState: StocksState = {
  availableStocks: [],
  selectedSector: "",
  searchTerm: "",
  selectedStock: "",
  selectedStockData: [],
  period: "1m",
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
      state.period = action.payload;
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
