import { Container } from 'inversify';

import type { MiddlewareHandlerInterface } from '../middlewares';
import { MiddlewareHandler } from '../middlewares';
import { TYPES } from './TYPES';
import type {
  HealthcheckControllerInterface,
  NasaApiInterface,
  PicturesControllerInterface,
  PicturesServiceInterface,
} from '../features';
import {
  HealthcheckController,
  NasaApi,
  PicturesController,
  PicturesService,
} from '../features';

export const container = new Container();

// APIs
container.bind<NasaApiInterface>(TYPES.NasaApi).to(NasaApi);

// Pictures
container
  .bind<PicturesServiceInterface>(TYPES.PicturesService)
  .to(PicturesService);

container
  .bind<PicturesControllerInterface>(TYPES.PicturesController)
  .to(PicturesController);

// Healthcheck
container
  .bind<HealthcheckControllerInterface>(TYPES.HealthcheckController)
  .to(HealthcheckController);

// System
container
  .bind<MiddlewareHandlerInterface>(TYPES.MiddlewareHandler)
  .to(MiddlewareHandler);
