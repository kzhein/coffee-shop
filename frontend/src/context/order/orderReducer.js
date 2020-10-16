import {
  GET_ORDERS,
  ADD_ORDER,
  CLEAR_ORDERS,
  ORDER_ERROR,
  CLEAR_ERRORS,
  START_LOADING,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
        loading: false,
      };
    case ADD_ORDER:
      return {
        ...state,
        orders: [action.payload, ...state.orders],
      };
    case CLEAR_ORDERS:
      return {
        orders: [],
        error: null,
      };
    case ORDER_ERROR:
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
    case START_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
