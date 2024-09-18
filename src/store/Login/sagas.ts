import { put, all, call, takeLatest } from "redux-saga/effects";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
} from ".";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Auth, googleProvider } from "utils/firebase/firebase";

// 로그인
function* login(): any {
  try {
    const result = yield call(() => signInWithPopup(Auth, googleProvider));
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    if (token) {
      sessionStorage.setItem("accessToken", token);
      yield put(loginSuccess(result.user.email));
    } else {
      yield put(loginFailure());
    }
  } catch (error) {
    console.error(error);
    yield put(loginFailure());
  }
}

// 로그아웃
function* logout() {
  try {
    sessionStorage.removeItem("accessToken");
    yield put(logoutSuccess());
  } catch (error) {
    console.error(error);
    yield put(logoutFailure());
  }
}

export function* getLoginSaga() {
  yield all([
    takeLatest(loginRequest, login),
    takeLatest(logoutRequest, logout),
  ]);
}
