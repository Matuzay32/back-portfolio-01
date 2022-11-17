import { Injectable } from '@nestjs/common';
import { mensajeInterface } from './interfaces/mensajes.interface';

@Injectable()
export class MensajesService {
  constructor() {}

  mensajes(): mensajeInterface[] {
    return [{ name: 'npmbre', email: 'email.@gmail', message: 'mensaje' }];
  }
}
