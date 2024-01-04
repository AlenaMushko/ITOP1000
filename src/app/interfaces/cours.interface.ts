export interface ICours {
  ccy: string;
  base_ccy: string;
  buy: string;
  sale: string;
}

export interface ICoursMono {
  currencyCodeA: number;
  currencyCodeB: number;
  date: number;
  rateBuy: number;
  rateSell: number;
}
