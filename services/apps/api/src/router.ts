import { Router } from 'express';

import { container } from './di/container';
import { TYPES } from './di/TYPES';
import type { Controller } from './types';
import { logger } from './utils';

export const router = Router({ mergeParams: true });

[
  // Order is important here

  TYPES.PicturesController,
  TYPES.AsteroidsController,

  TYPES.HealthcheckController,
  TYPES.DocsController,
].forEach((id) => {
  const controller = container.get<Controller>(id);

  // Log paths when debugging
  logger.debug(controller.PATH);

  router.use(controller.PATH, controller.router);
});
