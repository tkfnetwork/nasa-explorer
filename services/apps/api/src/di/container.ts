import { Container } from 'inversify';

import type { MiddlewareHandlerInterface } from '../middlewares';
import { MiddlewareHandler } from '../middlewares';
import { TYPES } from './TYPES';
import type {
  HealthcheckControllerInterface,
  NasaApiInterface,
} from '../features';
import { HealthcheckController, NasaApi } from '../features';

export const container = new Container();

// APIs
container.bind<NasaApiInterface>(TYPES.NasaApi).to(NasaApi);

// Healthcheck
container
  .bind<HealthcheckControllerInterface>(TYPES.HealthcheckController)
  .to(HealthcheckController);

// System
container
  .bind<MiddlewareHandlerInterface>(TYPES.MiddlewareHandler)
  .to(MiddlewareHandler);
