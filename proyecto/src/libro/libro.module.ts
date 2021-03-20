import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {LibroEntity} from "./libro.entity";
import {LibroService} from "./libro.service";


@Module({
    imports: [
        TypeOrmModule.forFeature(
            [LibroEntity],
            'default'
        )
    ],
    controllers: [
        //LibroController
    ],
    providers: [
        LibroService
    ],
    exports: [
        LibroService
    ]
})

export class LibroModule {

}