import { createSlice } from "@reduxjs/toolkit";
import type { Portfolio } from "../../types/portfolio/portfolio";

type PortfoliosState = {
  portfolios: Portfolio[];
};

export const initialState: PortfoliosState = {
  portfolios: [],
};

export const globalReducer = createSlice({
  name: "portfolios",
  initialState,
  reducers: {
    getPortfolios: () => {},
    setPortfolios: (state, action) => {
      state.portfolios = action.payload;
    },
  },
});

export const { setPortfolios } = globalReducer.actions;

export default globalReducer.reducer;
