import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchAircrafts, fetchFlights } from '../actions';
import AircraftsList from './AircraftsList';
import FlightsList from './FlightsList';
import RotationList from './RotationList';
import Timeline from './Timeline';
import Pagination from './Pagination';

const App = (props) => {
  useEffect(() => {
    props.fetchAircrafts();
  }, []);

  const [pageNumber, setPageNumber] = useState(0);

  const handleNext = () => {
    setPageNumber(pageNumber + 1);
    props.fetchFlights(pageNumber + 1);
  };

  const handlePrevious = () => {
    setPageNumber(pageNumber - 1);
    props.fetchFlights(pageNumber - 1);
  };

  return (
    <div>
      <div className="container mx-auto font-mono">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-4xl text-center">Aircrafts</p>
            <AircraftsList />
          </div>
          <div>
            <p className="text-4xl text-center">Rotation:{props.aircraftName}</p>
            <RotationList />
          </div>
          <div>
            <p className="text-4xl text-center">Flights</p>
            <div
              className="overscroll-auto bg-gray-50"
              style={{ overflow: 'scroll', height: '75vh' }}
            >
              <FlightsList />
            </div>
            {props.aircraftName ? (
              <Pagination
                handleNext={handleNext}
                handlePrevious={handlePrevious}
                pageNumber={pageNumber}
              />
            ) : null}
          </div>
        </div>
        <div>
          <p className="text-4xl text-center">Aircraft Timeline</p>
          <Timeline />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    aircraftName: state.aircraftsData.selected,
  };
};

const mapDispatchToProps = {
  fetchAircrafts,
  fetchFlights,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
