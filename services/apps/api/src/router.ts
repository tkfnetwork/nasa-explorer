import { Router } from 'express';

import { container } from './di/container';
import { TYPES } from './di/TYPES';
import type {
  AsteroidsControllerInterface,
  HealthcheckControllerInterface,
  PicturesControllerInterface,
} from './features';
import { logger } from './utils';

export const router = Router({ mergeParams: true });
export const sourceRouter = Router({ mergeParams: true });

[
  container.get<HealthcheckControllerInterface>(TYPES.HealthcheckController),
  container.get<PicturesControllerInterface>(TYPES.PicturesController),
  container.get<AsteroidsControllerInterface>(TYPES.AsteroidsController),
].forEach((controller) => {
  // Log paths when debugging
  logger.debug(controller.PATH);

  router.use(controller.PATH, controller.router);
});
