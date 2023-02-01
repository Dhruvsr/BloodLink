import { Controller, Get } from '@nestjs/common';
import { Donor, User as UserEntity } from '@prisma/client';
import { User } from 'src/decorators/user/user.decorator';

@Controller('me')
export class MeController {
  @Get('donor')
  async getDonorInfo(
    @User({ serialize: true }) user: { user: UserEntity & { donor: Donor } },
  ) {
    const { address, donor, phone, email, name } = user.user;

    const {
      aadharNumber,
      allergies,
      bloodGroup,
      currentHealthStatus,
      dateOfBirth,
      donatedBloodPreviously,
      drugUseHistory,
      gender,
      height,
      medicationsCurrentlyTaking,
      pregnant,
      weight,
      previousBloodDonationDates,
      travelHistory,
    } = donor;
    return {
      address,
      phone,
      email,
      name,
      aadharNumber,
      allergies,
      bloodGroup,
      currentHealthStatus,
      dateOfBirth,
      donatedBloodPreviously,
      drugUseHistory,
      gender,
      height,
      medicationsCurrentlyTaking,
      pregnant,
      weight,
      previousBloodDonationDates,
      travelHistory,
    };
  }
}
