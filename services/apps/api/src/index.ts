import './cron';

import { start } from './app';
import { logger } from './utils';

start().catch((err) => {
  logger.error(err);
  logger.error('NASA Explorer API crashed');
});
