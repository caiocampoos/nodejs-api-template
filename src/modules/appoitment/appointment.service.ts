

import prisma from "../../utils/prisma.js";
import { CreateAppointmentInput, GetAppointmentbyPatient } from "./appointment.schema.js";

export async function createAppointment(
  data: CreateAppointmentInput & { doctorId: string } & { patientId: string }
) {
  return prisma.appointment.create({
    data,
  });
}



export async function getAppointmentbyPatient(
  data: GetAppointmentbyPatient
) {
  return prisma.appointment.findMany({
    where: {
      patientId: data.patientId
    }
  });
}