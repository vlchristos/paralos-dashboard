import { combineSlices } from "@reduxjs/toolkit";
import { globalReducer } from "./global/globalSlice";
import { portfoliosReducer } from "./portfolios/portfoliosSlice";
import { todayReducer } from "./today/todaySlice";

const rootReducer = combineSlices(
  globalReducer,
  portfoliosReducer,
  todayReducer,
);

export const reducer = rootReducer;
