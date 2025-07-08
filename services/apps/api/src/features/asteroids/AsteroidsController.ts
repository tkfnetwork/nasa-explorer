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

  /**
   * @openapi
   * /asteroids:
   *   get:
   *     operationId: getAsteroids
   *     summary: Get asteroids by date
   *     description: |
   *       Return a feed of asteroids by start and end date.
   *
   *       **Max of 7 days of data can be returned from this endpoint**
   *     parameters:
   *      - $ref: '#/components/parameters/startDate'
   *      - $ref: '#/components/parameters/endDate'
   *     tags:
   *       - Asteroids
   *     responses:
   *       200:
   *         description: Date keyed asteroid results
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   type: object
   *                   additionalProperties:
   *                     type: array
   *                     items:
   *                       $ref: '#/components/schemas/NearEarthObject'
   *                 total:
   *                   type: number
   *       400:
   *         description: Bad request
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ValidationErrorResponse'
   *       500:
   *         description: Internal Server Error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  private getAll = async (
    req: Request<unknown, GetAllResponse, unknown, GetAllQuery>,
    res: Response<GetAllResponse>,
    next: NextFunction
  ) => {
    throw Error();
    try {
      const data = await this.asteroidsService.getAsteroidsByDateRange(
        req.query
      );

      res.json(data);
    } catch (e) {
      next(e);
    }
  };

  /**
   * @openapi
   * /asteroids/positions:
   *   get:
   *     operationId: wsAsteroidsPositions
   *     summary: Websocket endpoint for retrieving asteroids positions
   *     responses:
   *       101:
   *         description: Switching Protocols - WebSocket connection established.
   */
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
