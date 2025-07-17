import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "..";

export const selectPortfolioItems = (state: RootState) =>
  state.portfolios.portfolioItems;

export const selectActivePortfolioId = (state: RootState) =>
  state.portfolios.selectedPortfolioId;

export const selectedPortfolioAssets = (state: RootState) =>
  state.portfolios.portfolioItems.find(
    (item) => item.id === state.portfolios.selectedPortfolioId,
  )?.assets || [];

export const selectStocks = (state: RootState) => state.today.stocks;

export const selectActivePortfolioStocks = createSelector(
  [selectedPortfolioAssets, selectStocks],
  (assets, stocks) => {
    if (!assets || assets.length === 0) return stocks;
    return stocks.filter((stock) =>
      assets.some((asset) => asset.symbol === stock.symbol),
    );
  },
);
