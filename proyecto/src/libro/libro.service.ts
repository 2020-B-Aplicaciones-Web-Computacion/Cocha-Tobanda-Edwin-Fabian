import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {LibroEntity} from "./libro.entity";

@Injectable()
export class LibroService{
    constructor(
        @InjectRepository(LibroEntity)
        public libroEntity: Repository<LibroEntity>
    ){

    }
}