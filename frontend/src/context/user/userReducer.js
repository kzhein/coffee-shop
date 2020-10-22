import {
  GET_ALL_USERS,
  SET_CURRENT,
  UPDATE_CURRENT,
  UPDATE_USER,
  USER_UPDATE_FAIL,
  DELETE_USER,
  USER_DELETE_FAIL,
  USER_ERROR,
  START_LOADING,
  CLEAR_ERRORS,
  CLEAR_SUCCESS,
  CLEAR_CURRENT,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload.users,
        total: action.payload.total,
        loading: false,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: state.users.filter(user => user._id === action.payload)[0],
        loading: false,
      };
    case UPDATE_CURRENT:
      return {
        ...state,
        current: action.payload,
        loading: false,
      };
    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map(user =>
          user._id === action.payload.user._id ? action.payload.user : user
        ),
        success: action.payload.success,
        loading: false,
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.payload.user),
        success: action.payload.success,
        loading: false,
      };
    case USER_DELETE_FAIL:
    case USER_UPDATE_FAIL:
    case USER_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case CLEAR_SUCCESS:
      return {
        ...state,
        success: null,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case START_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
