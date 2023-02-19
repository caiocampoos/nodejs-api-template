import { FastifyReply, FastifyRequest } from "fastify";
import { CreateAppointmentInput, GetAppointmentbyDoctor } from "./appointment.schema.js";
import { createAppointment, getAppointmentbyDoctor } from "./appointment.service.js";

export async function creatAppointmentHandler(
  request: FastifyRequest<{
    Body: CreateAppointmentInput;
  }>
) {
  const appointment = await createAppointment({
    ...request.body,
    doctorId: request.body.doctorId,
    patientId: request.body.patientId
  });

  return appointment;
}

export async function getAppointmentByDoctorsHandler(
  request: FastifyRequest<{
    Body: GetAppointmentbyDoctor;
  }>
) {
  const appointment = await getAppointmentbyDoctor({
    ...request.body
  });

  return appointment;
}
