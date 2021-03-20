import {Module} from '@nestjs/common';
import {UsuarioController} from './usuario.controller';
import {UsuarioService} from "./usuario.service";
import {UsuarioEntity} from "./usuario.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
// @Decorador()
@Module({
    imports: [ // Modulos
        TypeOrmModule.forFeature(
            [UsuarioEntity],
            'default' // nombre cadena de conexión
        )
    ],
    controllers: [ // Controladores
        UsuarioController
    ],
    providers: [ // Servicios DECLARADOS
        UsuarioService
    ],
    exports: [ // Servicios EXPORTADOS
        UsuarioService
    ],
})
export class UsuarioModule {

}