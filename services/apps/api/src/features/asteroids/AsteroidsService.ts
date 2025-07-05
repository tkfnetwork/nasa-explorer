import { inject, injectable } from 'inversify';

import { TYPES } from '../../di/TYPES';
import type { NasaApiInterface } from '../api';
import type { GetAllQuery, GetAllResponse } from './types';

export interface AsteroidsServiceInterface {
  getAsteroidsByDateRange: (params?: GetAllQuery) => Promise<GetAllResponse>;
}

@injectable()
export class AsteroidsService implements AsteroidsServiceInterface {
  public constructor(
    @inject(TYPES.NasaApi) private nasaApi: NasaApiInterface
  ) {}

  public async getAsteroidsByDateRange({
    startDate: start_date,
    endDate: end_date,
  }: GetAllQuery = {}) {
    const { data } = await this.nasaApi.neoFeed({
      start_date,
      end_date,
    });

    return {
      data: Object.fromEntries(
        Object.entries(data.near_earth_objects).map(([date, items]) => [
          date,
          items.map(({ links: _, ...item }) => item),
        ])
      ),
      total: data.element_count,
    };
  }
}
