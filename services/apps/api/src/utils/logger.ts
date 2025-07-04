import winston from 'winston';

import { LOG_LEVEL } from '../config';

const { combine, timestamp, json, colorize, simple, errors } = winston.format;

export const logger = winston.createLogger({
  level: LOG_LEVEL,
  format: combine(json(), errors({ stack: true }), timestamp()),
  transports: [
    new winston.transports.Console({
      level: LOG_LEVEL,
      format: combine(colorize({ all: true }), simple()),
    }),
  ],
});
