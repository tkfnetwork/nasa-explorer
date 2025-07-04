import morgan from 'morgan';

import type { MiddlewareInterface, MiddlewarePosition } from './types';
import { logger } from '../utils';

export class LoggerMiddleware implements MiddlewareInterface {
  public position: MiddlewarePosition = 'before';

  static LOG_FORMAT =
    ':status :method :url :res[content-length] - :response-time ms';

  public handler = morgan(LoggerMiddleware.LOG_FORMAT, {
    stream: {
      write: (message: string) => logger.http(message),
    },
  });
}
