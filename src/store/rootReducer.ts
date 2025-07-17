import { combineSlices } from "@reduxjs/toolkit";
import { globalReducer } from "./global/globalSlice";
import { portfoliosReducer } from "./portfolios/portfoliosSlice";

const rootReducer = combineSlices(globalReducer, portfoliosReducer);

export const reducer = rootReducer;
