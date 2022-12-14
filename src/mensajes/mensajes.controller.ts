import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Response,
} from '@nestjs/common';
import { MensajesService } from './mensajes.service';
import { mensajeInterface } from './interfaces/mensajes.interface';
import { CreateMensaje } from './dto/mensaje.dto';

@Controller('mensajes')
export class MensajesController {
  constructor(private readonly mensajesService: MensajesService) {}

  @Get()
  verTodosLosMensajes(): Promise<mensajeInterface[]> {
    return this.mensajesService.verMensajes();
  }

  @Post()
  crearMensaje(@Body() createDto: CreateMensaje): Promise<mensajeInterface> {
    return this.mensajesService.crearMensaje(createDto);
  }

  @Delete('/:id')
  deleteUser(@Param() param, @Response() res): Promise<mensajeInterface> {
    const mensaje = this.mensajesService.borrarMensaje(param.id);
    return res.status(HttpStatus.OK).json(mensaje);
  }
}
