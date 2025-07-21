import { combineSlices } from "@reduxjs/toolkit";
import { globalReducer } from "./global/globalSlice";
import { portfoliosReducer } from "./portfolios/portfoliosSlice";
import { todayReducer } from "./today/todaySlice";
import { stocksReducer } from "./stocks/stocksSlice";

const rootReducer = combineSlices(
  globalReducer,
  portfoliosReducer,
  todayReducer,
  stocksReducer,
);

export const reducer = rootReducer;
