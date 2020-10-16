import React, { useReducer } from 'react';
import DeliveryContext from './deliveryContext';
import deliveryReducer from './deliveryReducer';
import { UPDATE_DELIVERY } from '../types';

const DeliveryState = props => {
  const initialState = JSON.parse(localStorage.getItem('delivery')) || {
    name: '',
    phone: '',
    address: '',
  };

  const [state, dispatch] = useReducer(deliveryReducer, initialState);

  // Update delivery
  const updateDelivery = deli =>
    dispatch({ type: UPDATE_DELIVERY, payload: deli });

  return (
    <DeliveryContext.Provider
      value={{
        name: state.name,
        phone: state.phone,
        address: state.address,
        updateDelivery,
      }}
    >
      {props.children}
    </DeliveryContext.Provider>
  );
};

export default DeliveryState;
