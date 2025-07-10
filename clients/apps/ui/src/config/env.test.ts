import { expect, test, vi } from 'vitest';
import * as ENV from './env';

vi.mock('./core', () => ({
  getEnv: vi.fn(() => ({
    NODE_ENV: 'development',
    VITE_API_BASE_URL: 'http://stub',
  })),
}));

test('expect env to return shortened variables', () => {
  expect(ENV).toEqual(
    expect.objectContaining({
      NODE_ENV: 'development',
      API_BASE_URL: 'http://stub',
      isDev: true,
    })
  );
});
