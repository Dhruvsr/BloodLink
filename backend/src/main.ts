import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as morgan from 'morgan';
import { PrismaService } from './services/prisma/prisma.service';
import './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });
  await app.get(PrismaService).enableShutdownHooks(app);
  app.use(helmet());
  app.enableCors();
  app.use(morgan('dev'));
  console.log('Listening on port 5000');
  await app.listen(5000);
}
bootstrap();
