import { UPDATE_DELIVERY } from '../types';

export default (state, action) => {
  switch (action.type) {
    case UPDATE_DELIVERY:
      delete action.payload.comment;
      localStorage.setItem(
        'delivery',
        JSON.stringify({ ...state, ...action.payload })
      );
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
