export const TYPES = {
  // APIs
  NasaApi: Symbol.for('NasaApi'),

  // Pictures
  PicturesService: Symbol.for('PicturesService'),
  PicturesController: Symbol.for('PicturesController'),

  // Healthcheck
  HealthcheckController: Symbol.for('HealthcheckController'),

  // System
  MiddlewareHandler: Symbol.for('MiddlewareHandler'),
} as const;
