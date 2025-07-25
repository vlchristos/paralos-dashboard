import { all, call } from "redux-saga/effects";
import portfoliosSaga from "./portfolios/portfoliosSaga";
import todaySaga from "./today/todaySaga";
import stocksSaga from "./stocks/stocksSaga";

export default function* rootSaga() {
  const sagas = [portfoliosSaga, todaySaga, stocksSaga];
  yield all(sagas.map((saga) => call(saga)));
}
