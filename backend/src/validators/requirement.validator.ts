import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export class RequirementValidator extends createZodDto(
  z.object({
    bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
    bloodComponent: z.enum([
      'RedBloodCells',
      'Platelets',
      'Plasma',
      'Cryoprecipitate',
      'WholeBlood',
    ]),
    requiredOn: z.string(),
    dateOfBirth: z.string(),
    currentHealthStatus: z.string(),
    letterFromDoctor: z.string().optional(),
  }),
) {}
