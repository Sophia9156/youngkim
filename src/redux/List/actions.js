export const PAINTINGS_LIST_INIT = 'PAINTINGS_LIST_INIT';
export const PAINTINGS_LIST_SUCCESS = 'PAINTINGS_LIST_SUCCESS';
export const PAINTINGS_LIST_FAILURE = 'PAINTINGS_LIST_FAILURE';

export function paintingsListInit() {
  return {
    type: PAINTINGS_LIST_INIT,
  }
}
export function paintingsListSuccess(payload) {
  return {
    type: PAINTINGS_LIST_SUCCESS,
    payload
  }
}
export function paintingsListFailure(error) {
  return {
    type: PAINTINGS_LIST_FAILURE,
    error
  }
}

export const PHOTO_LIST_INIT = 'PHOTO_LIST_INIT';
export const PHOTO_LIST_SUCCESS = 'PHOTO_LIST_SUCCESS';
export const PHOTO_LIST_FAILURE = 'PHOTO_LIST_FAILURE';

export function photoListInit() {
  return {
    type: PHOTO_LIST_INIT,
  }
}
export function photoListSuccess(payload) {
  return {
    type: PHOTO_LIST_SUCCESS,
    payload
  }
}
export function photoListFailure(error) {
  return {
    type: PHOTO_LIST_FAILURE,
    error
  }
}

export const DRAWINGS_LIST_INIT = 'DRAWINGS_LIST_INIT';
export const DRAWINGS_LIST_SUCCESS = 'DRAWINGS_LIST_SUCCESS';
export const DRAWINGS_LIST_FAILURE = 'DRAWINGS_LIST_FAILURE';

export function drawingsListInit() {
  return {
    type: DRAWINGS_LIST_INIT,
  }
}
export function drawingsListSuccess(payload) {
  return {
    type: DRAWINGS_LIST_SUCCESS,
    payload
  }
}
export function drawingsListFailure(error) {
  return {
    type: DRAWINGS_LIST_FAILURE,
    error
  }
}

export const CONTACT_INIT = 'CONTACT_INIT';
export const CONTACT_SUCCESS = 'CONTACT_SUCCESS';
export const CONTACT_FAILURE = 'CONTACT_FAILURE';

export function contactInit() {
  return {
    type: CONTACT_INIT,
  }
}
export function contactSuccess(payload) {
  return {
    type: CONTACT_SUCCESS,
    payload
  }
}
export function contactFailure(error) {
  return {
    type: CONTACT_FAILURE,
    error
  }
}