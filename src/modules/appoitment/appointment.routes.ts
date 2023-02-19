
import { FastifyInstance } from "fastify";
import { creatAppointmentHandler, getAppointmentByDoctorsHandler } from "./appointment.controller.js";
import { $ref } from "./appointment.schema.js";


async function appointmentRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("createAppointmentSchema"),
        response: {
          201: $ref("appointmentResponseSchema"),
        },
      },
    },
    creatAppointmentHandler
  );

  server.get(
    "/",
    {
      schema: {
        response: {
          200: $ref("appointmentsResponseSchema"),
        },
      },
    },

    getAppointmentByDoctorsHandler
  );
}

export default appointmentRoutes;