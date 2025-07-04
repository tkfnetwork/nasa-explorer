import type { ErrorRequestHandler, NextFunction, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { isDev } from '../config';
import { logger } from '../utils';
import { StatusError } from './lib';
import type { MiddlewareInterface, MiddlewarePosition } from './types';

export class ErrorMiddleware implements MiddlewareInterface {
  public position: MiddlewarePosition = 'after';

  public handler: ErrorRequestHandler = (
    err: Error,
    _: unknown,
    res: Response,
    __: NextFunction
  ) => {
    const statusCode =
      err instanceof StatusError
        ? err.statusCode
        : StatusCodes.INTERNAL_SERVER_ERROR;

    const message =
      err instanceof Error && !(err instanceof StatusError)
        ? ReasonPhrases.INTERNAL_SERVER_ERROR
        : err.message;

    res.status(statusCode).json({
      error: isDev ? err.message : message,
      ...(isDev && {
        stack: err.stack,
      }),
    });

    logger.debug(err);
  };
}
