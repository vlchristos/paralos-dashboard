import { put, takeLatest } from "redux-saga/effects";
import {
  getPortfolios,
  setPortfolios,
  setPortfoliosRawData,
  setSelectedPortfolioId,
} from "./portfoliosSlice";
import portfoliosRawData from "../../raw_data/portfolios.json";
import portfolioGrowthHistory from "../../raw_data/history/portfolio/growth.json";
import portfolioStableHistory from "../../raw_data/history/portfolio/stable.json";
import portfolioTechHistory from "../../raw_data/history/portfolio/tech.json";
import type {
  Portfolio,
  PortfolioRawData,
} from "../../types/portfolio/portfolio";

function addIdsToPortfolios(portfolios: PortfolioRawData[]) {
  return portfolios.map((portfolio) => ({
    ...portfolio,
    id: portfolio.portfolio.toLowerCase().replace(/\s+/g, "-"),
  }));
}

function getUniquePortfolios(
  portfolios: Array<PortfolioRawData & { id: string }>,
) {
  const seen = new Set();
  return portfolios.filter((portfolio) => {
    if (seen.has(portfolio.id)) {
      return false;
    }
    seen.add(portfolio.id);
    return true;
  });
}

function getAssetsForPortfolio(
  portfolios: Array<PortfolioRawData & { id: string }>,
  portfolioId: string,
) {
  return portfolios
    .filter((portfolio) => portfolio.id === portfolioId)
    .map((portfolio) => ({
      name: portfolio.name,
      symbol: portfolio.symbol,
      sector: portfolio.sector,
    }));
}

function getPortfolioHistory(portfolioId: string) {
  switch (portfolioId) {
    case "growth":
      return portfolioGrowthHistory;
    case "stable":
      return portfolioStableHistory;
    case "tech":
      return portfolioTechHistory;
    default:
      return [];
  }
}

function* loadPortfolios() {
  try {
    yield new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call delay

    yield put(setPortfoliosRawData(portfoliosRawData));
    const portfoliosData = addIdsToPortfolios(portfoliosRawData);
    const uniquePortfolios = getUniquePortfolios(portfoliosData);

    const portfolios: Portfolio[] = uniquePortfolios.map((portfolio) => ({
      id: portfolio.id,
      name: portfolio.portfolio,
      assets: getAssetsForPortfolio(portfoliosData, portfolio.id),
      history: getPortfolioHistory(portfolio.id),
    }));

    yield put(setPortfolios(portfolios));
    yield put(setSelectedPortfolioId(portfolios[0]?.id || null));
  } catch (error) {
    console.error("Error loading portfolios:", error);
  }
}

export default function* portfoliosSaga() {
  yield takeLatest(getPortfolios, loadPortfolios);
}
