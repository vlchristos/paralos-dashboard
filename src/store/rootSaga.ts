import { all, call } from "redux-saga/effects";
import portfoliosSaga from "./portfolios/portfoliosSaga";

export default function* rootSaga() {
  const sagas = [portfoliosSaga];
  yield all(sagas.map((saga) => call(saga)));
}
