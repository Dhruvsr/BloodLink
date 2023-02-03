import { Controller, Get, Query } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Controller('dashboard')
export class DashboardController {
  constructor(protected p: PrismaService) {}

  @Get('')
  async getNeedyPatients(@Query('take') take: string) {
    const toTake = Number.isNaN(Number(take)) ? 10 : Number(take);
    const needyPatients = await this.p.bloodDonationNeed.findMany({
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
      where: {
        requiredOn: {
          lte: new Date(),
        },
      },
      take: toTake,
      skip: toTake > 10 ? toTake - 10 : 0,
    });
    return needyPatients;
  }
}
