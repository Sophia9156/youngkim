import { all, call, put, takeLatest } from "redux-saga/effects";
import { getData } from "utils/firebase/database";
import  * as actionTypes from './actions';

function* paintingsListCallWorker () {
  try {
    const intro = yield (call(() => getData("/intro")));
    const paintings = yield call(() => getData("/paintings"));
    let arr = [];
    for (const item in paintings) {
      arr.push(paintings[item]);
    }
    yield put(actionTypes.paintingsListSuccess({intro, paintings: arr.reverse()}));
  } catch (error) {
    yield put(actionTypes.paintingsListFailure(error));
  }
}

export function* getListSaga() {
  yield all([
    takeLatest(actionTypes.PAINTINGS_LIST_INIT, paintingsListCallWorker)
  ]);
}