import { AxiosResponse } from "axios";
import { takeEvery, put, call } from "redux-saga/effects";
import {
  login,
  loginError,
  loginSuccess,
  setUserData,
  signUpUserLoading,
  signUpUser,
  currentUserLogin,
  setStatus,
  logout,
  logoutSuccess,
} from "../Auth/slice";
import { fetchUser, loginUserApi, logoutApi, signUpUserApi } from "../../api/authApi";

function* loginUser(data) {
  try {
    const result: AxiosResponse<any> = yield call(loginUserApi, data);
    if (result.data.message != "sucess") {
      yield put(loginError(result.data.message));
    } else {
      yield put(setUserData(result.data));
      yield put(loginSuccess(result.data));
    }
  } catch (error) {
    yield put(loginError(error.message));
  }
}
function* currentUser() {
  try {
    yield put(setStatus("loading"));
    const result: AxiosResponse<any> = yield call(fetchUser);
    if (result.data.statusCode === 404) {
      yield put(loginError(result.data.message));
    } else {
      yield put(loginSuccess(result.data));
      yield put(setStatus("success"));
    }
  } catch (error) {
    yield put(loginError(error.message));
  }
}
function* signUpUsers(data) {
  try {
    const result: AxiosResponse<any> = yield call(signUpUserApi, data.payload);

    if (result.data.message == "sucess") {
      yield put(signUpUser(result.data));
    } else {
      yield put(loginError(result.data.message));
    }
  } catch (error) {
    yield put(loginError(error.message));
  }
}
function* logoutUser() {
  try {
    const result: AxiosResponse<any> = yield call(logoutApi);
    yield put(logout());
  } catch (error) {
    yield put(logoutSuccess());
  }
}
export default function* rootSaga() {
  yield takeEvery(login.type, loginUser);
  yield takeEvery(signUpUserLoading.type, signUpUsers);
  yield takeEvery(currentUserLogin.type, currentUser);
  yield takeEvery(logout.type, logoutUser);
}
