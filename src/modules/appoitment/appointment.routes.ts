
import { FastifyInstance } from "fastify";
import { creatAppointmentHandler, deleteAppointmentHandler, getAppointmentByDoctorsHandler, updateAppointmentHandler } from "./appointment.controller.js";
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
  
  server.delete(
    "/",
    {
      schema: {
        response: {
          200: $ref("appointmentsResponseSchema"),
        },
      },
    },

    deleteAppointmentHandler
  );

  server.patch(
    "/",
    {
      schema: {
        response: {
          200: $ref("updateAppointmentSchema"),
        },
      },
    },

    updateAppointmentHandler
  );
}

export default appointmentRoutes;