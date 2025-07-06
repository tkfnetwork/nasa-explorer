import type { NextFunction, Response } from 'express';
import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { injectable } from 'inversify';

import type { Controller } from '../../types';

export interface HealthcheckControllerInterface extends Controller {}

@injectable()
export class HealthcheckController implements HealthcheckControllerInterface {
  public router = Router({ mergeParams: true });
  public PATH = '/healthcheck';

  public constructor() {
    this.router.get('/', this.sendOk);
  }

  private sendOk = (_: unknown, res: Response, next: NextFunction) => {
    try {
      res.contentType('text/plain').sendStatus(StatusCodes.OK);
    } catch (e) {
      next(e);
    }
  };
}
