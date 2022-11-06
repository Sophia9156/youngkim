import * as actionTypes from './actions';

const initialState = {
  loading: false,
  intro: {},
  paintings: [],
  paintingsOrder: [],
  painting: {},
  drawings: [],
  photographs: [],
  contact: {},
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
        paintingsOrder: [],
        error: null,
      }
    case actionTypes.PAINTINGS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        intro: action.payload.intro,
        paintings: action.payload.paintings,
        paintingsOrder: action.payload.paintingsOrder,
      }
    case actionTypes.PAINTINGS_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        intro: state.intro,
        paintings: state.paintings,
        paintingsOrder: state.paintingsOrder,
        error: action.error,
      }
    case actionTypes.PAINTINGS_ORDER_INIT:
      return {
        ...state,
        loading: true,
        paintingsOrder: [],
        error: null,
      }
    case actionTypes.PAINTINGS_ORDER_SUCCESS: 
      return {
        ...state,
        loading: false,
        paintingsOrder: action.payload.paintingsOrder,
      }
    case actionTypes.PAINTINGS_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        paintingsOrder: state.paintingsOrder,
        error: action.error,
      }
    case actionTypes.PAINTING_INIT:
      return {
        ...state,
        loading: true,
        painting: {},
        error: null,
      }
    case actionTypes.PAINTING_SUCCESS:
      return {
        ...state,
        loading: false,
        painting: action.payload.painting,
      }
    case actionTypes.PAINTING_FAILURE:
      return {
        ...state,
        loading: false,
        painting: state.painting,
        error: action.error,
      }
    case actionTypes.PHOTO_LIST_INIT:
      return {
        ...state,
        loading: true,
        photographs: [],
        error: null,
      }
    case actionTypes.PHOTO_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        photographs: action.payload.photos,
      }
    case actionTypes.PHOTO_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        photographs: state.photographs,
        error: action.error,
      }
    case actionTypes.DRAWINGS_LIST_INIT:
      return {
        ...state,
        loading: true,
        drawings: [],
        error: null,
      }
    case actionTypes.DRAWINGS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        drawings: action.payload.drawings,
      }
    case actionTypes.DRAWINGS_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        drawings: state.drawings,
        error: action.error,
      }
    case actionTypes.CONTACT_INIT:
      return {
        ...state,
        loading: true,
        contact: {},
        error: null,
      }
    case actionTypes.CONTACT_SUCCESS:
      return {
        ...state,
        loading: false,
        contact: action.payload.contact,
      }
    case actionTypes.CONTACT_FAILURE:
      return {
        ...state,
        loading: false,
        contact: state.contact,
        error: action.error,
      }
    default: return state;
  }
}