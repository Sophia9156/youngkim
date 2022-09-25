import { put, all, call, takeLatest } from "redux-saga/effects";
import * as actionTypes from "./actions";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, googleProvider } from "utils/firebase/firebase";

// 로그인
function* login() {
  try {
    const result = yield call(() => signInWithPopup(auth, googleProvider));
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    sessionStorage.setItem("accessToken", token);
    yield put(actionTypes.loginSuccess(result.user.email));
  } catch (error) {
    yield put(actionTypes.loginFailure(error));
  }
  
}

// 로그아웃
function* logout() {
  try {
    sessionStorage.removeItem("accessToken");
    yield put(actionTypes.logoutSuccess());
  } catch (err) {
    yield put(actionTypes.logoutFailure(err));
  }
}

export function* getLoginSaga() {
  yield all([
    takeLatest(actionTypes.LOGIN_REQUEST, login), 
    takeLatest(actionTypes.LOGOUT_REQUEST, logout)
  ]);
}