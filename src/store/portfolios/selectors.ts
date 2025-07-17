import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "..";

export const selectPortfolioRawData = (state: RootState) =>
  state.portfolios.portfolioRawData;

export const selectPortfolioItems = (state: RootState) =>
  state.portfolios.portfolioItems;

export const selectActivePortfolioId = (state: RootState) =>
  state.portfolios.selectedPortfolioId;

export const selectActivePortfolio = createSelector(
  [selectPortfolioItems, selectActivePortfolioId],
  (portfolioItems, selectedPortfolioId) =>
    portfolioItems.find((item) => item.id === selectedPortfolioId) || null,
);

export const selectActivePortfolioAssets = createSelector(
  [selectPortfolioItems, selectActivePortfolioId],
  (portfolioItems, selectedPortfolioId) =>
    portfolioItems.find((item) => item.id === selectedPortfolioId)?.assets ||
    [],
);

export const selectActivePortfolioStats = createSelector(
  [selectActivePortfolio],
  (activePortfolio) => {
    if (!activePortfolio) return null;
    const latestHistoryRecord =
      activePortfolio.history[activePortfolio.history.length - 1];
    return {
      totalValue: Number(latestHistoryRecord?.total_value).toFixed(2) || 0,
      totalPnl: Number(latestHistoryRecord?.total_pnl).toFixed(2) || 0,
      dailyPnl: Number(latestHistoryRecord?.daily_pnl).toFixed(2) || 0,
    };
  },
);

export const selectActivePortfolioHistory = createSelector(
  [selectActivePortfolio],
  (activePortfolio) => {
    if (!activePortfolio) return [];
    return activePortfolio.history;
  },
);
