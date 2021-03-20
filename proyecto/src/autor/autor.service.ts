import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {AutorEntity} from "./autor.entity";
import {Repository} from "typeorm";

@Injectable()
export class AutorService{
    constructor(

        @InjectRepository(AutorEntity)
        public autorEntity:Repository<AutorEntity>
    ){

    }
}