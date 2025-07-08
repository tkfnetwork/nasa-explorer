import type { NextFunction, Response } from 'express';
import { Router } from 'express';
import { injectable } from 'inversify';
import { apiReference } from '@scalar/express-api-reference';

import type { Controller } from '../../types';
import openApiSpec from './openapi-spec.json';

export interface DocsControllerInterface extends Controller {}

@injectable()
export class DocsController implements DocsControllerInterface {
  public router = Router({ mergeParams: true });
  public PATH = '/';

  private apiSpecPath = '/openapi-spec.json';

  public constructor() {
    this.router.get(this.apiSpecPath, this.getOpenApiSpec);
    this.router.use('/', this.getDocs);
  }

  private getOpenApiSpec = (_: unknown, res: Response, next: NextFunction) => {
    try {
      res.json(openApiSpec);
    } catch (e) {
      next(e);
    }
  };

  private getDocs = apiReference({
    url: this.apiSpecPath,
  });
}
