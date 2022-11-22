import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MensajesModule } from './mensajes/mensajes.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MensajesModule,
    UsersModule,
    MongooseModule.forRoot('mongodb://mongo/portfolioDB'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
