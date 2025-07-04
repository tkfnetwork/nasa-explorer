import type z from 'zod';

import type { apodParamsValidation } from './validation';

export type ApodParams = z.infer<typeof apodParamsValidation>;

export type ApodResponse = {
  copyright: string;
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
};
