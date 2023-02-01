import { Controller, Get } from '@nestjs/common';
import { User } from '@prisma/client';
import { User as U } from 'src/decorators/user/user.decorator';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Controller('hydrate')
export class HydrateController {
  constructor(protected p: PrismaService) {}

  @Get()
  async hydrate(@U({ serialize: true }) { user }: { user: User }) {
    return {
      id: user.id,
      avatarUrl: user.avatarUrl || '',
      role: user.role,
    };
  }
}
