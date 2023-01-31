import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Roles, User as U } from '@prisma/client';
import { Request } from 'express';
import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from 'src/constants';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { DecodedJWT } from 'types/jwt';

type Data = {
  tokenOnly?: boolean;
  serialize?: boolean;
  optional?: boolean;
} & (
  | {
      tokenOnly: boolean;
      serialize: boolean;
    }
  | {
      tokenOnly?: boolean;
      serialize?: boolean;
    }
);

export const User = createParamDecorator(
  async (
    data: Data,
    ctx: ExecutionContext,
  ): Promise<string | DecodedJWT | { user: U; role: Roles }> => {
    const p = new PrismaService();
    const request = ctx.switchToHttp().getRequest<Request>();
    const token = request.headers['authorization']?.replace('Bearer ', '');
    if (!token && !data?.optional)
      throw new HttpException(
        'Authentication Token is required to access this resource.',
        HttpStatus.UNAUTHORIZED,
      );
    let jwt: DecodedJWT = undefined;
    if (data?.serialize) {
      try {
        jwt = verify(token, JWT_SECRET) as unknown as DecodedJWT;
      } catch (err) {
        throw new HttpException(
          'Invalid or Expired Authentication Token',
          HttpStatus.FORBIDDEN,
        );
      }
    }
    if (data.serialize) return jwt;
    if (data.tokenOnly) return token;
    if (data.serialize) {
      const { id, role } = jwt;
      const user = await p.user.findFirst({
        where: { id, role },
        include: {
          donor: true,
        },
      });
      if (!user)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      return { user, role };
    }
  },
);
