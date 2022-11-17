import { Module } from '@nestjs/common';
import { MensajesController } from './mensajes.controller';
import { MensajesService } from './mensajes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MensajeSchema, Mensaje } from './schemas/mensajes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Mensaje.name, schema: MensajeSchema }]),
  ],
  controllers: [MensajesController],
  providers: [MensajesService],
})
export class MensajesModule {}
