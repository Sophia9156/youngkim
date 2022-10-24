import { all, call, put, takeLatest } from "redux-saga/effects";
import { getData } from "utils/firebase/database";
import  * as actionTypes from './actions';

function* paintingsListCallWorker () {
  try {
    const intro = yield call(() => getData("/intro"));
    const paintings = yield call(() => getData("/paintings"));
    let arr = [];
    for (const item in paintings) {
      arr.push(paintings[item]);
    }
    yield put(actionTypes.paintingsListSuccess({intro: intro === null ? {} : intro, paintings: arr.reverse()}));
  } catch (error) {
    yield put(actionTypes.paintingsListFailure(error));
  }
}

function* photoListCallWorker () {
  try {
    const photos = yield call(() => getData("/photographs"));
    let arr = [];
    for (const item in photos) {
      arr.push(photos[item]);
    }
    yield put(actionTypes.photoListSuccess({photos: arr.reverse()}));
  } catch (error) {
    yield put(actionTypes.photoListFailure(error));
  }
}

function* drawingsListCallWorker () {
  try {
    const drawings = yield call(() => getData("/drawings"));
    let arr = [];
    for (const item in drawings) {
      arr.push(drawings[item]);
    }
    yield put(actionTypes.drawingsListSuccess({drawings: arr.reverse()}));
  } catch (error) {
    yield put(actionTypes.drawingsListFailure(error));
  }
}

function* contactListCallWorker () {
  try {
    const contact = yield call(() => getData("/contact"));
    yield put(actionTypes.contactSuccess({contact: contact === null ? {} : contact}));
  } catch (error) {
    yield put(actionTypes.contactFailure(error));
  }
}

export function* getListSaga() {
  yield all([
    takeLatest(actionTypes.PAINTINGS_LIST_INIT, paintingsListCallWorker),
    takeLatest(actionTypes.PHOTO_LIST_INIT, photoListCallWorker),
    takeLatest(actionTypes.DRAWINGS_LIST_INIT, drawingsListCallWorker),
    takeLatest(actionTypes.CONTACT_INIT, contactListCallWorker),
  ]);
}