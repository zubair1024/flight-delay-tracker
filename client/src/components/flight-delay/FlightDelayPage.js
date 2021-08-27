import { useState } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getFlightDelayInfo, setLoading } from '../../actions/amadeus';
import DateField from '../base/DateField';
import TextField from '../base/TextField';
import TimeField from '../base/TimeField';
import FlightDelayResults from './FlightDelayResults';

const FlightInfoPage = ({ loading, getFlightDelayInfo, data }) => {
  const [formData, setFormData] = useState({
    originLocationCode: '',
    destinationLocationCode: '',
    departureDate: '',
    departureTime: '',
    arrivalDate: '',
    arrivalTime: '',
    aircraftCode: '',
    carrierCode: '',
    flightNumber: '',
    duration: '',
  });

  /**
   *
   * @param {Event} e
   */
  const onFieldChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /**
   *
   * @param {SyntheticBaseEvent} e
   */
  const onFormSubmit = (e) => {
    try {
      e.preventDefault();
      debugger;
      // getFlightDelayInfo({
      //   originLocationCode: 'NCE',
      //   destinationLocationCode: 'IST',
      //   departureDate: '2020-08-01',
      //   departureTime: '18:20:00',
      //   arrivalDate: '2020-08-01',
      //   arrivalTime: '22:15:00',
      //   aircraftCode: '321',
      //   carrierCode: 'TK',
      //   flightNumber: '1816',
      //   duration: 'PT31H10M',
      // });
      getFlightDelayInfo(formData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="FlightInfoPage min-h-screen flex flex-col justify-center items-center space-y-10 md:flex-row md:space-y-0 md:space-x-7">
      <div className="bg-gray-900 p-5 rounded-lg shadow-2xl w-80">
        <form
          className="flex flex-col justify-center items-center space-y-2"
          onSubmit={onFormSubmit}
        >
          <p className="text-center mb-2 font-bold">Fill Form To Get Delay Probability</p>
          <div className="w-full">
            <TextField
              field="originLocationCode"
              label="Origin Location Code"
              placeholder="NCE"
              value={formData.originLocationCode}
              // required
              onFieldChange={onFieldChange}
            ></TextField>
          </div>

          <div className="w-full">
            <TextField
              field="destinationLocationCode"
              label="Destination Location Code"
              placeholder="IST"
              value={formData.destinationLocationCode}
              // required
              onFieldChange={onFieldChange}
            ></TextField>
          </div>

          <div className="w-full">
            <DateField
              field="departureDate"
              label="Departure Date"
              placeholder="Departure Date"
              value={formData.departureDate}
              // required
              onFieldChange={onFieldChange}
            ></DateField>
          </div>

          <div className="w-full">
            <TimeField
              field="departureTime"
              label="Departure Time"
              placeholder="Departure Time"
              value={formData.departureTime}
              // required
              onFieldChange={onFieldChange}
            ></TimeField>
          </div>

          <div className="w-full">
            <DateField
              field="arrivalDate"
              label="Arrival Date"
              placeholder="Arrival Date"
              value={formData.arrivalDate}
              // required
              onFieldChange={onFieldChange}
            ></DateField>
          </div>

          <div className="w-full">
            <TimeField
              field="arrivalTime"
              label="Arrival Time"
              placeholder="Arrival Time"
              value={formData.arrivalTime}
              // required
              onFieldChange={onFieldChange}
            ></TimeField>
          </div>

          <div className="w-full">
            <TextField
              field="aircraftCode"
              label="Aircraft Code"
              placeholder="321"
              value={formData.aircraftCode}
              // required
              onFieldChange={onFieldChange}
            ></TextField>
          </div>

          <div className="w-full">
            <TextField
              field="carrierCode"
              label="Carrier Code"
              placeholder="TK"
              value={formData.carrierCode}
              // required
              onFieldChange={onFieldChange}
            ></TextField>
          </div>

          <div className="w-full">
            <TextField
              field="flightNumber"
              label="Flight Number"
              placeholder="1816"
              value={formData.flightNumber}
              // required
              onFieldChange={onFieldChange}
            ></TextField>
          </div>

          <div className="w-full">
            <TextField
              field="duration"
              label="Duration"
              placeholder="PT31H10M"
              value={formData.duration}
              // required
              onFieldChange={onFieldChange}
            ></TextField>
          </div>

          <div className="pt-3">
            <input
              type="submit"
              name="submit"
              id="submit"
              value={loading ? 'Loading...' : 'Check Probability'}
              className="py-2 px-2 rounded-xl bg-gray-700 active:bg-gray-600 hover:bg-gray-500 hover:shadow-2xl border border-current border-gray-500 font-bold"
              disabled={loading}
            />
          </div>
        </form>
      </div>

      {/* This is where result goes */}
      {data && <FlightDelayResults />}
    </div>
  );
};

FlightInfoPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.object,
};

const mapStateToProps = (state) => ({
  loading: state?.amadeus?.loading,
  data: state?.amadeus?.data,
});

export default connect(mapStateToProps, { getFlightDelayInfo, setLoading })(
  FlightInfoPage
);
