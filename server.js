import path from 'path';

import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();
import AmadeusConnector from './utils/Amadeus-Connector.js';
import { logger } from './winston.js';

const run = async () => {
  const app = express();

  // init middleware
  // @ts-expect-error ignore this
  app.use(express.json({ extended: false }));

  app.use(cors());
  app.use(compression());

  // establish connect to API server and fetch token
  await AmadeusConnector.getInstance();

  const PORT = process.env.PORT ?? 5000;

  // Define Routes
  app.use('/api/flight', (await import('./routes/api/flight.js')).default);

  // serve static assets in production
  if (process.env.NODE_ENV === 'production') {
    // set the static folder
    app.use(express.static('client/build'));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
    });
  }

  app.listen(PORT, () => logger.info(`Server started on port ${PORT}`));
};

run().catch((err) => {
  logger.error(err);
  process.exit(1);
});
