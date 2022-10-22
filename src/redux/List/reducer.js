import * as actionTypes from './actions';

const initialState = {
  loading: false,
  intro: {},
  paintings: [],
  drawings: null,
  photographs: null,
  contact: null,
  error: null,
};

export default function list(state = initialState, action) {
  switch (action.type) {
    case actionTypes.PAINTINGS_LIST_INIT:
      return {
        ...state,
        loading: true,
        intro: {},
        paintings: [],
        error: null,
      }
    case actionTypes.PAINTINGS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        intro: action.payload.intro,
        paintings: action.payload.paintings,
      }
    case actionTypes.PAINTINGS_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        intro: state.intro,
        paintings: state.paintings,
        error: action.error,
      }
    default: return state;
  }
}