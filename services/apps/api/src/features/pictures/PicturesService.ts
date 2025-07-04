import { inject, injectable } from 'inversify';

import { TYPES } from '../../di/TYPES';
import type { NasaApiInterface } from '../api';
import type { Image } from './types';

export interface PicturesServiceInterface {
  getToday(): Promise<Image>;
}

@injectable()
export class PicturesService implements PicturesServiceInterface {
  public constructor(
    @inject(TYPES.NasaApi) private nasaApi: NasaApiInterface
  ) {}

  public async getToday() {
    const { data } = await this.nasaApi.apod({ date: new Date() });

    const { hdurl: large, url: small } = data;

    return { large, small };
  }
}
