import { config } from 'dotenv';

import { envValidation } from './validation';

config();

export const { NODE_ENV, API_PORT, LOG_LEVEL } = envValidation.parse(
  process.env
);

export const isDev = NODE_ENV === 'development';
