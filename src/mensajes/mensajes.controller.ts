import { Body, Controller, Get, Post, Query } from '@nestjs/common';
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

  @Get('/mensajes/fecha')
  obtieneMensajesPorFecha(@Query() query): Promise<mensajeInterface[]> {
    return this.mensajesService.mensajesPorfecha(query);
  }
}
