import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

export class DonorSignUpDTO extends createZodDto(
  z.object({
    name: z.string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    }),
    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
      })
      .email(),
    password: z.password({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    }),
    address: z.string({
      required_error: 'Address is required',
      invalid_type_error: 'Address must be a string',
    }),
    phone: z.string({
      required_error: 'Phone is required',
      invalid_type_error: 'Phone must be a string',
    }),
    dateOfBirth: z.string({
      required_error: 'Date of birth is required',
      invalid_type_error: 'Date of birth must be a string',
    }),
    currentHealthStatus: z.string({
      required_error: 'Current health status is required',
      invalid_type_error: 'Current health status must be a string',
    }),
    donatedBloodPreviously: z
      .boolean({
        required_error: 'Donated blood previously is required',
        invalid_type_error: 'Donated blood previously must be a boolean',
      })
      .optional()
      .default(false),
    previousBloodDonationDates: z.array(z.string()).optional().default([]),
    bloodGroup: z.enum(['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-']),
    avatarUrl: z
      .string({
        required_error: 'Avatar URL is required',
        invalid_type_error: 'Avatar URL must be a string',
      })
      .optional(),
    medicationsCurrentlyTaking: z.array(z.string()).optional().default([]),
    travelHistory: z.array(z.string()).optional().default([]),
    drugUseHistory: z
      .array(
        z.string({
          required_error: 'Drug use history is required',
          invalid_type_error: 'Drug use history must be a string',
        }),
      )
      .optional()
      .default([]),
    height: z.string({
      required_error: 'Height is required',
      invalid_type_error: 'Height must be a string',
    }),
    weight: z.string({
      required_error: 'Weight is required',
      invalid_type_error: 'Weight must be a string',
    }),
    aadharNumber: z.string({
      required_error: 'Aadhar number is required',
      invalid_type_error: 'Aadhar number must be a string',
    }),
    allergies: z.array(z.string()).optional().default([]),
    pregnant: z
      .boolean({
        required_error: 'Pregnant is required',
        invalid_type_error: 'Pregnant must be a boolean',
      })
      .optional()
      .default(false),
    gender: z.enum(['Male', 'Female', 'Other']),
  }),
) {}

export class DonorLoginDTO extends createZodDto(
  z.object({
    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
      })
      .email(),
    password: z.string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    }),
  }),
) {}
