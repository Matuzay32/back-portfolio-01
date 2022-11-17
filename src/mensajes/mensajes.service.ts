import { Injectable } from '@nestjs/common';
import { mensajeInterface } from './interfaces/mensajes.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  MensajeSchema,
  Mensaje,
  MensajeDocument,
} from './schemas/mensajes.schema';
import { CreateMensaje } from './dto/mensaje.dto';
@Injectable()
export class MensajesService {
  constructor(
    @InjectModel(Mensaje.name) private mensajeModel: Model<MensajeDocument>,
  ) {}

  verMensajes(): mensajeInterface[] {
    return [{ name: 'npmbre', email: 'email.@gmail', message: 'mensaje' }];
  }

  async crearMensaje(dtoMensaje: CreateMensaje): Promise<any> {
    return await this.mensajeModel.create(dtoMensaje);
  }
}
