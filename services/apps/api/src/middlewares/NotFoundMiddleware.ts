import type { NextFunction } from 'express';

import type { MiddlewareInterface, MiddlewarePosition } from './types';
import { NotFoundError } from './lib';

export class NotFoundMiddleware implements MiddlewareInterface {
  public position: MiddlewarePosition = 'after';

  public handler = (_: unknown, __: unknown, next: NextFunction) => {
    next(new NotFoundError());
  };
}
