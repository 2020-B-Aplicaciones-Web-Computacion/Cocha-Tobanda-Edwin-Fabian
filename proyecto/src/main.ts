import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import cookieParser from "cookie-parser";

const helmet = require("helmet");
async function bootstrap() {
  const app:any = await NestFactory.create(AppModule);
  app.use(helmet());
  app.set('views engine','ejs')
  //app.use (cookieParser());
  await app.listen(3000);
}

bootstrap();
