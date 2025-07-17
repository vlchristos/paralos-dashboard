export type PortfolioAsset = {
  symbol: string;
  sector: string;
};

export type PortfolioRawData = {
  name: string;
  portfolio: string;
  sector: string;
  symbol: string;
};

export type PortfolioHistoricData = {
  date: Date;
  daily_pnl: number;
  total_pnl: number;
  total_value: number;
};

export type Portfolio = {
  id: string;
  name: string;
  assets: PortfolioAsset[];
  history: PortfolioHistory[];
};
