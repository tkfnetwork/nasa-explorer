import { validate } from '@ne/request-validation';
import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import { inject, injectable } from 'inversify';

import { TYPES } from '../../di/TYPES';
import type { Controller } from '../../types';
import type { AsteroidsServiceInterface } from './AsteroidsService';
import type { GetAllQuery, GetAllResponse } from './types';
import { getAllQueryValidation } from './validation';

export interface AsteroidsControllerInterface extends Controller {}

@injectable()
export class AsteroidsController implements AsteroidsControllerInterface {
  public router = Router({ mergeParams: true });
  public PATH = '/asteroids';

  public constructor(
    @inject(TYPES.AsteroidsService)
    private asteroidsService: AsteroidsServiceInterface
  ) {
    this.router.get(
      '/',
      validate({ query: getAllQueryValidation }),
      this.getAll
    );
  }

  private getAll = async (
    req: Request<unknown, GetAllResponse, unknown, GetAllQuery>,
    res: Response<GetAllResponse>,
    next: NextFunction
  ) => {
    try {
      const data = await this.asteroidsService.getAsteroidsByDateRange(
        req.query
      );

      res.json(data);
    } catch (e) {
      next(e);
    }
  };
}
