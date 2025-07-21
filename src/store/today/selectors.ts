import { createSelector } from "@reduxjs/toolkit";
import Fuse from "fuse.js";
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

export const selectSelectedSector = (state: RootState) =>
  state.today.selectedSector;

export const selectActivePortfolioStocks = createSelector(
  [selectedPortfolioAssets, selectStocks],
  (assets, stocks) => {
    if (!assets || assets.length === 0) return stocks;
    return stocks.filter((stock) =>
      assets.some((asset) => asset.symbol === stock.symbol),
    );
  },
);

export const selectSectorsByActivePortfolio = createSelector(
  [selectActivePortfolioStocks],
  (activePortfolioStocks) => {
    const sectors = new Set<string>();
    activePortfolioStocks.forEach((stock) => {
      if (stock.sector) {
        sectors.add(stock.sector);
      }
    });
    const sectorsArray = Array.from(sectors);
    return sectorsArray.map((sector) => ({
      name: sector,
      id: sector.toLowerCase().replace(/\s+/g, "-"),
    }));
  },
);

export const selectStocksBySearchTerm = createSelector(
  [selectActivePortfolioStocks, (state: RootState) => state.today.searchTerm],
  (activePortfolioStocks, searchTerm) => {
    const fuse = new Fuse(activePortfolioStocks, {
      keys: ["name", "symbol"],
      threshold: 0.3,
    });
    if (!searchTerm) return activePortfolioStocks;
    const results = fuse.search(searchTerm);
    return results.map((result) => result.item);
  },
);

export const selectPortfolioStocksBySector = createSelector(
  [selectActivePortfolioStocks, selectSelectedSector],
  (activePortfolioStocks, selectedSector) => {
    if (!selectedSector) return activePortfolioStocks;
    return activePortfolioStocks.filter(
      (stock) =>
        stock.sector.toLowerCase().replace(/\s+/g, "-") === selectedSector,
    );
  },
);

export const selectFilteredStocks = createSelector(
  [selectPortfolioStocksBySector, selectStocksBySearchTerm],
  (stocksBySector, stocksBySearchTerm) => {
    if (!stocksBySector || !stocksBySearchTerm) return [];
    return stocksBySector.filter((stock) =>
      stocksBySearchTerm.some(
        (searchStock) => searchStock.symbol === stock.symbol,
      ),
    );
  },
);
