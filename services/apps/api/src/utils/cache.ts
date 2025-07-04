import type { Response } from 'express';
import apicache from 'apicache';
import { StatusCodes } from 'http-status-codes';

export const apiCacheInstance = apicache.newInstance({});

export const cache = apiCacheInstance.middleware;

export const cacheOnSuccess = (_: unknown, res: Response) =>
  res.statusCode === StatusCodes.OK;
