import request from 'supertest';
import { StatusCodes } from 'http-status-codes';

import { start } from '../../app';

describe('GET /healthcheck', () => {
  it('returns correct response', async () => {
    const res = await request(await start())
      .get('/healthcheck')
      .expect(StatusCodes.OK);

    expect(res.text).toEqual('OK');
  });
});
