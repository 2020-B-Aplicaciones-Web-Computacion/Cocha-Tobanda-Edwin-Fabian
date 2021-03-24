import {Controller, Get, Header, HttpCode, Req, Res, Headers, Post, Param, Body, Query} from '@nestjs/common';
import {FindConditions, FindManyOptions, Like} from "typeorm";
import {AutorService} from "./autor.service";
import {AutorEntity} from "./autor.entity";
import {isEmpty} from "@nestjs/common/utils/shared.utils";

@Controller('autor')
export class AutorController {
    constructor(
        private _autorService: AutorService
    ) {

    }

    public page = 1

    @Get('crear-autor')
    crearAutorVista(
        @Res()
            response,
    ) {
        response.render('autores/nuevo')
    }

    @Post('crear-autor')
    async crearAutor(
        @Body() parametrosCuerpo,
        @Res() response
    ) {
        const respuesta = await this._autorService.autorEntity.save({
            nombre_autor: parametrosCuerpo.nombre,
            apellido_autor: parametrosCuerpo.apellido,
            pais_autor: parametrosCuerpo.pais,
            genero_autor: parametrosCuerpo.genero,
            edad_autor: parametrosCuerpo.edad,
        });
        response.redirect('/autor/autores?mensaje=Se creo el autores ' + parametrosCuerpo.nombre)
    }

    @Get('actualizar')
    async bus_act_Autor(
        @Query()
            params,
        @Res()
            response,
    ) {
        let consultaWhereOR: FindConditions<AutorEntity>[] = [
            {
                id: Like(
                    params.id ? params.id : '%'
                ),
            }
        ]

        let consulta: FindManyOptions<AutorEntity> = {
            where: consultaWhereOR,
            take: 1
        }

        let datos = await this._autorService.autorEntity.findAndCount(consulta);
        response.render('autores/actualizar', {
            datos: datos[0][0],
            params: params
        })
    }

    @Post('actualizar')
    async actualizarAutor(
        @Body()
            parametrosCuerpo,
        @Query()
            queryParams,
        @Res()
            response
    ) {
        let entity = {}
        if (parametrosCuerpo.nombre) {
            entity['nombre_autor'] = parametrosCuerpo.nombre
        }
        if (parametrosCuerpo.apellido) {
            entity['apellido_autor'] = parametrosCuerpo.apellido
        }
        if (parametrosCuerpo.pais) {
            entity['pais_autor'] = parametrosCuerpo.pais
        }
        if (parametrosCuerpo.genero) {
            entity['genero_autor'] = parametrosCuerpo.genero
        }
        if (parametrosCuerpo.edad) {
            entity['edad_autor'] = parametrosCuerpo.edad
        }

        try{
            const respuesta = await this._autorService.autorEntity.update({
                id: queryParams.id
            }, entity);
            response.redirect('/autor/autores?mensaje=Se modificó el autores ' +parametrosCuerpo.nombre + ' exitosamente')
        } catch {
            response.redirect('/autor/autores?mensaje=No se modificaron los datos')
        }
    }

    @Get('eliminar')
    async eliminarAutor(
        @Query()
            queryParams,
        @Res()
            response
    ) {
        try {
            await this._autorService.autorEntity.delete({
                    id: queryParams.id
                }
            )
            response.redirect('/autor/autores?mensaje=Autor eliminado correctamente')
        } catch {
            response.redirect('/autor/autores?mensaje=No se pudo eliminar al autores')
        }
    }

    @Get('autores')
    async consultarAutor(
        @Query()
            parametrosConsulta,
        @Res()
            response
    ) {
        let take = 3;
        let skip = 0;
        let order = 'ASC';

        if (parametrosConsulta.order) {
            order = parametrosConsulta.order;
        }

        if (parametrosConsulta.page) {
            this.page = parseInt(parametrosConsulta.page);
            skip = 3 * (this.page - 1);
        }

        let consultaWhereOR: FindConditions<AutorEntity>[] = [
            {
                nombre_autor: Like(
                    parametrosConsulta.busqueda ? '%'+parametrosConsulta.busqueda+'%' : '%%'
                ),
                apellido_autor: Like(
                    parametrosConsulta.busqueda ? '%'+parametrosConsulta.busqueda+'%' : '%%'
                ),
            }
        ]

        let consulta: FindManyOptions<AutorEntity> = {
            where: consultaWhereOR,
            take: take,
            skip: skip,
            order: {
                id: order === 'ASC' ? 'ASC' : 'DESC'
            }
        }

        let datos = await this._autorService.autorEntity.findAndCount(consulta);
        response.render('autores/inicio', {
            datos: datos,
            parametrosConsulta: parametrosConsulta,
            page: this.page
        })
    }
}