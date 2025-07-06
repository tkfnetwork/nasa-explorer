import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import request from 'supertest';

import { start } from '../../app';
import { apodResponseFactory } from '../api/nasa/_mocks';

jest.mock('../../config/core', () => ({
  getEnv: jest.fn(() => ({
    API_PORT: 3008,
    LOG_LEVEL: 'info',
    NODE_ENV: 'development',
    NASA_API_BASE_URL: 'http://stub',
    NASA_API_KEY: '12345678',
  })),
}));

const server = setupServer();

beforeAll(() =>
  server.listen({
    onUnhandledRequest(request, print) {
      // Ignore supertests requests
      if (request.url.includes('127.0.0.1')) {
        return;
      }

      print.warning();
    },
  })
);
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('GET /pictures/today', () => {
  it('returns correct response', async () => {
    const expected = apodResponseFactory.build();

    server.use(
      http.get('http://stub/planetary/apod', () => HttpResponse.json(expected))
    );

    const res = await request(await start(false))
      .get('/pictures/today')
      .expect(StatusCodes.OK);

    expect(JSON.parse(res.text)).toEqual({
      large: expected.hdurl,
      small: expected.url,
    });
  });
});
