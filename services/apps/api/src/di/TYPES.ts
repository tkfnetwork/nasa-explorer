export const TYPES = {
  // APIs
  NasaApi: Symbol.for('NasaApi'),

  // Pictures
  PicturesService: Symbol.for('PicturesService'),
  PicturesController: Symbol.for('PicturesController'),

  // Asteroids
  AsteroidsService: Symbol.for('AsteroidsService'),
  AsteroidsController: Symbol.for('AsteroidsController'),

  // Healthcheck
  HealthcheckController: Symbol.for('HealthcheckController'),

  // System
  MiddlewareHandler: Symbol.for('MiddlewareHandler'),
} as const;
