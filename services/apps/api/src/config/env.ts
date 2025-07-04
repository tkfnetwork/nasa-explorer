import { config } from 'dotenv';

import { envValidation } from './validation';
import { getEnv } from './core';

config();

export const {
  NODE_ENV,
  API_PORT,
  LOG_LEVEL,
  NASA_API_BASE_URL,
  NASA_API_KEY,
} = envValidation.parse(getEnv());

export const isDev = NODE_ENV === 'development';
