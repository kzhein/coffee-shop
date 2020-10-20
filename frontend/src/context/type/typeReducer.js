import {
  GET_ALL_TYPES,
  SET_CURRENT,
  UPDATE_CURRENT,
  UPDATE_NEW,
  UPDATE_TYPE,
  TYPE_UPDATE_FAIL,
  DELETE_TYPE,
  TYPE_DELETE_FAIL,
  CREATE_TYPE,
  TYPE_CREATE_FAIL,
  SET_NEW_TYPE,
  TYPE_ERROR,
  START_LOADING,
  CLEAR_ERRORS,
  CLEAR_SUCCESS,
  CLEAR_BOTH,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_ALL_TYPES:
      return {
        ...state,
        types: action.payload,
        loading: false,
      };
    case CREATE_TYPE:
      return {
        ...state,
        types: [action.payload.type, ...state.types],
        success: action.payload.success,
        loading: false,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: state.types.filter(type => type._id === action.payload)[0],
        loading: false,
      };
    case UPDATE_CURRENT:
      return {
        ...state,
        current: action.payload,
        loading: false,
      };
    case UPDATE_TYPE:
      return {
        ...state,
        types: state.types.map(type =>
          type._id === action.payload.type._id ? action.payload.type : type
        ),
        success: action.payload.success,
        loading: false,
      };
    case DELETE_TYPE:
      return {
        ...state,
        types: state.types.filter(type => type._id !== action.payload.type),
        success: action.payload.success,
        loading: false,
      };
    case UPDATE_NEW:
      return {
        ...state,
        newType: action.payload,
        loading: false,
      };
    case SET_NEW_TYPE:
      return {
        ...state,
        newType: {
          name: '',
          description: '',
        },
      };
    case TYPE_CREATE_FAIL:
    case TYPE_DELETE_FAIL:
    case TYPE_UPDATE_FAIL:
    case TYPE_ERROR:
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
    case CLEAR_BOTH:
      return {
        ...state,
        current: null,
        newType: null,
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
