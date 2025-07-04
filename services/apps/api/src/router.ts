import { Router } from 'express';

import { TYPES } from './di/TYPES';
import type { HealthcheckController } from './features';
import { logger } from './utils';
import { container } from './di/container';

export const router = Router({ mergeParams: true });
export const sourceRouter = Router({ mergeParams: true });

[container.get<HealthcheckController>(TYPES.HealthcheckController)].forEach(
  (controller) => {
    // Log paths when debugging
    logger.debug(controller.PATH);

    router.use(controller.PATH, controller.router);
  }
);
