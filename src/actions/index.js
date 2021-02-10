import data from '../apis/data';

export const fetchAircrafts = () => {
  return async function (dispatch) {
    const response = await data.get('/aircrafts');
    dispatch({
      type: 'FETCH_AIRCRAFTS',
      payload: response,
    });
  };
};

export const fetchFlights = (pageNumber) => {
  return async function (dispatch) {
    const response = await data.get('/flights', {
      params: {
        offset: !pageNumber ? 0 : pageNumber,
      },
    });
    dispatch({
      type: 'FETCH_FLIGHTS',
      payload: response,
    });
  };
};

export const selectAircraft = (aircraft) => {
  return async function (dispatch) {
    await dispatch(fetchFlights());
    return dispatch({
      type: 'AIRCRAFT_SELECTED',
      payload: aircraft,
    });
  };
};

export const selectFlight = (flight) => {
  return {
    type: 'FLIGHT_SELECTED',
    payload: flight,
  };
};
