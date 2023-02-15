import { Type } from '@sinclair/typebox';
import { FastifyPluginAsync } from 'fastify';

const routes: FastifyPluginAsync = async (server) => {
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
