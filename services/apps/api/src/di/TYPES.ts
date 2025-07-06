export const TYPES = {
  // System
  MiddlewareHandler: Symbol.for('MiddlewareHandler'),
  WebsocketRouter: Symbol.for('WebsocketRouter'),

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
} as const;
