import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AutorEntity} from "./autor.entity";
import {AutorService} from "./autor.service";
import {AutorController} from "./autor.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [AutorEntity],
            'default'
        )
    ],
    controllers: [ // Controladores
        AutorController
    ],
    providers: [ // Servicios DECLARADOS
        AutorService
    ],
    exports: [ // Servicios EXPORTADOS
        AutorService
    ],
})
export class AutorModule {

}