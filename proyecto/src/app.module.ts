import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "../../clases/dist/usuario/usuario.entity";
import {AutorEntity} from "./autor/autor.entity";
import {AutorModule} from "./autor/autor.module";
import {LibroEntity} from "./libro/libro.entity";
import {LibroModule} from "./libro/libro.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name:'default',
      type:'mysql',
      port:3010,
      username:'epn',
      password:'epn12345678',
      database: 'web',
      dropSchema:false,
      synchronize: true, entities: [
        AutorEntity,
        LibroEntity,
      ]
    }),
    AutorModule,
    LibroModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}