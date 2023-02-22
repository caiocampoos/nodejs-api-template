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

const updateAppointmentInput = {
  id: z.string().uuid(),
  ...appointmentInput
}
const appointmentGenerated = {
  createdAt: z.string(),
  updatedAt: z.string(),
};

const deleteAppointment = {
  id: z.string().uuid()
}

const getAppointmentbyPatient  = {
  patientId: z.string().uuid()
}

const updateAppointmentSchema = z.object({
  ...updateAppointmentInput
})
const getappointmentbyPatientSchema = z.object({
  ...getAppointmentbyPatient
})

const deleteAppointmentSchema = z.object({
  ...deleteAppointment
})
const createAppointmentSchema = z.object({
  ...appointmentInput,
});

const appointmentResponseSchema = z.object({
  ...appointmentInput,
  ...appointmentGenerated,
  ...getAppointmentbyPatient,
  ...deleteAppointment,
});

const appointmentsResponseSchema = z.array(appointmentResponseSchema);

export type CreateAppointmentInput = z.infer<typeof createAppointmentSchema>;
export type GetAppointmentbyPatientInput = z.infer<typeof getappointmentbyPatientSchema>;
export type DeleteAppointmentInput = z.infer<typeof deleteAppointmentSchema>;
export type UpdateAppointmentInput = z.infer<typeof updateAppointmentSchema>;

export const { schemas: appointmentSchemas, $ref } = buildJsonSchemas(
  {
  updateAppointmentSchema,
  createAppointmentSchema,
  appointmentResponseSchema,
  appointmentsResponseSchema,
});
