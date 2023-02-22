import { FastifyReply, FastifyRequest } from "fastify";
import { CreatePatientInput, DeletePatientInput, UpdatePatientInput } from "./patient.schema.js";
import { createPatient, getPatient, deletePatient, updatePatient } from "./patient.service.js";

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

export async function updatePatientHandler(
  request: FastifyRequest<{
    Body: UpdatePatientInput;
  }>
) {
  const patient = await updatePatient({
    ...request.body
  });

  return patient;
}

export async function getPatientsHandler() {
  const patients = await getPatient();

  return patients;
}