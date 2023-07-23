import { AxiosResponse } from "axios";
import { takeEvery, put, call, select } from "redux-saga/effects";
import {
  saveBookingDetails,
  saveBookingDetailsLoading,
  setDeliveryStatus,
  setDeliveryStatusLoading,
  setStatus,
} from "./slice";
import { editBookingApi, saveBookingApi } from "api/bookingApi";

export function* createBooking(data) {
  try {
    const response: AxiosResponse = yield call(saveBookingApi, data);
    if (response.data.booking) {
      yield put(setStatus("success"));
      yield put(saveBookingDetails(response.data.booking));
    }
  } catch (e) {
    yield put(setStatus("failed"));
  }
}
export function* editBooking(payload) {
  try {
    const response: AxiosResponse = yield call(editBookingApi, payload.payload);
    if (response.data.data) {
      yield put(setDeliveryStatus(response.data));
    }
  } catch (e) {
    yield put(setStatus("failed"));
  }
}
export default function* rootSaga() {
  yield takeEvery(saveBookingDetailsLoading.type, createBooking);
  yield takeEvery(setDeliveryStatusLoading.type, editBooking);
}
