import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './services/prisma/prisma.service';
import { AuthController } from './routes/auth/auth.controller';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { UploadController } from './routes/upload/upload.controller';
import { HydrateController } from './routes/hydrate/hydrate.controller';
import { MeController } from './routes/me/me.controller';
import { DonationRequestController } from './routes/donation-request/donation-request.controller';

@Module({
  imports: [],
  controllers: [AppController, AuthController, UploadController, HydrateController, MeController, DonationRequestController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
