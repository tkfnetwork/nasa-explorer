import { Container } from 'inversify';

import type { MiddlewareHandlerInterface } from '../middlewares';
import { MiddlewareHandler } from '../middlewares';
import { TYPES } from './TYPES';
import type {
  AsteroidsControllerInterface,
  AsteroidsServiceInterface,
  HealthcheckControllerInterface,
  NasaApiInterface,
  PicturesControllerInterface,
  PicturesServiceInterface,
} from '../features';
import {
  AsteroidsController,
  AsteroidsService,
  HealthcheckController,
  NasaApi,
  PicturesController,
  PicturesService,
} from '../features';
import type { WebsocketRouterInterface } from '../ws';
import { WebsocketRouter } from '../ws';

export const container = new Container();

// System
container
  .bind<WebsocketRouterInterface>(TYPES.WebsocketRouter)
  .to(WebsocketRouter)
  .inSingletonScope();
container
  .bind<MiddlewareHandlerInterface>(TYPES.MiddlewareHandler)
  .to(MiddlewareHandler)
  .inSingletonScope();

// APIs
container.bind<NasaApiInterface>(TYPES.NasaApi).to(NasaApi);

// Pictures
container
  .bind<PicturesServiceInterface>(TYPES.PicturesService)
  .to(PicturesService);
container
  .bind<PicturesControllerInterface>(TYPES.PicturesController)
  .to(PicturesController);

// Asteroids
container
  .bind<AsteroidsServiceInterface>(TYPES.AsteroidsService)
  .to(AsteroidsService);
container
  .bind<AsteroidsControllerInterface>(TYPES.AsteroidsController)
  .to(AsteroidsController);

// Healthcheck
container
  .bind<HealthcheckControllerInterface>(TYPES.HealthcheckController)
  .to(HealthcheckController);
