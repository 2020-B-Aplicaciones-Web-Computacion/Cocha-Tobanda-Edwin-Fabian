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
        //     nombre:'Edwin'
        // }
        // return '<xml>Hola Mundo</xml>'
        return '<h1>HOLA MUNDO</h1> <img src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Escudo_de_la_Escuela_Polit%C3%A9cnica_Nacional.png" alt="">'
    }

    @Post('parametros-ruta/:numero_Uno/:numero_Dos')
    parametrosRuta(
        @Param()
            parametrosRuta,
        @Res({passthrough: true})
            response
    ) {
        console.log(parametrosRuta);
        let resp=parseInt(parametrosRuta.numero_Uno) + parseInt(parametrosRuta.numero_Dos);
        response.header('nueva-header', resp);
        return "Ok";
    }
/*
    @Get('setear-nombre/:nombre')
    setearNombre(
        @Param()
            parametrosRuta,
        @Req()
            request,
        @Res({passthrough: true})
            response,
    ) {
        console.log(request.cookies);
        response.cookie('nombreUsuario', parametrosRuta.nombre)
        return 'Cookie con nombre' + parametrosRuta.nombre + 'seteada';
    }*/
}