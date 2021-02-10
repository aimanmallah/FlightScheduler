import { connect } from 'react-redux';

const Timeline = (props) => {
  const colorDecider = (status) => {
    switch (status) {
      case 'idle':
        return 'bg-gray-300';
      case 'inFlight':
        return 'bg-green-300';
      case 'turnAround':
        return 'bg-purple-300';
      default:
        return;
    }
  };

  const renderTimes = () => {
    return props.timeline.map((elem, index) => {
      const color = colorDecider(elem.status);
      return (
        <div
          key={index}
          style={{ width: `${elem.widthPercentage}%`, height: '100%' }}
          className={`${color}`}
        ></div>
      );
    });
  };

  return (
    <div>
      {props.timeline.length > 0 && (
        <div
          className="bg-gray-300 shadow-lg my-2"
          style={{
            height: '75px',
            display: 'flex',
          }}
        >
          {renderTimes()}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    timeline: state.flightsData.timeline,
  };
};

export default connect(mapStateToProps)(Timeline);
