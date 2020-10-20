import {
  GET_ALL_CATEGORIES,
  SET_CURRENT,
  UPDATE_CURRENT,
  UPDATE_NEW,
  UPDATE_CATEGORY,
  CATEGORY_UPDATE_FAIL,
  DELETE_CATEGORY,
  CATEGORY_DELETE_FAIL,
  CREATE_CATEGORY,
  CATEGORY_CREATE_FAIL,
  SET_NEW_CATEGORY,
  CATEGORY_ERROR,
  START_LOADING,
  CLEAR_ERRORS,
  CLEAR_SUCCESS,
  CLEAR_BOTH,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        loading: false,
      };
    case CREATE_CATEGORY:
      return {
        ...state,
        categories: [action.payload.category, ...state.categories],
        success: action.payload.success,
        loading: false,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: state.categories.filter(
          category => category._id === action.payload
        )[0],
        loading: false,
      };
    case UPDATE_CURRENT:
      return {
        ...state,
        current: action.payload,
        loading: false,
      };
    case UPDATE_CATEGORY:
      return {
        ...state,
        categories: state.categories.map(category =>
          category._id === action.payload.category._id
            ? action.payload.category
            : category
        ),
        success: action.payload.success,
        loading: false,
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          category => category._id !== action.payload.category
        ),
        success: action.payload.success,
        loading: false,
      };
    case UPDATE_NEW:
      return {
        ...state,
        newCategory: action.payload,
        loading: false,
      };
    case SET_NEW_CATEGORY:
      return {
        ...state,
        newCategory: {
          name: '',
          description: '',
        },
      };
    case CATEGORY_CREATE_FAIL:
    case CATEGORY_DELETE_FAIL:
    case CATEGORY_UPDATE_FAIL:
    case CATEGORY_ERROR:
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
        newCategory: null,
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
