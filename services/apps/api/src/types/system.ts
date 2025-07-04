import type { Router } from 'express';

export interface Controller {
  PATH: string;
  router: Router;
}
