import {  Body,  Controller,  Get,  Param,  Post,  Put,  Query,  Headers,  Req,  Res,  Redirect, Delete, Patch
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
//Para setear nombre
  @Get('setear-nombre/:nombre')
  setearNombre(
      @Param()
          parametrosRuta,
      @Req()
          request,
      @Res({passthrough: true})
          response
  ) {
    response.cookie('nombreUsuario', parametrosRuta.nombre)
    return 'Cookie con nombre ' + parametrosRuta.nombre + ' seteada'
  }

 //Operaciones
  @Get('suma')
  suma(
      @Req()
          request,
      @Query()
          parametrosQuery,
      @Res({passthrough: true})
          response
  ) {
    if(this.comprobarUsuario(request)) {
      const resp = parseInt(parametrosQuery.numerouno) + parseInt(parametrosQuery.numerodos);
      response.header('Usuario-actual', request.cookies.nombreUsuario);
      return "Resultado: "+resp + "\n" + this.revisarPuntaje(request,resp,response);
    }
    else
      return "Cookie con nombre de usuario no seteada";
  }

  @Post('resta')
  resta(
      @Req()
          request,
      @Body()
          parametrosBody,
      @Res({passthrough: true})
          response
  ) {
    if(this.comprobarUsuario(request)) {
      const resp = parseInt(parametrosBody.numerouno) - parseInt(parametrosBody.numerodos);
      response.header('Usuario-actual', request.cookies.nombreUsuario);
      response.header('Resultado', resp);
      return "Resultado: "+resp + "\n" + this.revisarPuntaje(request,resp,response);
    }
    else
      return "Cookie con nombre de usuario no seteada";
  }

  @Put('multiplicacion/:numerouno/:numerodos')
  multiplicacion(
      @Req()
          request,
      @Param()
          parametrosRuta,
      @Res({passthrough: true})
          response
  ) {
    if(this.comprobarUsuario(request)) {
      const resp = parseInt(parametrosRuta.numerouno) * parseInt(parametrosRuta.numerodos);
      response.header('Usuario-actual', request.cookies.nombreUsuario);
      return "Resultado: "+resp + "\n" + this.revisarPuntaje(request,resp,response);
    }
    else
      return "Cookie con nombre de usuario no seteada";
  }

  @Patch ('division')
  division(
      @Req()
          request,
      @Headers()
          parametrosHeader,
      @Res({passthrough: true})
          response
  ) {
    if(this.comprobarUsuario(request)) {
      const resp = parseInt(parametrosHeader.numerouno) / parseInt(parametrosHeader.numerodos);
      response.header('Usuario-actual', request.cookies.nombreUsuario);
      return "Resultado: "+resp + "\n" + this.revisarPuntaje(request,resp,response);
    }
    else
      return "Cookie con nombre de usuario no seteada";
  }

  //comprobar nombre de Usuario
  comprobarUsuario(request) {
    if(!request.cookies.nombreUsuario)
      return false
    else
      return true
  }

  //Puntaje
  revisarPuntaje(request, resultado,response) {
    let valorCookie = parseInt(request.cookies.puntaje);
    if(!request.cookies.puntaje||valorCookie<0)
      valorCookie=100;

    valorCookie -= resultado;
    response.cookie('puntaje', valorCookie.toString());
    if(valorCookie<0)
      return "Felicidades " + request.cookies.nombreUsuario + " ganaste";
    else
      return "";
  }
}
