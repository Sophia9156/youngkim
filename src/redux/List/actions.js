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