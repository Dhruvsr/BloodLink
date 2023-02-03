import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { User } from 'src/decorators/user/user.decorator';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { Patient, User as UserEntity } from '@prisma/client';
import { RequirementValidator } from 'src/validators/requirement.validator';

@Controller('requirement')
export class RequirementController {
  constructor(protected p: PrismaService) {}

  @Post('create')
  async createBloodDonationRequirement(
    @User({ serialize: true })
    { user }: { user: UserEntity & { patient: Patient } },
    @Body() body: RequirementValidator,
  ) {
    if (!user.patient)
      throw new HttpException("You're not logged in as patient", 400);
    const {
      bloodComponent,
      bloodGroup,
      currentHealthStatus,
      dateOfBirth,
      letterFromDoctor,
      requiredOn,
    } = body;
    const requirement = await this.p.bloodDonationNeed.create({
      data: {
        bloodGroup,
        component: bloodComponent,
        currentHealthStatus,
        dateOfBirth,
        requiredOn,
        letterFromDoctor,
        patient: {
          connect: {
            id: user.patient.id,
          },
        },
      },
      select: {
        id: true,
      },
    });
    return requirement;
  }
}
