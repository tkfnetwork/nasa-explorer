import nodeCron from 'node-cron';

import { apiCacheInstance, logger } from './utils';
import { AsteroidsCacheKeys, PicturesCacheKeys } from './features';

nodeCron.schedule('0 0 * * *', () => {
  logger.info('Clearing cache...');

  [PicturesCacheKeys.Today, AsteroidsCacheKeys.Feed].forEach((key) => {
    apiCacheInstance.clear(key);
  });
});
