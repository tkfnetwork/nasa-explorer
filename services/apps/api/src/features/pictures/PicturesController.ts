import type { NextFunction, Response } from 'express';
import { Router } from 'express';
import { inject, injectable } from 'inversify';

import { TYPES } from '../../di/TYPES';
import type { Controller } from '../../types';
import { cache, cacheOnSuccess } from '../../utils';
import { PicturesCacheKeys } from './constants';
import type { PicturesServiceInterface } from './PicturesService';
import type { PicturesTodayResponse } from './types';

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

  /**
   * @openapi
   * /pictures/today:
   *   get:
   *     operationId: getTodaysPicture
   *     summary: Get picture of the day
   *     description: Returns the picture of the day large and small images
   *     tags:
   *       - Pictures
   *     responses:
   *       200:
   *         description: Object containing high res and low res image urls
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Picture'
   *       500:
   *         description: Internal Server Error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  private getToday = async (
    _: unknown,
    res: Response<PicturesTodayResponse>,
    next: NextFunction
  ) => {
    try {
      const data = await this.picturesService.getToday();

      res.json({ data });
    } catch (e) {
      next(e);
    }
  };
}
