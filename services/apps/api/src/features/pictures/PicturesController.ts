import type { NextFunction, Response } from 'express';
import { Router } from 'express';
import { inject, injectable } from 'inversify';

import { TYPES } from '../../di/TYPES';
import type { Controller } from '../../types';
import { cache, cacheOnSuccess } from '../../utils';
import { PicturesCacheKeys } from './constants';
import type { PicturesServiceInterface } from './PicturesService';

export interface PicturesControllerInterface extends Controller {}

@injectable()
export class PicturesController implements PicturesControllerInterface {
  public router = Router({ mergeParams: true });
  public PATH = '/pictures';

  public constructor(
    @inject(TYPES.PicturesService)
    private picturesService: PicturesServiceInterface
  ) {
    this.router.get(
      '/today',
      cache('24 hours', cacheOnSuccess, PicturesCacheKeys.Today),
      this.getToday
    );
  }

  private getToday = async (_: unknown, res: Response, next: NextFunction) => {
    try {
      const data = await this.picturesService.getToday();

      res.json(data);
    } catch (e) {
      next(e);
    }
  };
}
