import { Controller, Get } from '@nestjs/common';
import { MensajesService } from './mensajes.service';
import { mensajeInterface } from './interfaces/mensajes.interface';

@Controller('mensajes')
export class MensajesController {
  constructor(private readonly mensajesService: MensajesService) {}

  @Get()
  getHello(): mensajeInterface[] {
    return this.mensajesService.mensajes();
  }
}
