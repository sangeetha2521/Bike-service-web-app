import { AxiosResponse } from "axios";
import { takeEvery, put, call, select } from "redux-saga/effects";
import {
  createServiceLoading,
  createServiceSuccess,
  setEditService,
  setEditServiceLoading,
  setSelectedServicesDeleteLoading,
  setStatus,
} from "./slice";
import { createServiceApi, deleteServiceApi, editServiceApi } from "api/servicesApi";

export function* createService(data) {
  try {
    const response: AxiosResponse = yield call(createServiceApi, data);
    if (response.data.service) {
      yield put(createServiceSuccess(response.data));
    }
  } catch (e) {
    yield put(setStatus("failed"));
  }
}
export function* deleteService(data) {
  try {
    const response: AxiosResponse = yield call(deleteServiceApi, data);
    if (response.data) {
      yield put(setStatus("success"));
    }
  } catch (e) {
    yield put(setStatus("failed"));
  }
}
export function* editService(data) {
  try {
    const response: AxiosResponse = yield call(editServiceApi, data);
    if (response.data.service) {
      yield put(setEditService(response.data.service));
    }
  } catch (e) {
    yield put(setStatus("failed"));
  }
}

export default function* rootSaga() {
  yield takeEvery(createServiceLoading.type, createService);
  yield takeEvery(setSelectedServicesDeleteLoading.type, deleteService);
  yield takeEvery(setEditServiceLoading.type, editService);
}
