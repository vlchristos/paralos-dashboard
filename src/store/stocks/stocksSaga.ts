import { put, select, takeLatest } from "redux-saga/effects";
import todayStocksRawData from "../../raw_data/today.json";
import AAPL from "../../raw_data/stocks/AAPL.json";
import AMZN from "../../raw_data/stocks/AMZN.json";
import COIN from "../../raw_data/stocks/COIN.json";
import CRWD from "../../raw_data/stocks/CRWD.json";
import CVX from "../../raw_data/stocks/CVX.json";
import DDOG from "../../raw_data/stocks/DDOG.json";
import GOOGL from "../../raw_data/stocks/GOOGL.json";
import INTC from "../../raw_data/stocks/INTC.json";
import JNJ from "../../raw_data/stocks/JNJ.json";
import JPM from "../../raw_data/stocks/JPM.json";
import KO from "../../raw_data/stocks/KO.json";
import META from "../../raw_data/stocks/META.json";
import MRNA from "../../raw_data/stocks/MRNA.json";
import MSFT from "../../raw_data/stocks/MSFT.json";
import NVDA from "../../raw_data/stocks/NVDA.json";
import PEP from "../../raw_data/stocks/PEP.json";
import PG from "../../raw_data/stocks/PG.json";
import PLTR from "../../raw_data/stocks/PLTR.json";
import RBLX from "../../raw_data/stocks/RBLX.json";
import RIVN from "../../raw_data/stocks/RIVN.json";
import SHOP from "../../raw_data/stocks/SHOP.json";
import SNOW from "../../raw_data/stocks/SNOW.json";
import TSLA from "../../raw_data/stocks/TSLA.json";
import U from "../../raw_data/stocks/U.json";
import VZ from "../../raw_data/stocks/VZ.json";
import WMT from "../../raw_data/stocks/WMT.json";
import XOM from "../../raw_data/stocks/XOM.json";
import type { PortfolioRawData } from "../../types/portfolio/portfolio";
import { selectPortfolioRawData } from "../portfolios/selectors";
import type { Stock } from "../../types/today/today";
import {
  getAvailableStocks,
  setAvailableStocks,
  setSelectedStock,
  setSelectedStockData,
} from "./stocksSlice";
import type { StockData } from "../../types/stocks/stocks";

function* getSelectedStockData(selectedStockSymbol: string) {
  // Simulate an API call to fetch stock data
  yield new Promise((resolve) => setTimeout(resolve, 1000));

  let stockData: StockData[] = [];

  // Filter the stock data based on the selected stock symbol
  switch (selectedStockSymbol) {
    case "AAPL":
      stockData = AAPL as StockData[];
      break;
    case "AMZN":
      stockData = AMZN as StockData[];
      break;
    case "COIN":
      stockData = COIN as StockData[];
      break;
    case "CRWD":
      stockData = CRWD as StockData[];
      break;
    case "CVX":
      stockData = CVX as StockData[];
      break;
    case "DDOG":
      stockData = DDOG as StockData[];
      break;
    case "GOOGL":
      stockData = GOOGL as StockData[];
      break;
    case "INTC":
      stockData = INTC as StockData[];
      break;
    case "JNJ":
      stockData = JNJ as StockData[];
      break;
    case "JPM":
      stockData = JPM as StockData[];
      break;
    case "KO":
      stockData = KO as StockData[];
      break;
    case "META":
      stockData = META as StockData[];
      break;
    case "MRNA":
      stockData = MRNA as StockData[];
      break;
    case "MSFT":
      stockData = MSFT as StockData[];
      break;
    case "NVDA":
      stockData = NVDA as StockData[];
      break;
    case "PEP":
      stockData = PEP as StockData[];
      break;
    case "PG":
      stockData = PG as StockData[];
      break;
    case "PLTR":
      stockData = PLTR as StockData[];
      break;
    case "RBLX":
      stockData = RBLX as StockData[];
      break;
    case "RIVN":
      stockData = RIVN as StockData[];
      break;
    case "SHOP":
      stockData = SHOP as StockData[];
      break;
    case "SNOW":
      stockData = SNOW as StockData[];
      break;
    case "TSLA":
      stockData = TSLA as StockData[];
      break;
    case "U":
      stockData = U as StockData[];
      break;
    case "VZ":
      stockData = VZ as StockData[];
      break;
    case "WMT":
      stockData = WMT as StockData[];
      break;
    case "XOM":
      stockData = XOM as StockData[];
  }

  if (stockData) {
    yield put(setSelectedStockData(stockData));
  } else {
    console.error("Stock data not found for symbol:", selectedStockSymbol);
  }
}

function* loadSelectedStockData(action: ReturnType<typeof setSelectedStock>) {
  const selectedStockSymbol = action.payload;
  try {
    if (selectedStockSymbol) {
      yield getSelectedStockData(selectedStockSymbol);
    } else {
      yield put(setSelectedStockData([]));
    }
  } catch (error) {
    console.error("Failed to load selected stock data:", error);
  }
}

function* loadAvailableStocks() {
  try {
    // Simulate an API call
    yield new Promise((resolve) => setTimeout(resolve, 1000));
    let stocks = todayStocksRawData;

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

    stocks = stocks.map((stock) => {
      const portfolio = portfoliosRawData.find(
        (portfolio) => portfolio.symbol === stock.symbol,
      );

      return {
        ...stock,
        sector: portfolio?.sector || "Unknown",
        name: portfolio?.name || "Unknown",
      };
    });

    yield put(setAvailableStocks(stocks as Stock[]));
  } catch (error) {
    console.error("Failed to load today's stocks:", error);
  }
}

export default function* stocksSaga() {
  yield takeLatest(getAvailableStocks, loadAvailableStocks);
  yield takeLatest(setSelectedStock, loadSelectedStockData);
}
