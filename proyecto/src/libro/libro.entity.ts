import {Column,ManyToOne, Entity, PrimaryGeneratedColumn} from "typeorm";
import {AutorEntity} from "../autor/autor.entity";

@Entity('LIBRO')
export class LibroEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
        name: 'ISBN',
    })
    ISBN: string

    @Column({
        type: 'varchar',
        length:50,
        nullable: false,
        name: 'Titulo',
    })
    titulo: string

    @Column({
        type: 'varchar',
        length: 4,
        nullable: false,
        name: 'AnioLanza',
    })
    anio_lanzamiento: string

    @Column({
        type: 'varchar',
        length: 20,
        nullable: false,
        name: 'Idioma',
    })
    idioma: string

    @Column({
        type: 'varchar',
        length: 30,
        nullable: false,
        name: 'PaisPublicacion',
    })
    pais_publicacion: string

    @ManyToOne(
        type => AutorEntity,
        autor => autor.libros)
    fkAutor: AutorEntity;
}