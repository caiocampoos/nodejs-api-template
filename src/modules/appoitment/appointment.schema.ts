import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";



const reGex = /^\d{1,2}\/\d{1,2}\/\d{4} \d{1,2}:\d{1,2}$/g;

const appointmentInput = {
  doctorId: z.string().uuid(),
  appointmentDate: z.string({
    required_error: "Date is required",
    invalid_type_error: "Date must be dd/mm/yyyy",
  }).regex(new RegExp(reGex)),
  patientId: z.string().uuid(),
  notes: z.string()
};

const appointmentGenerated = {
  createdAt: z.string(),
  updatedAt: z.string(),
};

const getAppointmentbyDoctor  = {
  doctorId: z.string().uuid()
}

const getappointmentbyDoctorSchema = z.object({
  ...getAppointmentbyDoctor
})

const createAppointmentSchema = z.object({
  ...appointmentInput,
});


const appointmentResponseSchema = z.object({
  ...appointmentInput,
  ...appointmentGenerated,
  ...getAppointmentbyDoctor,
});

const appointmentsResponseSchema = z.array(appointmentResponseSchema);

export type CreateAppointmentInput = z.infer<typeof createAppointmentSchema>;
export type GetAppointmentbyDoctor = z.infer<typeof getappointmentbyDoctorSchema>;

export const { schemas: appointmentSchemas, $ref } = buildJsonSchemas({
  createAppointmentSchema,
  appointmentResponseSchema,
  appointmentsResponseSchema,
});
