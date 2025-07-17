import { combineSlices } from "@reduxjs/toolkit";
import { globalReducer } from "./global/globalSlice";

const rootReducer = combineSlices(globalReducer);

export const reducer = rootReducer;
