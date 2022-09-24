import { combineReducers } from 'redux';
import login, { getLoginSaga } from './Login';
import { all } from 'redux-saga/effects';
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["login"]
}

export const rootReducer = combineReducers({
  login,
});

export function* rootSaga() {
  yield all([ 
    getLoginSaga(),
  ]);
}

export default persistReducer(persistConfig, rootReducer);