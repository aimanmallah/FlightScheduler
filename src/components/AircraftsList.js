import { connect } from 'react-redux';

import { selectAircraft } from '../actions';

const AircraftsList = (props) => {
  const isSelected = props.selectedAircraft !== null ? 'bg-green-100' : '';

  return props.aircrafts.length === 0 ? null : (
    <div>
      <div className="flex flex-col items-center">
        {props.aircrafts.aircrafts.map((aircraft) => (
          <div
            key={aircraft.ident}
            className={`w-80 h-32 rounded overflow-hidden shadow-lg my-2 hover:bg-green-50 ${isSelected}`}
            onClick={() => props.selectAircraft(aircraft.ident)}
          >
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{aircraft.ident}</div>
              <p className="text-grey-darker font-bold text-base">
                Type: <span className="font-normal">{aircraft.type}</span>
              </p>
              <p className="text-grey-darker font-bold text-base">
                Seats: <span className="font-normal">{aircraft.economySeats}</span>
              </p>
              <p className="text-grey-darker font-bold text-base">
                Utilisation:
                <span className="font-normal">{props.aircraftUtilisation.toFixed(2)}%</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapDispatchToProps = { selectAircraft };

const mapStateToProps = (state) => {
  return {
    aircrafts: state.aircraftsData,
    selectedAircraft: state.aircraftsData.selected,
    aircraftUtilisation: state.flightsData.utilisation,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AircraftsList);
