import { Router } from 'express';
import { validationResult, check } from 'express-validator';

import AmadeusConnector from '../../utils/Amadeus-Connector.js';

const router = Router();

/**
 * @route   GET api/flight
 * @desc    Test route
 * @access  public
 */
router.get('/', (_, res) => {
  res.send('Success');
});

/**
 * @route   GET api/flight
 * @desc    Test route
 * @access  public
 */
router.get(
  '/delay-info',
  [
    check('originLocationCode', 'The originLocationCode is needed').isString(),
    check('destinationLocationCode', 'The destinationLocationCode is needed').isString(),
    check('departureDate', 'The departureDate is needed').isString(),
    check('departureTime', 'The departureTime is needed').isString(),
    check('arrivalDate', 'The arrivalDate is needed').isString(),
    check('arrivalTime', 'The arrivalTime is needed').isString(),
    check('aircraftCode', 'The aircraftCode is needed').isString(),
    check('carrierCode', 'The carrierCode is needed').isString(),
    check('flightNumber', 'The flightNumber is needed').isString(),
    check('duration', 'The duration is needed').isString(),
  ],
  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const amadeus = await AmadeusConnector.getInstance();

      // @ts-expect-error ignore this
      const delayData = await amadeus.getFlightDelayDetails(req.query);

      const result = {};

      delayData.data.forEach((i) => {
        result[i.result] = Number(i.probability) * 100;
      });

      return res.json(result);
    } catch (err) {
      res.status(500).json({
        errors: [
          {
            msg: 'Interval Server Error',
          },
        ],
      });
    }
  }
);

export default router;
