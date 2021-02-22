import { Module } from '@nestjs/common';
import {UsuarioController} from "./usuario.controller";

@Module({
    imports: [//Modulos
         ],
    controllers: [//AppController
        UsuarioController
    ],
    providers: [//AppService
    ],
    exports: [

    ],
})
export class UsuarioModule {}