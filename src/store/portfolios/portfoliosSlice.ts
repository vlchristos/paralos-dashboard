import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  Portfolio,
  PortfolioRawData,
} from "../../types/portfolio/portfolio";

type PortfoliosState = {
  portfolioItems: Portfolio[];
  selectedPortfolioId: string | null;
  portfolioRawData?: PortfolioRawData[];
};

export const initialState: PortfoliosState = {
  portfolioItems: [],
  selectedPortfolioId: null,
  portfolioRawData: undefined,
};

export const portfoliosReducer = createSlice({
  name: "portfolios",
  initialState,
  reducers: {
    getPortfolios: () => {},
    setPortfoliosRawData: (
      state: PortfoliosState,
      action: PayloadAction<PortfolioRawData[]>,
    ) => {
      state.portfolioRawData = action.payload;
    },
    setPortfolios: (
      state: PortfoliosState,
      action: PayloadAction<Portfolio[]>,
    ) => {
      state.portfolioItems = action.payload;
    },
    setSelectedPortfolioId: (
      state: PortfoliosState,
      action: PayloadAction<string | null>,
    ) => {
      state.selectedPortfolioId = action.payload;
    },
  },
});

export const {
  getPortfolios,
  setPortfolios,
  setSelectedPortfolioId,
  setPortfoliosRawData,
} = portfoliosReducer.actions;

export default portfoliosReducer.reducer;
