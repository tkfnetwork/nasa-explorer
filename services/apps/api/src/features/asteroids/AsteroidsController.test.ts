import { format } from 'date-fns';
import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import request from 'supertest';

import { start } from '../../app';
import { neoObjectBaseFactory } from '../api/nasa/_mocks';

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

describe('GET /asteroids', () => {
  it('returns correct response', async () => {
    const mockData = neoObjectBaseFactory.buildList(3);

    const neoFeedMock = {
      near_earth_objects: {
        [format(new Date(), 'yyyy-MM-dd')]: mockData,
      },
      element_count: mockData.length,
    };

    server.use(
      http.get('http://stub/neo/rest/v1/feed', () =>
        HttpResponse.json(neoFeedMock)
      )
    );

    const res = await request(await start(false))
      .get('/asteroids')
      .expect(StatusCodes.OK);

    expect(JSON.parse(res.text)).toEqual({
      data: Object.fromEntries(
        Object.entries(neoFeedMock.near_earth_objects).map(([date, items]) => [
          date,
          items.map(({ links: _, ...item }) => item),
        ])
      ),
      total: neoFeedMock.element_count,
    });
  });
});
