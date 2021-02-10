import { connect } from 'react-redux';

import arrow from '../assets/arrow.png';

const RotationList = (props) => {
  const renderRotations = () => {
    return props.aircraftRotation.map((rotation) => (
      <div key={rotation.id} className="w-80 h-32 rounded overflow-hidden shadow-lg my-2">
        <div className="px-6 py-4 bg-green-100">
          <div className="font-bold text-xl mb-2">Flight: {rotation.id}</div>
          <div className="flex flex-row">
            <div className="flex flex-col">
              <p className="text-grey-darker font-bold text-base">{rotation.origin}</p>
              <p className="text-grey-darker text-base">{rotation.readable_departure}</p>
            </div>
            <div>
              <img src={arrow} className="object-scale-down h-20 w-full" />
            </div>
            <div className="flex flex-col">
              <p className="text-grey-darker font-bold text-base">{rotation.destination}</p>
              <p className="text-grey-darker text-base">{rotation.readable_arrival}</p>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div>
      {props.aircraftRotation.length > 0 && (
        <div className="flex flex-col items-center">{renderRotations()}</div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    aircraftRotation: state.flightsData.rotation,
  };
};

export default connect(mapStateToProps)(RotationList);
