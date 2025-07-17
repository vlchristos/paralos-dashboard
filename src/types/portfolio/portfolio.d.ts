export type Portfolio = {
  id: string;
  name: string;
  sector: string;
  assets: PortfolioAsset[];
};

export type PortfolioAsset = {
  symbol: string;
  name: string;
  quantity: number;
  price: number;
  currency: string;
};
