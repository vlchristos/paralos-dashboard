import { put, select, takeLatest } from "redux-saga/effects";
import { getTodayStocks, setTodayStocks } from "./todaySlice";
import todayStocksRawData from "../../raw_data/today.json";
import type { PortfolioRawData } from "../../types/portfolio/portfolio";
import { selectPortfolioRawData } from "../portfolios/selectors";
import type { Stock } from "../../types/today/today";

function* loadTodayStocks() {
  try {
    // Simulate an API call
    yield new Promise((resolve) => setTimeout(resolve, 1000));
    let todayStocks = todayStocksRawData;

    const portfoliosRawData: PortfolioRawData[] = [];

    while (portfoliosRawData.length === 0) {
      // Select the portfolio raw data from the state
      const rawData: PortfolioRawData[] = yield select(selectPortfolioRawData);

      if (rawData) {
        portfoliosRawData.push(...rawData);
      } else {
        // If no data is found, wait for a while before trying again
        yield new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    todayStocks = todayStocks.map((stock) => {
      const portfolio = portfoliosRawData.find(
        (portfolio) => portfolio.symbol === stock.symbol,
      );

      return {
        ...stock,
        sector: portfolio?.sector || "Unknown",
        name: portfolio?.name || "Unknown",
      };
    });

    yield put(setTodayStocks(todayStocks as Stock[]));
  } catch (error) {
    console.error("Failed to load today's stocks:", error);
  }
}

export default function* todaySaga() {
  yield takeLatest(getTodayStocks, loadTodayStocks);
}
