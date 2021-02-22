import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
/*
abstract class Nombre {
  public nombrePropiedad?: string; // undefined
  private apellidoPropiedad: string = 'Eguez';
  protected edad = 1; // number (Duck Typing)
  static comun: number = 10;



  propiedadPublica: string;



  constructor(
      propiedadPublicaParametro: string, // parametro
      public propiedadRapido: string, // transforma una propiedad
  ) {
    this.propiedadPublica = propiedadPublicaParametro;
    // this.propiedadPublicaParametro ERROR
    // this.propiedadRapido; OK
  }



  public funcionPublica(parametroString: string): void {
    // no hay return = undefined
  }



  private funcionPrivada(parametroString: string,
                         parametroNumber: number) { // omitir :void (defecto)
    // no hay return = undefined
  }



  protected funcionPublica1(): number {
    return 1;
  }



  static funcionPublica(): string {
    return 'string';
  }
}*/
/*
//VARIABLES
  //MUTABLES (REASIGNABLES)
//var variableUno  --Recomendable no usar
let variableDos
  //IMNUTABLES (NO PUEDEN SER REASIGNADAS)
const variableTres =2
 */

//Tipos de variables
  const texto:string = "";
  const testoConComillassimples:string = '';
  const numeroEntero = 1;
  const numeroFlotante = 1.2;
  const soyEstudiante: boolean = true;
  const fecha: Date = new Date();
  const  noDefinido = undefined;
  const noHayNada = null;

  class Usuario {
    constructor (
        public nombre: string,
        public apellido:string
    ){

    }

  }
  const usuario: Usuario = new Usuario ('Edwin', 'Cocha');
  usuario.nombre = 'Fabian';

  interface UsuarioInterface{

  }