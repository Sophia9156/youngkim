import { all, call, put, takeLatest } from "redux-saga/effects";
import { getData } from "utils/firebase/database";
import {
  paintingsListInit,
  paintingsListSuccess,
  paintingsListFailure,
  paintingsOrderInit,
  paintingsOrderSuccess,
  paintingsOrderFailure,
  paintingInit,
  paintingSuccess,
  paintingFailure,
  photoListInit,
  photoListSuccess,
  photoListFailure,
  drawingsListInit,
  drawingsListSuccess,
  drawingsListFailure,
  contactInit,
  contactSuccess,
  contactFailure,
} from ".";

function* paintingsListCallWorker(): any {
  try {
    const intro = yield call(() => getData("/intro"));
    const paintings = yield call(() => getData("/paintings"));
    const paintingsOrder = yield call(() => getData("/paintingsOrder"));
    let arr: any[] = [];
    paintingsOrder.forEach((order: React.Key) => {
      arr.push(Object.values(paintings).find((el: any) => el.id === order));
    });
    yield put(
      paintingsListSuccess({
        intro: intro === null ? {} : intro,
        paintings: arr,
        paintingsOrder,
      })
    );
  } catch (error) {
    console.error(error);
    yield put(paintingsListFailure());
  }
}

function* paintingsOrderCallWorker(): any {
  try {
    const order = yield call(() => getData("/paintingsOrder"));
    yield put(
      paintingsOrderSuccess({
        paintingsOrder: order === null || order === undefined ? [] : order,
      })
    );
  } catch (error) {
    console.error(error);
    yield put(paintingsOrderFailure());
  }
}

function* paintingCallWorker({ payload }: { payload: { id: React.Key } }): any {
  try {
    let painting;
    if (payload.id === "intro") {
      painting = yield call(() => getData("/intro"));
    } else {
      painting = yield call(() => getData(`/paintings/${payload.id}`));
    }
    yield put(paintingSuccess({ painting: painting === null ? {} : painting }));
  } catch (error) {
    console.error(error);
    yield put(paintingFailure());
  }
}

function* photoListCallWorker(): any {
  try {
    const photos = yield call(() => getData("/photographs"));
    let arr = [];
    for (const item in photos) {
      arr.push(photos[item]);
    }
    yield put(photoListSuccess({ photos: arr.reverse() }));
  } catch (error) {
    console.error(error);
    yield put(photoListFailure());
  }
}

function* drawingsListCallWorker(): any {
  try {
    const drawings = yield call(() => getData("/drawings"));
    let arr = [];
    for (const item in drawings) {
      arr.push(drawings[item]);
    }
    yield put(drawingsListSuccess({ drawings: arr.reverse() }));
  } catch (error) {
    console.error(error);
    yield put(drawingsListFailure());
  }
}

function* contactListCallWorker(): any {
  try {
    const contact = yield call(() => getData("/contact"));
    yield put(contactSuccess({ contact: contact === null ? {} : contact }));
  } catch (error) {
    console.error(error);
    yield put(contactFailure());
  }
}

export function* getListSaga() {
  yield all([
    takeLatest(paintingsListInit, paintingsListCallWorker),
    takeLatest(paintingsOrderInit, paintingsOrderCallWorker),
    takeLatest(paintingInit, paintingCallWorker),
    takeLatest(photoListInit, photoListCallWorker),
    takeLatest(drawingsListInit, drawingsListCallWorker),
    takeLatest(contactInit, contactListCallWorker),
  ]);
}
