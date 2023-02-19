import fastify from 'fastify';
import fjwt, { JWT } from "@fastify/jwt";
import swagger from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'
import { withRefResolver } from "fastify-zod";
import config from './plugins/config.js';
import doctorRoutes from './modules/doctor/doctor.routes.js'
import appointmentRoutes from './modules/appoitment/appointment.routes.js'
import patientRoutes from './modules/patient/patient.routes.js'
import { doctorSchemas } from './modules/doctor/doctor.schema.js'
import { appointmentSchemas } from './modules/appoitment/appointment.schema.js';
import { patientSchemas } from './modules/patient/patient.schema.js';


import { FastifyRequest, FastifyReply } from "fastify";

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
for (const schema of [ ...doctorSchemas, ...appointmentSchemas, ...patientSchemas ]) {
  server.addSchema(schema);
}

server.get("/", async function () {
  return { status: "im OK!" };
});

server.register(
  swagger,
  withRefResolver({
    openapi: {
      info: {
        title: "TS Api Template",
        description:
          "API template Fastify",
        version: "1.0.0",
      },
    },
  })
);

server.register(swaggerUI, {
  routePrefix: "/docs",
  staticCSP: false,
})

await server.register(doctorRoutes, { prefix: "api/doctor" });
await server.register(appointmentRoutes, {prefix: "api/appointments" })
await server.register(patientRoutes, {prefix: "api/patient" })
await server.ready();
server.swagger()

export default server;
