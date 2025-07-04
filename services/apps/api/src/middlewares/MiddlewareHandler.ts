import { injectable } from 'inversify';

import type {
  MiddlewareHandlerInterface,
  MiddlewareInterface,
  MiddlewarePosition,
} from './types';
import { CoreMiddleware } from './CoreMiddleware';
import { ErrorMiddleware } from './ErrorMiddleware';
import { NotFoundMiddleware } from './NotFoundMiddleware';
import { LoggerMiddleware } from './LoggerMiddleware';

@injectable()
export class MiddlewareHandler implements MiddlewareHandlerInterface {
  private middlewares = new Map<MiddlewarePosition, MiddlewareInterface[]>([
    ['before', []],
    ['after', []],
  ]);

  public constructor() {
    this.registerMiddleware(new CoreMiddleware());
    this.registerMiddleware(new LoggerMiddleware());
    this.registerMiddleware(new NotFoundMiddleware());
    this.registerMiddleware(new ErrorMiddleware());
  }

  public registerMiddleware = (middleware: MiddlewareInterface) => {
    const middlewares = this.middlewares.get(middleware.position)!;
    middlewares.push(middleware);
    this.middlewares.set(middleware.position, middlewares);
  };

  private getHandlers = (position: MiddlewarePosition) =>
    this.middlewares.get(position)!.flatMap(({ handler }) => handler);

  public get before() {
    return this.getHandlers('before');
  }

  public get after() {
    return this.getHandlers('after');
  }
}
