import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
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
  borrarMesanje(@Param('id') id: string): Promise<mensajeInterface> {
    return this.mensajesService.borrarMensaje(id);
  }
}
