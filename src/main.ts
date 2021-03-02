import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const ExpressFormidable = require('express-formidable');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(ExpressFormidable())
  await app.listen(3000);
}
bootstrap();
