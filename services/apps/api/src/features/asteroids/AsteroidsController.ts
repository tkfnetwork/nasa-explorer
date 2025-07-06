import { validate } from '@ne/request-validation';
import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import { inject, injectable } from 'inversify';
import chunk from 'lodash/chunk';

import { TYPES } from '../../di/TYPES';
import type { Controller } from '../../types';
import type { AsteroidsServiceInterface } from './AsteroidsService';
import type { GetAllQuery, GetAllResponse } from './types';
import { getAllQueryValidation, wsPositionsValidation } from './validation';
import { cache, cacheOnSuccess } from '../../utils';
import type { WebsocketRouterInterface, WebsocketHandler } from '../../ws';
import { AsteroidsCacheKeys } from './constants';

export interface AsteroidsControllerInterface extends Controller {}

@injectable()
export class AsteroidsController implements AsteroidsControllerInterface {
  public router = Router({ mergeParams: true });
  public PATH = '/asteroids';

  public constructor(
    @inject(TYPES.WebsocketRouter)
    private ws: WebsocketRouterInterface,
    @inject(TYPES.AsteroidsService)
    private asteroidsService: AsteroidsServiceInterface
  ) {
    this.router.get(
      '/',
      validate({ query: getAllQueryValidation }),
      cache('24 hours', cacheOnSuccess, AsteroidsCacheKeys.Feed),
      this.getAll
    );

    this.ws.register(`${this.PATH}/positions`, this.wsPositions);
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

  private wsPositions: WebsocketHandler = async (ws) => {
    ws.on('message', async (msg) => {
      const data = wsPositionsValidation.parse(JSON.parse(msg.toString()));

      const batches = chunk(data, 5);

      for (const batch of batches) {
        const data = await Promise.all(
          batch.map(async (id) => {
            try {
              const data = await this.asteroidsService.getPositionById(id);
              return [id, data];
            } catch {
              // TODO: Add better reporting here on what went wrong
              return [id, null];
            }
          })
        );

        ws.send(JSON.stringify(Object.fromEntries(data)));
      }
    });
  };
}
