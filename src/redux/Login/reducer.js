import * as actionTypes from './actions';

const initialState = {
  loading: false,
  error: null,
  isLoggingIn: null,
  user: null,
};

export default function login(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        user: null,
      };  
    case actionTypes.LOGIN_SUCCESS:
      return {
        loading: false,
        isLoggingIn: true,
        error: null,
        user: action.payload
      }
    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        user: null,
      }
    case actionTypes.LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }
    case actionTypes.LOGOUT_SUCCESS:
      return {
        loading: false,
        isLoggingIn: false,
        error: null,
        user: null,
      }
    case actionTypes.LOGOUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        user: state.user
      }
    default:
      return state;
  }
}