import axios from 'axios';
import qs from 'qs';

import { logger } from '../winston.js';

class AmadeusConnector {
  /**@type {AmadeusConnector} */
  static _instance;
  /**
   * @param {string} baseUrl
   * @param {string} key
   * @param {string} secret
   */
  constructor(
    baseUrl = 'https://test.api.amadeus.com/v1',
    key = process.env.AMADEUS_KEY,
    secret = process.env.AMADEUS_SECRET
  ) {
    this.baseUrl = baseUrl;
    this.key = key;
    this.secret = secret;
    this.tokenExpired = true;
    this.accessToken = null;
    this.tokenExpiryInterval = null;
  }
  /**
   * @returns {Promise<void>}
   */
  async fetchToken() {
    try {
      logger.info(`Fetching API token...`);
      if (this.accessToken && !this.tokenExpired) return;
      const data = qs.stringify({
        grant_type: 'client_credentials',
        client_id: this.key,
        client_secret: this.secret,
      });
      const res = await axios.post(`${this.baseUrl}/security/oauth2/token`, data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      logger.info(`Successfully fetched API token...`);

      const expiry = res.data.expires_in;
      this.setTokenExpiry(expiry);

      this.accessToken = res?.data?.access_token;
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }
  /**
   * @param {number} interval in seconds
   */
  setTokenExpiry(interval) {
    if (this.tokenExpiryInterval) clearTimeout(this.tokenExpiryInterval);
    this.tokenExpiryInterval = setTimeout(async () => {
      logger.info(`API token expired, re-fetching...`);
      this.tokenExpired = true;
      await this.fetchToken();
    }, interval * 1000);
  }
  /**
   * @returns {Promise<AmadeusConnector>}
   */
  static async getInstance() {
    if (AmadeusConnector._instance) return AmadeusConnector._instance;
    AmadeusConnector._instance = new AmadeusConnector();
    if (
      !AmadeusConnector._instance.accessToken ||
      AmadeusConnector._instance.tokenExpired
    )
      await AmadeusConnector._instance.fetchToken();
    return AmadeusConnector._instance;
  }

  /**
   *
   * @param {Object} obj
   * @param {string} obj.originLocationCode
   * @param {string} obj.destinationLocationCode
   * @param {string} obj.departureDate
   * @param {string} obj.departureTime
   * @param {string} obj.arrivalDate
   * @param {string} obj.arrivalTime
   * @param {string} obj.aircraftCode
   * @param {string} obj.carrierCode
   * @param {string} obj.flightNumber
   * @param {string} obj.duration
   * @returns {Promise<any>}
   */
  async getFlightDelayDetails({
    originLocationCode,
    destinationLocationCode,
    departureDate,
    departureTime,
    arrivalDate,
    arrivalTime,
    aircraftCode,
    carrierCode,
    flightNumber,
    duration,
  }) {
    const queryString = qs.stringify({
      originLocationCode,
      destinationLocationCode,
      departureDate,
      departureTime,
      arrivalDate,
      arrivalTime,
      aircraftCode,
      carrierCode,
      flightNumber,
      duration,
    });
    const res = await axios.get(
      this.baseUrl + `/travel/predictions/flight-delay?${queryString}`,
      {
        headers: { Authorization: `Bearer ${this.accessToken}` },
      }
    );
    return res.data;
  }
}

export default AmadeusConnector;
