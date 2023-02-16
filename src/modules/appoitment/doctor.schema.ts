import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const doctorCore = {
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email(),
  name: z.string(),
};

const createDoctorSchema = z.object({
  ...doctorCore,
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  }),
});

const createDoctorResponseSchema = z.object({
  id: z.string(),
  ...doctorCore,
});

const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email(),
  password: z.string(),
});

const loginResponseSchema = z.object({
  accessToken: z.string(),
});

export type CreateDoctorInput = z.infer<typeof createDoctorSchema>;

export type LoginInput = z.infer<typeof loginSchema>;

export const { schemas: doctorSchemas, $ref } = buildJsonSchemas({
  createDoctorSchema,
  createDoctorResponseSchema,
  loginSchema,
  loginResponseSchema,
});