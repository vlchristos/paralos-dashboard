import { createSlice } from "@reduxjs/toolkit";
import type { Portfolio } from "../../types/portfolio/portfolio";

type PortfoliosState = {
  portfolioItems: Portfolio[];
  selectedPortfolioId?: Portfolio;
};

export const initialState: PortfoliosState = {
  portfolioItems: [],
  selectedPortfolioId: undefined,
};

export const portfoliosReducer = createSlice({
  name: "portfolios",
  initialState,
  reducers: {
    getPortfolios: () => {},
    setPortfolios: (state, action) => {
      state.portfolioItems = action.payload;
    },
    setSelectedPortfolioId: (state, action) => {
      state.selectedPortfolioId = action.payload;
    },
  },
});

export const { getPortfolios, setPortfolios, setSelectedPortfolioId } =
  portfoliosReducer.actions;

export default portfoliosReducer.reducer;
