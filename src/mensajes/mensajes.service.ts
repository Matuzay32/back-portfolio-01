import { Injectable } from '@nestjs/common';
import { mensajeInterface } from './interfaces/mensajes.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  MensajeSchema,
  Mensaje,
  MensajeDocument,
} from './schemas/mensajes.schema';

@Injectable()
export class MensajesService {
  constructor(
    @InjectModel(Mensaje.name) private mensajeModel: Model<MensajeDocument>,
  ) {}

  mensajes(): mensajeInterface[] {
    return [{ name: 'npmbre', email: 'email.@gmail', message: 'mensaje' }];
  }
}
