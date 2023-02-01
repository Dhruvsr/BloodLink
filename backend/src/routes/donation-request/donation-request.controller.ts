import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { User } from 'src/decorators/user/user.decorator';
import { User as UserEntity, Donor, Patient } from '@prisma/client';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreateBloodDonationRequest } from 'src/validators/donation-request.validator';

@Controller('donation-request')
export class DonationRequestController {
  constructor(protected prisma: PrismaService) {}

  @Post('create')
  async createBloodDonationRequest(
    @User({ serialize: true })
    { user }: { user: UserEntity & { donor: Donor } },
    @Body() body: CreateBloodDonationRequest,
  ) {
    const { donor } = user;
    if (!donor) throw new HttpException("You're not logged in as a donor", 400);
    const { id } = donor;
    const { alternateDay, availableOn, onAlternateDay } = body;
    const donationRequest = await this.prisma.bloodDonationRequest.create({
      data: {
        donor: {
          connect: {
            id,
          },
        },
        availableOn,
        alternateDay,
        onAlternateDay,
      },
      select: {
        id: true,
      },
    });
    return donationRequest;
  }

  @Get(':id')
  async getBloodDonationRequest(
    @User({ serialize: true })
    { user }: { user: UserEntity & { donor: Donor; patient: Patient } },
    @Param('id') id: string,
  ) {
    if (!user.patient && !user.donor)
      throw new HttpException(
        "You're not logged in as a donor or patient",
        400,
      );
    const donationRequest = await this.prisma.bloodDonationRequest.findUnique({
      where: {
        id,
      },
      select: {
        availableOn: true,
        alternateDay: true,
        onAlternateDay: true,
        donor: {
          select: {
            bloodGroup: true,
            allergies: true,
            currentHealthStatus: true,
            drugUseHistory: true,
            gender: true,
            height: true,
            donatedBloodPreviously: true,
            medicationsCurrentlyTaking: true,
            weight: true,
            pregnant: true,
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    return donationRequest;
  }
}
