

import prisma from "../../utils/prisma.js";
import { CreateAppointmentInput, GetAppointmentbyDoctor } from "./appointment.schema.js";

export async function createAppointment(
  data: CreateAppointmentInput & { doctorId: string } & { patientId: string }
) {
  return prisma.appointment.create({
    data,
  });
}

export async function getAppointmentbyDoctor(
  data: GetAppointmentbyDoctor
) {
  return prisma.appointment.findMany({
    where: {
      doctorId: data.doctorId
    }
  });
}