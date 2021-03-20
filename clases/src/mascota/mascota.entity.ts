import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {UsuarioEntity} from "../usuario/usuario.entity";

@Entity('EPN_MASCOTA')
export class MascotaEntity{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    nombre:string

    // ManyToOne (Hijo) MascotaEntity
    @ManyToOne(
        type => UsuarioEntity, // Clase de le entidad papa
        usuario => usuario.mascotas)
    fkUsuario;

}