
import { FastifyInstance } from "fastify";
import { creatPatientHandler, deletetientHandler, getPatientsHandler } from "./patient.controller.js";
import { $ref } from "./patient.schema.js";


async function patientRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("createPatientSchema"),
        response: {
          201: $ref("patientResponseSchema"),
        },
      },
    },
    creatPatientHandler
  );

  server.get(
    "/",
    {
      schema: {
        response: {
          200: $ref("patientsResponseSchema"),
        },
      },
    },
    getPatientsHandler
  );

  server.delete(
    "/",
    {
      schema: {
        response: {
          200: $ref("patientsResponseSchema"),
        },
      },
    },
    deletetientHandler
  );
}

export default patientRoutes;