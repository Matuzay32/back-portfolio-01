import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MensajesModule } from './mensajes/mensajes.module';

@Module({
  imports: [MensajesModule, MongooseModule.forRoot('mongodb://localhost/3000')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
