import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MensajeDocument = HydratedDocument<Mensaje>;

@Schema()
export class Mensaje {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  message: string;

  @Prop({ type: Date, default: Date.now })
  fecha: Date;
}

export const MensajeSchema = SchemaFactory.createForClass(Mensaje);
