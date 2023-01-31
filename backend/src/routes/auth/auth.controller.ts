import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from 'src/constants';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { DonorLoginDTO, DonorSignUpDTO } from 'src/validators/auth.validator';

@Controller('auth')
export class AuthController {
  constructor(private p: PrismaService) {}

  @Post('donor/signup')
  async donorSignup(@Body() body: DonorSignUpDTO) {
    const {
      address,
      allergies,
      avatarUrl,
      bloodGroup,
      currentHealthStatus,
      dateOfBirth,
      donatedBloodPreviously,
      drugUseHistory,
      email,
      gender,
      height,
      medicationsCurrentlyTaking,
      name,
      password,
      phone,
      pregnant,
      previousBloodDonationDates,
      socialSecurityNumber,
      travelHistory,
      weight,
    } = body;

    const olderUser = await this.p.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: 'insensitive',
        },
      },
    });
    if (olderUser)
      throw new HttpException('User with this email already exists', 409);
    const hashedPassword = await hash(password, 10);
    const newUser = await this.p.user.create({
      data: {
        address,
        email,
        name,
        password: hashedPassword,
        phone,
        role: 'Donor',
        avatarUrl,
        donor: {
          create: {
            bloodGroup,
            currentHealthStatus,
            dateOfBirth,
            gender,
            allergies,
            donatedBloodPreviously,
            drugUseHistory,
            height,
            medicationsCurrentlyTaking,
            previousBloodDonationDates,
            pregnant,
            socialSecurityNumber,
            travelHistory,
            weight,
          },
        },
      },
      select: {
        id: true,
        role: true,
        avatarUrl: true,
      },
    });
    const token = sign(
      {
        id: newUser.id,
        role: newUser.role,
      },
      JWT_SECRET,
    );
    return {
      token,
      user: newUser,
    };
  }
  @Post('donor/login')
  async donorLogin(@Body() body: DonorLoginDTO) {
    const { email, password } = body;
    const user = await this.p.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: 'insensitive',
        },
      },
      select: {
        id: true,
        role: true,
        avatarUrl: true,
        password: true,
      },
    });
    if (!user) throw new HttpException('User not found', 404);
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) throw new HttpException('Incorrect password', 401);
    delete user.password;
    const token = sign(
      {
        id: user.id,
        role: user.role,
      },
      JWT_SECRET,
    );
    return {
      token,
      user,
    };
  }
}
