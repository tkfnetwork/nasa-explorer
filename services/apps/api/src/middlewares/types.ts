import type { ErrorRequestHandler, Handler } from 'express';

export type MiddlewarePosition = 'before' | 'after';

export type MiddlewareHandlerMiddlewares = Handler | ErrorRequestHandler;

export interface MiddlewareHandlerInterface {
  before: MiddlewareHandlerMiddlewares[];
  after: MiddlewareHandlerMiddlewares[];
  registerMiddleware: (middleware: MiddlewareInterface) => void;
}

type MiddlewareHandler = MiddlewareHandlerMiddlewares | Handler[];
export interface MiddlewareInterface {
  handler: MiddlewareHandler;
  position: MiddlewarePosition;
}
