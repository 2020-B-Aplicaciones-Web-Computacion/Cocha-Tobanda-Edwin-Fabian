import {Body, Controller, Get, Post, Query, Res} from "@nestjs/common";
import {FindConditions, FindManyOptions, Like} from "typeorm";
import {LibroService} from "./libro.service";
import {LibroEntity} from "./libro.entity";


@Controller('libro')
export class LibroController {

    private fkAutor;
    private pag = 1;

    constructor(
        private _libroService: LibroService
    ) {
    }

    @Get('nuevo-libro')
    nuevoLibroVista(
        @Res()
            response,
    ) {
        response.render('libros/nuevo')
    }

    @Post('nuevo-libro')
    async nuevoLibro(
        @Body() parametrosCuerpo,
        @Res() response
    ) {
        const respuesta = await this._libroService.libroEntity.save({
            ISBN: parametrosCuerpo.isbn,
            titulo: parametrosCuerpo.titulo,
            anio_lanzamiento: parametrosCuerpo.anio,
            idioma: parametrosCuerpo.idioma,
            pais_publicacion: parametrosCuerpo.pais,
            fkAutor: this.fkAutor
        });
        response.redirect('/libro/libros?autor='+this.fkAutor+'&&mensaje=Se creó el libro ' +
            parametrosCuerpo.nombre + ' correctamente')
    }

    @Get('actualizar')
    async bus_act_Libro(
        @Query()
            params,
        @Res()
            response,
    ) {
        let consultaWhereOR: FindConditions<LibroEntity>[] = [
            {
                id: Like(
                    params.id ? params.id : '%'
                ),
            }
        ]

        let consulta: FindManyOptions<LibroEntity> = {
            where: consultaWhereOR,
            take: 1
        }

        let datos = await this._libroService.libroEntity.findAndCount(consulta);
        response.render('libros/actualizar', {
            datos: datos[0][0],
            params: params
        })
    }

    @Post('actualizar')
    async actualizarLibro(
        @Body()
            bodyParams,
        @Query()
            queryParams,
        @Res()
            response
    ) {

        let entity = {}
        if (bodyParams.isbn) {
            entity['ISBN'] = bodyParams.isbn
        }
        if (bodyParams.titulo) {
            entity['titulo'] = bodyParams.litulo
        }
        if (bodyParams.anio) {
            entity['anio_lanzamiento'] = bodyParams.anio
        }
        if (bodyParams.idioma) {
            entity['idioma'] = bodyParams.idioma
        }
        if (bodyParams.pais) {
            entity['pais_publicacion'] = bodyParams.pais
        }

        try {
            const respuesta = await this._libroService.libroEntity.update({
                id: queryParams.id
            }, entity);
            response.redirect('/libro/libros?autor='+this.fkAutor+'&&mensaje=Se modificó el libro exitosamente')
        } catch {
            response.redirect('/libro/libros?autor='+this.fkAutor+'&&mensaje=No se modificaron los datos')
        }
    }

    @Get('eliminar')
    async eliminarLibro(
        @Query()
            queryParams,
        @Res()
            response
    ) {
        try {
            await this._libroService.libroEntity.delete({
                    id: queryParams.id
                }
            )
            response.redirect('/libro/libros?autor='+this.fkAutor+'&&mensaje=Eliminado correctamente')
        } catch {
            response.redirect('/libro/libros?autor='+this.fkAutor+'&&mensaje=No se pudo eliminar')
        }
    }

    @Get('libros')
    async consultarLibros(
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

        if (parametrosConsulta.pag) {
            this.pag = parseInt(parametrosConsulta.pag);
            skip = 3 * (this.pag - 1);
        }


        if (parametrosConsulta.fabricante) {
            this.fkAutor = parametrosConsulta.autor;
        } else {
            this.fkAutor = "1"
        }

        let consultaWhereAND: FindConditions<LibroEntity>[] = [
            {
                titulo: Like(
                    parametrosConsulta.busqueda ? '%'+parametrosConsulta.busqueda+'%' : '%%'
                ),
                fkAutor: Like(
                    this.fkAutor ? this.fkAutor : '%%'
                ),
            }
        ]

        let consulta: FindManyOptions<LibroEntity> = {
            where: consultaWhereAND,
            take: take,
            skip: skip,
            order: {
                id: order === 'ASC' ? 'ASC' : 'DESC'
            }
        }

        let datos = await this._libroService.libroEntity.findAndCount(consulta);
        response.render('libros/inicio', {
            datos: datos,
            parametrosConsulta: parametrosConsulta,
            pag: this.pag
        })
    }

}