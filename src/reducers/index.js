import { combineReducers } from 'redux';

export const initialAircraftsState = {
  aircrafts: [],
  selected: null,
};

export const aircraftsReducer = (aircraftsData = initialAircraftsState, action) => {
  switch (action.type) {
    case 'FETCH_AIRCRAFTS':
      return { ...aircraftsData, aircrafts: action.payload.data.data };
    case 'AIRCRAFT_SELECTED':
      return { ...aircraftsData, selected: action.payload };
    default:
      return aircraftsData;
  }
};

const isAllowedFlight = (rotation, origin, departureTime, arrivalTime) => {
  if (rotation.length === 0) {
    return true;
  }

  const lastFlight = rotation.slice(-1)[0];
  const isSameLocation = lastFlight.destination === origin;
  const isCompatableTime = departureTime - lastFlight.arrivaltime > 20 * 60;
  const isGroundedMidNight = arrivalTime < 86399;

  return isSameLocation && isCompatableTime && isGroundedMidNight;
};

const initialFlightsState = {
  flights: [],
  rotation: [],
  utilisation: 0,
  timeline: [],
};

export const flightsReducer = (flightsData = initialFlightsState, action) => {
  switch (action.type) {
    case 'FETCH_FLIGHTS':
      return { ...flightsData, flights: action.payload.data.data };

    case 'FLIGHT_SELECTED':
      const newRotation = [...flightsData.rotation, action.payload];
      const newFlights = flightsData.flights.filter((flight) => flight.id !== action.payload.id);
      const newUtilisation =
        newRotation.reduce((acc, flight) => acc + (flight.arrivaltime - flight.departuretime), 0) /
        864;
      const newTimeline = [
        ...flightsData.timeline,
        {
          status: 'idle',
          widthPercentage:
            flightsData.timeline.length === 0
              ? (action.payload.departuretime / (24 * 60 * 60)) * 100
              : ((action.payload.departuretime +
                  20 * 60 -
                  flightsData.rotation.slice(-1)[0].arrivaltime) /
                  (24 * 60 * 60)) *
                100,
        },
        {
          status: 'inFlight',
          widthPercentage:
            ((action.payload.arrivaltime - action.payload.departuretime) / (24 * 60 * 60)) * 100,
        },
        { status: 'turnAround', widthPercentage: ((20 * 60) / (24 * 60 * 60)) * 100 },
      ];

      if (
        isAllowedFlight(
          flightsData.rotation,
          action.payload.origin,
          action.payload.departuretime,
          action.payload.arrivaltime
        )
      ) {
        return {
          ...flightsData,
          rotation: newRotation,
          flights: newFlights,
          utilisation: newUtilisation,
          timeline: newTimeline,
        };
      }
    default:
      return flightsData;
  }
};

export default combineReducers({
  aircraftsData: aircraftsReducer,
  flightsData: flightsReducer,
});
