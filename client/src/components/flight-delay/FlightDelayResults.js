import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const FlightDelayResults = ({ data, loading }) => {
  return (
    <>
      <div className="text-center">
        <h1 className="font-black text-xl pb-5">Result {loading}</h1>
        <div className="space-y-5">
          {data.LESS_THAN_30_MINUTES && (
            <div className="bg-gray-900 shadow-2xl rounded-lg p-3 space-x-2 flex justify-between items-center">
              <p className="font-black text-2xl">
                {Number(data.LESS_THAN_30_MINUTES).toFixed(1)} %
              </p>
              <p className="font-extralight">Less than 30 Minute Delay</p>
            </div>
          )}
          {data.BETWEEN_30_AND_60_MINUTES && (
            <div className="bg-gray-900 shadow-2xl rounded-lg p-3 space-x-2 flex justify-between items-center">
              <p className="font-black text-2xl">
                {Number(data.BETWEEN_30_AND_60_MINUTES).toFixed(1)} %
              </p>
              <p className="font-extralight">Between 30 and 60 Minutes</p>
            </div>
          )}
          {data.BETWEEN_30_AND_60_MINUTES && (
            <div className="bg-gray-900 shadow-2xl rounded-lg p-3 space-x-2 flex justify-between items-center">
              <p className="font-black text-2xl">
                {Number(data.BETWEEN_30_AND_60_MINUTES).toFixed(1)} %
              </p>
              <p className="font-extralight">Between 30 and 60 Minutes</p>
            </div>
          )}
          {data.OVER_120_MINUTES_OR_CANCELLED && (
            <div className="bg-gray-900 shadow-2xl rounded-lg p-3 space-x-2 flex justify-between items-center">
              <p className="font-black text-2xl">
                {Number(data.OVER_120_MINUTES_OR_CANCELLED).toFixed(1)} %
              </p>
              <p className="font-extralight">Over 120 Minutes or Cancelled</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

FlightDelayResults.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.object,
};

const mapStateToProps = (state) => ({
  loading: state.amadeus.loading,
  data: state.amadeus.data,
});

export default connect(mapStateToProps, {})(FlightDelayResults);
