import 'reflect-metadata';

import express from 'express';

import { API_PORT } from './config';
import { logger } from './utils';
import { container } from './di/container';
import { TYPES } from './di/TYPES';
import type { MiddlewareHandlerInterface } from './middlewares';
import { router } from './router';

export const start = async () => {
  const app = express();

  const { before, after } = container.get<MiddlewareHandlerInterface>(
    TYPES.MiddlewareHandler
  );

  app.use(...before);
  app.use(router);
  app.use(...after);

  app.listen(API_PORT, () => {
    logger.info(`NASA Explorer API running on ${API_PORT}`);
  });

  return app;
};
