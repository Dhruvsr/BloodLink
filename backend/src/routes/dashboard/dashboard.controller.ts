import { Controller, Get, Query } from '@nestjs/common';
import { BloodComponent } from '@prisma/client';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Controller('dashboard')
export class DashboardController {
  constructor(protected p: PrismaService) {}

  @Get('')
  async getNeedyPatients(@Query('take') take: string): Promise<{
    patients: {
      id: string;
      bloodGroup: string;
      component: BloodComponent;
      currentHealthStatus: string;
      requiredOn: Date;
      patient: {
        user: {
          phone: string;
          email: string;
        };
      };
    }[];
    next?: number;
  }> {
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
    if (needyPatients.length === 10) {
      return {
        patients: needyPatients,
        next: toTake + 10,
      };
    }
    return { patients: needyPatients };
  }
}
