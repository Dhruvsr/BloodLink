import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export class CreateBloodDonationRequest extends createZodDto(
  z.object({
    availableOn: z.string({
      required_error: 'Available on is required',
      invalid_type_error: 'Available on should be a string',
    }),
    onAlternateDay: z.boolean({
      required_error: 'Alternate days is required',
      invalid_type_error: 'Alternate days should be a boolean',
    }),
    alternateDay: z.string({
      required_error: 'Alternate day is required',
      invalid_type_error: 'Alternate day should be a string',
    }),
  }),
) {}
