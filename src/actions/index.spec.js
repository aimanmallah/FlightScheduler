import { selectFlight } from './index';

const flight = {
  id: 'AS1234',
  departuretime: 27000,
  arrivaltime: 33300,
  readable_departure: '07:30',
  readable_arrival: '09:15',
  origin: 'LHBP',
  destination: 'LFSB',
};

describe('selectFlight', () => {
  it('should create an action to select flight', () => {
    const expectedAction = {
      type: 'FLIGHT_SELECTED',
      payload: flight,
    };

    expect(selectFlight(flight)).toEqual(expectedAction);
  });
});
