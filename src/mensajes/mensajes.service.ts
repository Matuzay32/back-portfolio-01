import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async verMensajes(): Promise<mensajeInterface[]> {
    try {
      return await this.mensajeModel.find();
    } catch (error) {
      throw new HttpException(
        { error: 'No se pudieron encotrar los datos' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async crearMensaje(dtoMensaje: CreateMensaje): Promise<any> {
    try {
      return await this.mensajeModel.create(dtoMensaje);
    } catch (error) {
      throw new HttpException(
        { error: 'No se logro crear el mail' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
