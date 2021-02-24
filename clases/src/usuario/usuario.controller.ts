import {Controller, Get, Header, HttpCode, Req, Res, Headers, Post, Param} from '@nestjs/common';

@Controller('usuario')
export class UsuarioController {
    @Get('hola')
    @HttpCode(200)
    @Header('Cache-Control', 'none')
    @Header('EPN', 'SISTEMAS')
    hola(
        @Req()
            request,
        @Headers()
            headers,
        // @Res()
        // response // Ustedes deben devolver la respuesta
    ) {
        // response.send('HOLA DESDE SEND')
        console.log(headers);
        // return 'Hola mundo http';
        // return {
        //     nombre:'Adrian'
        // }
        // return '<xml>Hola Mundo</xml>'
        return '<h1>HOLA MUNDO</h1> <img src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Escudo_de_la_Escuela_Polit%C3%A9cnica_Nacional.png" alt="">'
    }

    @Post('parametros-ruta/:numeroUno/:numeroDos')
    parametrosRuta(
        @Param()
            parametrosRuta,
        @Res({passthrough: true})
            response
    ) {
        console.log(parametrosRuta);
        response.header('nueva-header', 'otro valor')
        return 'ok';
    }
}