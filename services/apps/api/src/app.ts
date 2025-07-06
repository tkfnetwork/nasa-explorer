import 'reflect-metadata';

import express from 'express';
import http from 'http';

import { API_PORT } from './config';
import { container } from './di/container';
import { TYPES } from './di/TYPES';
import type { MiddlewareHandlerInterface } from './middlewares';
import { router } from './router';
import { logger } from './utils';
import { withWebsockets } from './ws';

export const start = async (listen = true) => {
  const app = express();
  const server = http.createServer(app);

  withWebsockets(server);

  const { before, after } = container.get<MiddlewareHandlerInterface>(
    TYPES.MiddlewareHandler
  );

  app.use(...before);
  app.use(router);
  app.use(...after);

  if (listen) {
    server.listen(API_PORT, () => {
      logger.info(`NASA Explorer API running on ${API_PORT}`);
    });
  }

  return app;
};
