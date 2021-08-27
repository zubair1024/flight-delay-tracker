import qs from 'qs';

import { setAlert } from './alert';
import {
  FLIGHT_DELAY_ERROR,
  FLIGHT_DELAY_LOADED,
  FLIGHT_DELAY_LOADING,
  FLIGHT_DELAY_NOT_LOADING,
} from './constants';

/**
 * @param {boolean} boolState
 */
export const setLoading = (boolState) => (dispatch) => {
  dispatch({
    type: boolState ? FLIGHT_DELAY_LOADING : FLIGHT_DELAY_NOT_LOADING,
  });
};

/**
 * @param {Object} flightInfo
 */
export const getFlightDelayInfo = (flightInfo) => async (dispatch) => {
  try {
    //patch time
    flightInfo.departureTime = flightInfo.departureTime + ':00';
    flightInfo.arrivalTime = flightInfo.arrivalTime + ':00';
    dispatch(setLoading(true));
    const queryString = qs.stringify(flightInfo);
    const res = await fetch(`/api/flight/delay-info?${queryString}`);
    dispatch({
      type: FLIGHT_DELAY_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: FLIGHT_DELAY_ERROR,
    });
    const errors = err?.response?.data?.errors;
    if (errors && errors.length)
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
  }
};
