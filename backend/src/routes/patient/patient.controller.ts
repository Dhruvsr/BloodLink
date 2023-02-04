import { Controller, Get, HttpException, Param } from '@nestjs/common';
import { User } from 'src/decorators/user/user.decorator';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Controller('patient')
export class PatientController {
  constructor(protected p: PrismaService) {}

  @Get(':id')
  async getPatientRequirement(
    @Param('id') id: string,
    @User({ serialize: true }) { user: { donor } },
  ) {
    if (!donor)
      throw new HttpException(`You are not logged in as a donor`, 403);
    const requirement = await this.p.bloodDonationNeed.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        bloodGroup: true,
        component: true,
        currentHealthStatus: true,
        requiredOn: true,
        patient: {
          select: {
            user: {
              select: {
                phone: true,
                email: true,
              },
            },
          },
        },
      },
    });
    if (!requirement) throw new HttpException(`No requirement found`, 404);
    return requirement;
  }
}
