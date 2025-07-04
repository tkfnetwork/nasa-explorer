import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { injectable } from 'inversify';

import { NASA_API_BASE_URL, NASA_API_KEY } from '../../../config';
import type { ApodParams, ApodResponse } from './types';
import { formatDate } from './utils';

export interface NasaApiInterface {
  apod: (params?: ApodParams) => Promise<AxiosResponse<ApodResponse>>;
}

@injectable()
export class NasaApi implements NasaApiInterface {
  private client = axios.create({
    baseURL: NASA_API_BASE_URL,
    params: {
      api_key: NASA_API_KEY,
    },
  });

  public apod = (params?: ApodParams) =>
    this.client.get<ApodResponse>('/planetary/apod', {
      params: {
        ...params,
        date: formatDate(params?.date),
        start_date: formatDate(params?.start_date),
        end_date: formatDate(params?.end_date),
      },
    });
}
