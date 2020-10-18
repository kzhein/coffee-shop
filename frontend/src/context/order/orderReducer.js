import {
  GET_ORDERS,
  GET_ALL_ORDERS,
  ADD_ORDER,
  SET_CURRENT,
  UPDATE_ORDER,
  DELETE_ORDER,
  ORDER_UPDATE_FAIL,
  ORDER_DELETE_FAIL,
  UPDATE_CURRENT,
  CLEAR_CURRENT,
  CLEAR_ORDERS,
  ORDER_ERROR,
  CLEAR_ERRORS,
  CLEAR_SUCCESS,
  START_LOADING,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_ALL_ORDERS:
    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        loading: false,
      };
    case ADD_ORDER:
      return {
        ...state,
        orders: [action.payload, ...state.orders],
      };
    case UPDATE_ORDER:
      return {
        ...state,
        orders: state.orders.map(order =>
          order._id === action.payload.order._id ? action.payload.order : order
        ),
        success: action.payload.success,
        loading: false,
      };
    case DELETE_ORDER:
      return {
        ...state,
        orders: state.orders.filter(
          order => order._id !== action.payload.order
        ),
        success: action.payload.success,
        loading: false,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: state.orders.filter(order => order._id === action.payload)[0],
        loading: false,
      };
    case UPDATE_CURRENT:
      return {
        ...state,
        current: action.payload,
        loading: false,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
        // loading: false,
      };
    case CLEAR_ORDERS:
      return {
        orders: [],
        error: null,
      };
    case ORDER_DELETE_FAIL:
    case ORDER_UPDATE_FAIL:
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
    case CLEAR_SUCCESS:
      return {
        ...state,
        success: null,
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
