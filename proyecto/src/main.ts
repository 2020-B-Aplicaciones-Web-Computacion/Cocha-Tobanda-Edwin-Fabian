import { NestFactory } from '@nestjs/core';
import {Module} from '@nestjs/common';
import { AppModule } from './app.module';
import * as cookieParser from "cookie-parser";

const helmet = require('helmet');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
var fileStoreOptions = {};
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(session({
    store: new FileStore(fileStoreOptions),
    secret: 'SUPER SECRETO',
    //resave: true,
    //saveUninitialized: true,
    cookie: {
      // expires: new Date(Date.now() + (10 * 1000))
    }
  }));
  app.use (cookieParser());
  app.use(helmet());
  await app.listen(3001);
}
bootstrap();
