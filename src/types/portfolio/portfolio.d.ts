export type Portfolio = {
  id: string;
  name: string;
  assets: PortfolioAsset[];
};

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
