import { Type } from '@sinclair/typebox';
import { FastifyPluginAsync } from 'fastify';

const routes: FastifyPluginAsync = async (server) => {
  server.get('/calc', async () => {
    const client = await server.pg.connect();
  
    const sumResult = await client.query<{ sum: number }>('SELECT 2 + 2 as sum');
  
    client.release();
  
    return {
      sum: sumResult.rows,
    };
  });
  server.get('/', {
   schema: {
      response: {
        200: Type.Object({
          hello: Type.String(),
        }),
      },
    }, 
  }, async function () {
    return { hello: 'world of suffering and despair!' };
  });
}

export default routes;
