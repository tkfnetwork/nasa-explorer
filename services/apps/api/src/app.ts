import 'reflect-metadata';

import express from 'express';

import { API_PORT } from './config';
import { logger } from './utils';

export const start = async () => {
  const app = express();

  app.listen(API_PORT, () => {
    logger.info(`NASA Explorer API running on ${API_PORT}`);
  });

  return app;
};
