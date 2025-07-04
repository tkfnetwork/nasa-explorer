import nodeCron from 'node-cron';

import { apiCacheInstance, logger } from './utils';
import { PicturesCacheKeys } from './features/pictures/constants';

nodeCron.schedule('0 0 * * *', () => {
  logger.info('Clearing cache...');

  apiCacheInstance.clear(PicturesCacheKeys.Today);
});
