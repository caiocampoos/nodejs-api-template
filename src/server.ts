import fastify from 'fastify';
import config from './plugins/config.js';
import routes from './routes/index.js';
import { fastifyPostgres } from '@fastify/postgres'

const server = fastify({
  ajv: {
    customOptions: {
      removeAdditional: "all",
      coerceTypes: true,
      useDefaults: true,
    }
  },
  logger: {
    level: process.env.LOG_LEVEL,
  },
});

server.register(fastifyPostgres, {
  connectionString: `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`,
});


await server.register(config);
await server.register(routes);
await server.ready();

export default server;
