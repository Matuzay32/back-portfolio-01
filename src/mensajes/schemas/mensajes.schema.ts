import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MensajeDocument = HydratedDocument<Mensaje>;

@Schema()
export class Mensaje {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  breed: string;
}

export const MensajeSchema = SchemaFactory.createForClass(Mensaje);
