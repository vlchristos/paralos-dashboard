export type Stock = {
  symbol: string;
  quantity: number;
  price: number;
  change_pct: number;
  daily_pnl: number;
  name: string;
  sector: string;
};

export type Sector = {
  id: string;
  name: string;
};
