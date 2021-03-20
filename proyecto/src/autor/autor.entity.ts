import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {LibroEntity} from "../libro/libro.entity";

@Entity('AUTOR')
export class AutorEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        name: 'NombreAutor',
    })
    nombre_autor: string

    @Column({
        type:'varchar',
        length: 100,
        nullable:false,
        name:'ApellidoAutor'
    })
    apellido_autor: string

    @Column({
        type:'varchar',
        length: 100,
        nullable:false,
        name:'PaisAutor'
    })
    pais_autor: string

    @Column({
        type:'varchar',
        length: 100,
        nullable:false,
        name:'GeneroAutor'
    })
    genero_autor: string

    @Column()
    edad_autor: number //edad de 0 significa que ha fallecido

    @OneToMany(
        type =>LibroEntity,
        libro => libro.fkAutor)
    libros: LibroEntity[];
}