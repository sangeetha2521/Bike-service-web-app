import { all, fork } from "redux-saga/effects";
import authSaga from "./Auth/saga";
import serviceSaga from "./Service/saga";
import bookingSaga from "./Booking/saga";
// import

// import

export function* rootSaga() {
  yield all([fork(authSaga), fork(serviceSaga), fork(bookingSaga)]);
}
