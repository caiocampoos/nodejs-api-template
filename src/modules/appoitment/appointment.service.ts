

import prisma from "../../utils/prisma.js";
import { CreateAppointmentInput, GetAppointmentbyPatientInput, UpdateAppointmentInput, DeleteAppointmentInput } from "./appointment.schema.js";

export async function createAppointment(
  data: CreateAppointmentInput & { doctorId: string } & { patientId: string }
) {
  return prisma.appointment.create({
    data,
  });
}

export async function deletePatient(
  data:DeleteAppointmentInput) {
  
  prisma.appointment.delete({
    where: {
      id: data.id
    }
  })
  return `Appointment ${data.id} Deleted`
}

export async function UpdateAppointment(
  data:UpdateAppointmentInput) {
  return prisma.appointment.update({
    where: {
      id: data.id
    },
    data: { ...data }
  })
}

export async function getAppointmentbyPatient(
  data: GetAppointmentbyPatientInput
) {
  return prisma.appointment.findMany({
    where: {
      patientId: data.patientId
    }
  });
}