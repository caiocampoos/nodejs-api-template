import { FastifyReply, FastifyRequest } from "fastify";
import { CreateAppointmentInput, DeleteAppointmentInput, GetAppointmentbyPatientInput, UpdateAppointmentInput, } from "./appointment.schema.js";
import { createAppointment, getAppointmentbyPatient, deletePatient, UpdateAppointment } from "./appointment.service.js";

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
    Body: GetAppointmentbyPatientInput;
  }>
) {
  const appointment = await getAppointmentbyPatient({
    ...request.body
  });

  return appointment;
}

export async function deleteAppointmentHandler(
  request: FastifyRequest<{
    Body: DeleteAppointmentInput;
  }>
) {
  const appointment = await deletePatient({
    ...request.body
  });

  return appointment;
}

export async function updateAppointmentHandler(
  request: FastifyRequest<{
    Body: UpdateAppointmentInput;
  }>
) {
  const appointment = await UpdateAppointment({
    ...request.body
  });

  return appointment;
}