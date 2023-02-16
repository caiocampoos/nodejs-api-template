import { hashPassword } from "../../utils/hash.js";
import prisma from "../../utils/prisma.js";
import { CreateDoctorInput } from "../doctor/doctor.schema.js"

export async function createDoctor(input: CreateDoctorInput) {
  const { password, ...rest } = input;

  const { hash, salt } = hashPassword(password);

  const user = await prisma.doctor.create({
    data: { ...rest, salt, password: hash },
  });

  return user;
}

export async function findUserByEmail(email: string) {
  return prisma.doctor.findUnique({
    where: {
      email,
    },
  });
}

export async function findUsers() {
  return prisma.doctor.findMany({
    select: {
      email: true,
      name: true,
      id: true,
    },
  });
}