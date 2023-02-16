import fastify from 'fastify';
import config from './plugins/config.js';
import { doctorSchemas } from './modules/doctor/doctor.schema.js'
import doctorRoutes from './modules/doctor/doctor.routes.js'
import { withRefResolver } from "fastify-zod";
import fjwt, { JWT } from "@fastify/jwt";
import swagger from '@fastify/swagger'

import { FastifyRequest, FastifyReply } from "fastify";

const version = 'v1'
declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT;
  }
  export interface FastifyInstance {
    authenticate: any;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    doctor: {
      id: number;
      email: string;
      name: string;
    };
  }
}

const server = fastify({
  logger: {
    level: process.env.LOG_LEVEL,
  },
});


await server.register(config);
await server.register(fjwt, {
  secret: 'secret'
});
server.decorate(
  "authenticate",
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (e) {
      return reply.send(e);
    }
  }
);
server.addHook("preHandler", (req, reply, next) => {
  req.jwt = server.jwt;
  return next();
});

for (const schema of [...doctorSchemas ]) {
  server.addSchema(schema);
}

server.get("/healthcheck", async function () {
  return { status: "im OK!" };
});

await server.register(
  swagger,
  withRefResolver({
    routePrefix: "/docs",
    exposeRoute: true,
    staticCSP: true,
    openapi: {
      info: {
        title: "Fastify API",
        description: "API for some products",
        version,
      },
    },
  })
);
await server.register(doctorRoutes, { prefix: "api/doctor" });
await server.ready();

export default server;
