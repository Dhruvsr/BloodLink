import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from 'src/constants';
import { PrismaService } from 'src/services/prisma/prisma.service';
import {
  PatientLoginDTO,
  PatientSignUpDTO,
} from 'src/validators/auth.validator';

@Controller('patient/auth')
export class AuthController {
  constructor(protected p: PrismaService) {}

  @Post('signup')
  async signup(@Body() body: PatientSignUpDTO) {
    const { address, email, name, password, phone } = body;
    const oldPatient = await this.p.user.findUnique({
      where: {
        email,
      },
      select: {
        role: true,
      },
    });
    if (oldPatient)
      throw new HttpException(
        `Email already taken by a ${oldPatient.role}`,
        400,
      );
    const patient = await this.p.user.create({
      data: {
        role: 'Patient',
        address,
        email,
        name,
        password: await hash(password, 10),
        phone,
        patient: {
          create: {},
        },
      },
      select: {
        avatarUrl: true,
        id: true,
        role: true,
      },
    });

    const token = sign({ id: patient.id, role: patient.role }, JWT_SECRET);
    return {
      user: patient,
      token,
    };
  }

  @Post('login')
  async login(@Body() body: PatientLoginDTO) {
    const { email, password } = body;
    const patient = await this.p.user.findUnique({
      where: {
        email,
      },
      select: {
        avatarUrl: true,
        id: true,
        role: true,
        password: true,
      },
    });
    if (!patient)
      throw new HttpException('No user found with provided email address', 404);
    if (patient.role !== 'Patient')
      throw new HttpException('User is not a patient', 400);
    const isPasswordCorrect = await compare(password, patient.password);
    if (!isPasswordCorrect) throw new HttpException('Incorrect password', 401);
    delete patient.password;
    const token = sign({ id: patient.id, role: patient.role }, JWT_SECRET);
    return {
      token,
      user: patient,
    };
  }
}
