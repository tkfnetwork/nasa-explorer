import { inject, injectable } from 'inversify';
import NodeCache from 'node-cache';

import { TYPES } from '../../di/TYPES';
import type { NasaApiInterface, NeoOrbitalData } from '../api';
import type { GetAllQuery, GetAllResponse } from './types';

export interface AsteroidsServiceInterface {
  getAsteroidsByDateRange: (params?: GetAllQuery) => Promise<GetAllResponse>;
  getPositionById: (id: string) => Promise<NeoOrbitalData>;
}

@injectable()
export class AsteroidsService implements AsteroidsServiceInterface {
  private positionsCache = new NodeCache({
    stdTTL: 86400,
  });

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

  public async getPositionById(id: string) {
    const cachedResult = this.positionsCache.get<NeoOrbitalData>(id);

    if (cachedResult) {
      return cachedResult;
    }

    const { data } = await this.nasaApi.neoById(id);

    this.positionsCache.set<NeoOrbitalData>(id, data.orbital_data);

    return data.orbital_data;
  }
}
