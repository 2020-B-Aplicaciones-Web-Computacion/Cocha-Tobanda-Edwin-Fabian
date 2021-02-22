import {Controller, Get} from '@nestjs/common';


@Controller('usuario')
export class UsuarioController{
    @Get('hola')
    hola(){
        return 'Hola mundo http';
    }
}