import { inject, injectable } from 'inversify';
import NodeCache from 'node-cache';
import omit from 'lodash/omit';

import { TYPES } from '../../di/TYPES';
import type { NasaApiInterface, NeoItem } from '../api';
import type { GetAllQuery, GetAllResponse } from './types';

export interface AsteroidsServiceInterface {
  getByDateRange: (params?: GetAllQuery) => Promise<GetAllResponse>;
  getById: (id: string) => Promise<NeoItem>;
}

@injectable()
export class AsteroidsService implements AsteroidsServiceInterface {
  private itemsCache = new NodeCache({
    stdTTL: 86400,
  });

  public constructor(
    @inject(TYPES.NasaApi) private nasaApi: NasaApiInterface
  ) {}

  public async getByDateRange({
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

  public async getById(id: string) {
    const cachedResult = this.itemsCache.get<NeoItem>(id);

    if (cachedResult) {
      return cachedResult;
    }

    const { data } = await this.nasaApi.neoById(id);

    const item = omit(data, 'links') as NeoItem;
    this.itemsCache.set<NeoItem>(id, { ...item });

    return item;
  }
}
