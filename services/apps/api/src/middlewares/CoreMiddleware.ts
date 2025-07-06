import cors from 'cors';
import type { Handler } from 'express';
import { json } from 'express';
import helmet from 'helmet';

import type { MiddlewareInterface, MiddlewarePosition } from './types';

export class CoreMiddleware implements MiddlewareInterface {
  public position: MiddlewarePosition = 'before';

  public handler: Handler[] = [helmet(), cors(), json()];
}
