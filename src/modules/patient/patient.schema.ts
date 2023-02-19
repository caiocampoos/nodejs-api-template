import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const patientInput = {
  email: z.string().email(),
  name: z.string(),
  phone: z.string(),
  birthDate: z.string(),
  sex: z.enum(["M", "F", "Others"]),
  height: z.number().positive().default(1.5),
  weight: z.number().positive().default(10.5)
};

const patientGenerated = {
  id: z.string().uuid(),
  createdAt: z.string(),
  updatedAt: z.string(),
};

const deletePatientInput = {
  id: z.string().uuid()
}
const deletePatientSchema = z.object({
  ...deletePatientInput
});

const createPatientSchema = z.object({
  ...patientInput,
});

const patientResponseSchema = z.object({
  ...patientInput,
  ...patientGenerated,
});

const patientsResponseSchema = z.array(patientResponseSchema);

export type CreatePatientInput = z.infer<typeof createPatientSchema>;
export type DeletePatientInput = z.infer<typeof deletePatientSchema>;

export const { schemas: patientSchemas, $ref } = buildJsonSchemas({
  createPatientSchema,
  deletePatientSchema,
  patientResponseSchema,
  patientsResponseSchema,
});
