import { getEnv } from './core';
import { envValidation } from './validation';

export const { NODE_ENV, VITE_API_BASE_URL: API_BASE_URL } =
  envValidation.parse(getEnv());

export const isDev = NODE_ENV === 'development';
