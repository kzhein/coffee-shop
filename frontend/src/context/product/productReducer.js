import {
  GET_ALL_PRODUCTS,
  SET_CURRENT,
  UPDATE_CURRENT,
  UPDATE_PRODUCT,
  PRODUCT_UPDATE_FAIL,
  DELETE_PRODUCT,
  PRODUCT_DELETE_FAIL,
  CREATE_PRODUCT,
  PRODUCT_CREATE_FAIL,
  SET_NEW_PRODUCT,
  CLEAR_BOTH,
  CLEAR_ERRORS,
  CLEAR_SUCCESS,
  PRODUCT_ERROR,
  START_LOADING,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case CREATE_PRODUCT:
      return {
        ...state,
        products: [action.payload.product, ...state.products],
        success: action.payload.success,
        loading: false,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: state.products.filter(
          product => product._id === action.payload
        )[0],
        loading: false,
      };
    case UPDATE_CURRENT:
      return {
        ...state,
        current: action.payload,
        loading: false,
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map(product =>
          product._id === action.payload.product._id
            ? action.payload.product
            : product
        ),
        success: action.payload.success,
        loading: false,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          product => product._id !== action.payload.product
        ),
        success: action.payload.success,
        loading: false,
      };
    case SET_NEW_PRODUCT:
      return {
        ...state,
        newProduct: true,
      };
    case PRODUCT_CREATE_FAIL:
    case PRODUCT_DELETE_FAIL:
    case PRODUCT_UPDATE_FAIL:
    case PRODUCT_ERROR:
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
        newProduct: false,
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
