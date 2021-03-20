import {Controller, Get, Header, HttpCode, Req, Res, Headers, Post, Param, Body, Query} from '@nestjs/common';
import {UsuarioService} from "./usuario.service";
import {FindConditions, FindManyOptions, Like} from "typeorm";
import {UsuarioEntity} from "./usuario.entity";

@Controller('usuario')
export class UsuarioController {
    constructor(
        private _usuarioService: UsuarioService
    ) {

    }

    @Get('crear-usuario')
    crearUsuarioVista(
        @Res()
            response,
    ){
        response.render('usuarios/crear')
    }

    @Post('crear-usuario')
    async crearUsuario(
        @Body() parametrosCuerpo,
        @Res() response
    ){
        const respuesta = await this._usuarioService.usuarioEntity.save({
            nombre:parametrosCuerpo.nombre,
            apellido: parametrosCuerpo.apellido
        });
        response.redirect('/usuario/usuarios?mensaje=Se creo el usuario '+
            parametrosCuerpo.nombre)
    }


    @Post('')
    creaUsuario(
        @Body()
            parametrosCuerpo
    ) {
        return this._usuarioService.usuarioEntity.save({
            nombre: parametrosCuerpo.nombre,
            apellido: parametrosCuerpo.apellido
        })
    }

    @Get('usuarios')
    async obtenerUsuarios(
        @Query()
            parametrosConsulta,
        @Res()
            response
    ) {
        let take = 10;
        let skip = 0;
        let order = 'ASC';

        if (parametrosConsulta.skip) {
            skip = parametrosConsulta.skip;
        }

        if (parametrosConsulta.take) {
            take = parametrosConsulta.take;
        }

        if (parametrosConsulta.order) {
            order = parametrosConsulta.order;
        }

        let consultaWhereOR: FindConditions<UsuarioEntity>[] = [
            {
                nombre: Like(
                    parametrosConsulta.busqueda ? parametrosConsulta.busqueda : '%%'
                ),
            },
            {
                apellido: Like(
                    parametrosConsulta.busqueda ? parametrosConsulta.busqueda: '%%'
                )
            }
        ]

        let consulta: FindManyOptions<UsuarioEntity> = {
            where: consultaWhereOR,
            take: take,
            skip: skip,
            order: {
                id: order === 'ASC' ? 'ASC' : 'DESC'
            }
        };
        //return this._usuarioService.usuarioEntity.findAndCount(consulta);
        let datos = await this._usuarioService.usuarioEntity.findAndCount(consulta);
        response.render('inicio', {
            datos: datos,
            parametrosConsulta: parametrosConsulta
        })
    }

    /*
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