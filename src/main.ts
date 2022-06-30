import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { GlobalExceptionsFilter } from './common/exceptions/http-filter.exception';
import { AppLogger } from './common/logger/logger';
import {
  RABBITMQ_URL,
  RABBITMQ_QUEUE_NAME,
  PORT,
  NODE_ENV,
} from './config/env.config';
import { setupSwagger } from './config/swagger';
import * as compression from 'compression';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalFilters(new GlobalExceptionsFilter());
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [RABBITMQ_URL],
      queue: RABBITMQ_QUEUE_NAME,
      queueOptions: { durable: false },
      noAck: false,
    },
  });
  await app.startAllMicroservices();

  setupSwagger(app);
  app.use(compression());
  app.set('trust proxy', 1);
  app.disable('x-powered-by');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(PORT);
  AppLogger.verbose(
    `LazerPay started on ${NODE_ENV} environment with port ${PORT}`,
  );
}
bootstrap();
