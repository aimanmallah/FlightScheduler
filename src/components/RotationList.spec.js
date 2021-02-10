import { render } from '../utils/test-utils';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import RotationList from './RotationList';

const rotationData = {
  id: 'AS1001',
  departuretime: 21600,
  arrivaltime: 26100,
  readable_departure: '06:00',
  readable_arrival: '07:15',
  origin: 'LFSB',
  destination: 'LFMN',
};

const mockStore = configureStore([]);

describe('RotationList', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      flightsData: {
        rotation: [rotationData],
      },
    });
  });

  it('renders as expected', () => {
    const { container, getByText } = render(
      <Provider store={store}>
        <RotationList />
      </Provider>
    );

    expect(container.firstChild).toMatchSnapshot();
    expect(getByText(`Flight: ${rotationData.id}`)).toBeTruthy();
    expect(getByText(`${rotationData.readable_departure}`)).toBeTruthy();
    expect(getByText(`${rotationData.readable_arrival}`)).toBeTruthy();
  });
});
