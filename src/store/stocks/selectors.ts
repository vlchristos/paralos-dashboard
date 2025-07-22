import { createSelector } from "@reduxjs/toolkit";
import Fuse from "fuse.js";
import type { RootState } from "..";

export const selectAvailableStocks = (state: RootState) => {
  return state.stocks.availableStocks;
};

export const selectActiveStock = (state: RootState) =>
  state.stocks.selectedStock;

export const selectActiveSector = (state: RootState) =>
  state.stocks.selectedSector;

export const selectActivePeriod = (state: RootState) => state.stocks.period;

export const selectActiveStockData = (state: RootState) =>
  state.stocks.selectedStockData;

export const selectSectorsFromAvailableStocks = createSelector(
  [selectAvailableStocks],
  (availableStocks) => {
    const sectors = new Set<string>();
    availableStocks.forEach((stock) => {
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
  [selectAvailableStocks, (state: RootState) => state.stocks.searchTerm],
  (availableStocks, searchTerm) => {
    const fuse = new Fuse(availableStocks, {
      keys: ["name", "symbol"],
      threshold: 0.3,
    });
    if (!searchTerm) return availableStocks;
    const results = fuse.search(searchTerm);
    return results.map((result) => result.item);
  },
);

export const selectPortfolioStocksBySector = createSelector(
  [selectAvailableStocks, selectActiveSector],
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

export const selectActiveStockDetails = createSelector(
  [selectAvailableStocks, selectActiveStock],
  (availableStocks, selectedStock) => {
    if (!selectedStock) return null;
    const stock = availableStocks.find(
      (stock) => stock.symbol === selectedStock,
    );
    return {
      symbol: stock?.symbol || "",
      name: stock?.name || "",
      sector: stock?.sector || "",
    };
  },
);

export const selectActiveStockDataByPeriod = createSelector(
  [selectActiveStockData, selectActivePeriod],
  (activeStockData, activePeriod) => {
    while (activeStockData.length === 0 || !activePeriod) {
      return []; // if no stock data is available, return an empty array
    }

    if (activePeriod === "max") {
      return activeStockData; // if period is 'max', return all data
    }

    let periodMonths: number;

    switch (activePeriod) {
      case "1m":
        periodMonths = 1;
        break;
      case "6m":
        periodMonths = 6;
        break;
      case "1y":
        periodMonths = 12;
        break;
      default:
        return []; // if no valid period, return empty array
    }

    const mostRecent = new Date(
      activeStockData[activeStockData.length - 1].date,
    );

    function getPastDate(monthsAgo: number) {
      const pastDate = new Date(mostRecent);
      pastDate.setMonth(pastDate.getMonth() - monthsAgo);
      return pastDate;
    }

    const pastDate = getPastDate(periodMonths);

    return activeStockData.filter((data) => {
      const dataDate = new Date(data.date);
      return dataDate >= pastDate && dataDate <= mostRecent;
    });
  },
);
