import { initialAircraftsState, aircraftsReducer, flightsReducer } from './index';

describe('aircraftsReducer', () => {
  it('should return initial state', () => {
    expect(aircraftsReducer(undefined, {})).toEqual({
      aircrafts: [],
      selected: null,
    });
  });

  it('should handle FETCH_AIRCRAFTS', () => {
    const responseData = {
      data: {
        data: [
          {
            id: 'AS1001',
            departuretime: 21600,
            arrivaltime: 26100,
            readable_departure: '06:00',
            readable_arrival: '07:15',
            origin: 'LFSB',
            destination: 'LFMN',
          },
        ],
      },
    };

    expect(
      aircraftsReducer(initialAircraftsState, {
        type: 'FETCH_AIRCRAFTS',
        payload: responseData,
      })
    ).toEqual({ aircrafts: responseData.data.data, selected: null });
  });

  it('should handle AIRCRAFT_SELECTED', () => {
    const aircraft = {
      ident: 'GABCD',
      type: 'A320',
      economySeats: 186,
      base: 'EGKK',
    };

    expect(
      aircraftsReducer(initialAircraftsState, {
        type: 'AIRCRAFT_SELECTED',
        payload: aircraft,
      })
    ).toEqual({ aircrafts: [], selected: aircraft });
  });
});
