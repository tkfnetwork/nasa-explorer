export const TYPES = {
  // APIs
  NasaApi: Symbol.for('NasaApi'),

  // Healthcheck
  HealthcheckController: Symbol.for('HealthcheckController'),

  // System
  MiddlewareHandler: Symbol.for('MiddlewareHandler'),
} as const;
