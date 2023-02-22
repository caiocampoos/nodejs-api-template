

import prisma from "../../utils/prisma.js";
import { CreatePatientInput, DeletePatientInput, UpdatePatientInput  } from "./patient.schema.js";
import { random } from "../../utils/randomeamail.js"


export async function createPatient(
  data: CreatePatientInput ) {
  return prisma.patient.create({
    data,
  });
}

export async function deletePatient(
  data:DeletePatientInput) {
  const emailRand = random.email(1)[0]
  return prisma.patient.update({
    where: {
      id: data.id
    },
    data: {
      email : `${emailRand}-LGPD`,
      name: 'redactedOnDeletion-LGPD',
      phone: 'redactedOnDeletion-LGPD'
    }
  })
}

export async function updatePatient(
  data:UpdatePatientInput) {
  return prisma.patient.update({
    where: {
      id: data.id
    },
    data: { ...data }
  })
}

export async function getPatient() {
  return prisma.patient.findMany({
    select: {
      id: true,
      name: true,
      phone: true,
      email: true,
      birthDate: true,
      sex: true,
      height: true,
      weight: true,
      createdAt: true,
      updatedAt: true,
    },
  });

}