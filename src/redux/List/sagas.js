import { all, call, put, takeLatest } from "redux-saga/effects";
import { getData } from "utils/firebase/database";
import  * as actionTypes from './actions';

function* paintingsListCallWorker () {
  try {
    const intro = yield call(() => getData("/intro"));
    const paintings = yield call(() => getData("/paintings"));
    const paintingsOrder = yield call(() => getData("/paintingsOrder"));
    let arr = [];
    paintingsOrder.forEach(order => {
      arr.push(Object.values(paintings).find(el => el.id === order));
    });
    yield put(actionTypes.paintingsListSuccess({intro: intro === null ? {} : intro, paintings: arr, paintingsOrder}));
  } catch (error) {
    yield put(actionTypes.paintingsListFailure(error));
  }
}

function* paintingsOrderCallWorker () {
  try {
    const order = yield call(() => getData("/paintingsOrder"));
    yield put(actionTypes.paintingsOrderSuccess({paintingsOrder: (order === null || order === undefined) ? [] : order}));
  } catch (error) {
    yield put(actionTypes.paintingsOrderFailure(error));
  }
}

function* paintingCallWorker ({payload}) {
  try {
    let painting;
    if (payload.id === "intro") {
      painting = yield call(() => getData('/intro'));
    } else {
      painting = yield call(() => getData(`/paintings/${payload.id}`));
    }
    yield put(actionTypes.paintingSuccess({painting: painting === null ? {} : painting}));
  } catch (error) {
    yield put(actionTypes.paintingFailure(error));
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
    takeLatest(actionTypes.PAINTINGS_ORDER_INIT, paintingsOrderCallWorker),
    takeLatest(actionTypes.PAINTING_INIT, paintingCallWorker),
    takeLatest(actionTypes.PHOTO_LIST_INIT, photoListCallWorker),
    takeLatest(actionTypes.DRAWINGS_LIST_INIT, drawingsListCallWorker),
    takeLatest(actionTypes.CONTACT_INIT, contactListCallWorker),
  ]);
}