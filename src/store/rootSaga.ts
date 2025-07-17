import { all, call } from "redux-saga/effects";
import portfoliosSaga from "./portfolios/portfoliosSaga";
import todaySaga from "./today/todaySaga";

export default function* rootSaga() {
  const sagas = [portfoliosSaga, todaySaga];
  yield all(sagas.map((saga) => call(saga)));
}
