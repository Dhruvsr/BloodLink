import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as morgan from 'morgan';
import { PrismaService } from './services/prisma/prisma.service';
import './constants';
import * as chalk from 'chalk';


const port = process.env.PORT || 5000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });
  await app.get(PrismaService).enableShutdownHooks(app);
  app.use(helmet());
  app.enableCors();
  app.use(morgan('dev'));
  console.log('Listening on port 5000');
  await app.listen(port);
  const server = app.getHttpServer();
  const router = server._events.request._router;

  const availableRoutes: [] = router.stack
    .map((layer) => {
      if (layer.route) {
        return {
          route: {
            path: layer.route?.path,
            method: layer.route?.stack[0].method,
          },
        };
      }
    })
    .filter((item) => item !== undefined);

  availableRoutes.forEach((r: { route: { path: string; method: string } }) => {
    console.log(
      `${chalk.green(r.route.method.toUpperCase())} ${chalk.blue(
        r.route.path,
      )}`,
    );
  });
}
bootstrap();
