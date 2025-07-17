import { put, takeLatest } from "redux-saga/effects";
import { getPortfolios, setPortfolios } from "./portfoliosSlice";
import portfoliosRawData from "../../raw_data/portfolios.json";
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

function* loadPortfolios() {
  try {
    const portfoliosData = addIdsToPortfolios(portfoliosRawData);
    const uniquePortfolios = getUniquePortfolios(portfoliosData);

    const portfolios: Portfolio[] = uniquePortfolios.map((portfolio) => ({
      id: portfolio.id,
      name: portfolio.portfolio,
      assets: getAssetsForPortfolio(portfoliosData, portfolio.id),
    }));

    yield put(setPortfolios(portfolios));
  } catch (error) {
    console.error("Error loading portfolios:", error);
  }
}

export default function* portfoliosSaga() {
  yield takeLatest(getPortfolios, loadPortfolios);
}
