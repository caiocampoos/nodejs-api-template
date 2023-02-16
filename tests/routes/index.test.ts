import server from '../../src/server';
import { describe, test, expect } from 'vitest';

describe('GET /', () => {
  test('Should return im OK!', async () => {
    const response = await server.inject({
      method: 'GET',
      path: '/healthcheck',
    });
    expect(response.statusCode).eq(200);
    expect(response.json()).deep.eq({ status: 'im OK!' });
  });
});
