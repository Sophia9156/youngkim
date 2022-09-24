import { put, all, call, takeLatest } from "redux-saga/effects";
import * as actionTypes from "./actions";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, googleProvider } from "utils/firebase/firebase";

// 로그인
function* login() {
  yield call(() => signInWithPopup(auth, googleProvider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    sessionStorage.setItem("accessToken", token);
    actionTypes.loginSuccess(user);
  }).catch((error) => {
    actionTypes.loginFailure(error);
  }));
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