import { FastifyReply, FastifyRequest } from "fastify";
import { CreateAppointmentInput, GetAppointmentbyPatient } from "./appointment.schema.js";
import { createAppointment, getAppointmentbyPatient } from "./appointment.service.js";

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
    Body: GetAppointmentbyPatient;
  }>
) {
  const appointment = await getAppointmentbyPatient({
    ...request.body
  });

  return appointment;
}
