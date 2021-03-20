import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {MascotaEntity} from "./mascota.entity";
import {Repository} from "typeorm";

@Injectable()
export class MascotaService{
    constructor( // Inyectar Dependencias
        @InjectRepository(MascotaEntity)
        public mascotaEntity:Repository<MascotaEntity>
    ) {
    }
}