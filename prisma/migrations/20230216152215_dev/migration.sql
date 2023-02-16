/*
  Warnings:

  - You are about to drop the `Consulta` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Paciente` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Consulta" DROP CONSTRAINT "Consulta_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "Paciente" DROP CONSTRAINT "Paciente_consultaId_fkey";

-- DropTable
DROP TABLE "Consulta";

-- DropTable
DROP TABLE "Paciente";

-- CreateTable
CREATE TABLE "Appointment" (
    "id" UUID NOT NULL,
    "doctorId" UUID NOT NULL,
    "apointmentDate" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" UUID NOT NULL,
    "appointmentId" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "birthDate" TIMESTAMP NOT NULL,
    "sex" TEXT NOT NULL,
    "height" DOUBLE PRECISION NOT NULL DEFAULT 1.1,
    "weight" DOUBLE PRECISION NOT NULL DEFAULT 10.5,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Appointment_apointmentDate_key" ON "Appointment"("apointmentDate");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_appointmentId_key" ON "Patient"("appointmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_email_key" ON "Patient"("email");

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
