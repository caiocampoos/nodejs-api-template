
import { FastifyInstance } from "fastify";
import {
  loginHandler,
  registerDoctorHandler,
  getUsersHandler,
} from "./doctor.controller.js";
import { $ref } from "./doctor.schema.js";


async function doctorRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      schema: {
        body: $ref("createDoctorSchema"),
        response: {
          201: $ref("createDoctorResponseSchema"),
        },
      },
    },
    registerDoctorHandler
  );

  server.post(
    "/login",
    {
      schema: {
        body: $ref("loginSchema"),
        response: {
          200: $ref("loginResponseSchema"),
        },
      },
    },
    loginHandler
  );

  server.get(
    "/",
    {
      preHandler: [server.authenticate],
    },
    getUsersHandler
  );
}

export default doctorRoutes;