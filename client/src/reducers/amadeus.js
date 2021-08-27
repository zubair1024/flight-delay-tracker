import {
  FLIGHT_DELAY_LOADED,
  FLIGHT_DELAY_ERROR,
  FLIGHT_DELAY_LOADING,
  FLIGHT_DELAY_NOT_LOADING,
} from '../actions/constants';

const initialState = {
  loading: false,
  data: null,
};

const amadeusReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FLIGHT_DELAY_LOADING:
      return { ...state, loading: true };
    case FLIGHT_DELAY_NOT_LOADING:
      return { ...state, loading: false };
    case FLIGHT_DELAY_LOADED:
      return { ...state, loading: false, data: payload };
    case FLIGHT_DELAY_ERROR:
      return { ...state, loading: false, data: null };
    default:
      return state;
  }
};

export default amadeusReducer;
