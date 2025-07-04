import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker';

import { start } from '../../app';

jest.mock('../../config/core', () => ({
  getEnv: jest.fn(() => ({
    API_PORT: 3008,
    LOG_LEVEL: 'info',
    NODE_ENV: 'development',
    NASA_API_BASE_URL: 'http://stub',
    NASA_API_KEY: '12345678',
  })),
}));

const imageResponseMock = {
  url: faker.image.url(),
  hdurl: faker.image.url(),
};

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
    server.use(
      http.get(`http://stub/planetary/apod`, () =>
        HttpResponse.json(imageResponseMock)
      )
    );

    const res = await request(await start())
      .get('/pictures/today')
      .expect(StatusCodes.OK);

    expect(JSON.parse(res.text)).toEqual({
      large: imageResponseMock.hdurl,
      small: imageResponseMock.url,
    });
  });
});
