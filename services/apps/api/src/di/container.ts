import { Container } from 'inversify';

import type { MiddlewareHandlerInterface } from '../middlewares';
import { MiddlewareHandler } from '../middlewares';
import { TYPES } from './TYPES';
import type { HealthcheckControllerInterface } from '../features';
import { HealthcheckController } from '../features';

export const container = new Container();

// Healthcheck
container
  .bind<HealthcheckControllerInterface>(TYPES.HealthcheckController)
  .to(HealthcheckController);

// System
container
  .bind<MiddlewareHandlerInterface>(TYPES.MiddlewareHandler)
  .to(MiddlewareHandler);
