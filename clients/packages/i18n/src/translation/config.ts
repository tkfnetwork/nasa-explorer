import type { InitOptions } from 'i18next';

import { resources } from './locales';

export const defaultNS = 'common';
export const config: InitOptions = {
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  debug: process.env.NODE_ENV === 'development',
  resources,
  defaultNS,
  ns: ['common', 'asteroids'],
};
