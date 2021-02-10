import { connect } from 'react-redux';

import { selectFlight } from '../actions';

const FlightsList = (props) => {
  const onFlightSelect = (flight) => {
    props.selectFlight(flight);
  };

  const renderFlights = () => {
    return props.flights.map((flight) => (
      <div
        key={flight.id}
        className="w-80 h-32 rounded overflow-hidden shadow-lg my-2 hover:bg-green-50"
        onClick={() => onFlightSelect(flight)}
      >
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 text-center">{flight.id}</div>
          <div className="flex flex-row space-x-40">
            <div className="flex flex-col">
              <p className="text-grey-darker font-bold text-base">{flight.origin}</p>
              <p className="text-grey-darker text-base">{flight.readable_departure}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-grey-darker font-bold text-base">{flight.destination}</p>
              <p className="text-grey-darker text-base">{flight.readable_arrival}</p>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div>
      {props.flights.length >= 1 && (
        <div className="flex flex-col items-center bg-gray-50">{renderFlights()}</div>
      )}
    </div>
  );
};

const mapDispatchToProps = { selectFlight };

const mapStateToProps = (state) => {
  return { flights: state.flightsData.flights };
};

export default connect(mapStateToProps, mapDispatchToProps)(FlightsList);
