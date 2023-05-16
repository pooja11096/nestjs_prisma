require('dotenv').config({ path: `../${process.env.NODE_ENV}.env` })
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

// import cookieParser from 'cookie-parser';

import * as cookieParser from 'cookie-parser'
import { AuthGuard } from '@nestjs/passport';

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // const app = await NestFactory.create(AppModule);
  // app.useStaticAssets(join(__dirname, '..', 'public'));
  // app.setBaseViewsDir(join(__dirname,'views'));
  app.setViewEngine('ejs');
  // app.useGlobalGuards(new AuthGuard())
  app.useGlobalPipes(new ValidationPipe())
  app.use(cookieParser());
  await app.listen(5000);
}
bootstrap();
