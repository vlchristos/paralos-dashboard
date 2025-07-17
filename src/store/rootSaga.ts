import { all, call } from "redux-saga/effects";

export default function* rootSaga() {
  const sagas = [];
  yield all(sagas.map((saga) => call(saga)));
}
