import { FastifyReply, FastifyRequest } from "fastify";
import { CreatePatientInput, DeletePatientInput } from "./patient.schema.js";
import { createPatient, getPatient, deletePatient } from "./patient.service.js";

export async function creatPatientHandler(
  request: FastifyRequest<{
    Body: CreatePatientInput;
  }>
) {
  const patient = await createPatient({
    ...request.body
  });

  return patient;
}

export async function deletetientHandler(
  request: FastifyRequest<{
    Body: DeletePatientInput;
  }>
) {
  const patient = await deletePatient({
    ...request.body
  });

  return patient;
}

export async function getPatientsHandler() {
  const patients = await getPatient();

  return patients;
}