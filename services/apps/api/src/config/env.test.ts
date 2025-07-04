import * as ENV from './env';

jest.mock('./core', () => ({
  getEnv: jest.fn(() => ({
    API_PORT: 3008,
    LOG_LEVEL: 'info',
    NODE_ENV: 'development',
    NASA_API_BASE_URL: 'http://stub',
    NASA_API_KEY: '12345678',
  })),
}));

test('expect env to return shortened variables', () => {
  expect(ENV).toEqual({
    API_PORT: 3008,
    LOG_LEVEL: 'info',
    NODE_ENV: 'development',
    NASA_API_BASE_URL: 'http://stub',
    NASA_API_KEY: '12345678',
    isDev: true,
  });
});
