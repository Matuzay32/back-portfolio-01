import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MensajesModule } from './mensajes/mensajes.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { UsersModule } from './users/users.module';
import { MensajesController } from './mensajes/mensajes.controller';
import { UsersController } from './users/users.controller';

@Module({
  imports: [
    MensajesModule,
    UsersModule,
    MongooseModule.forRoot('mongodb://mongo/portfolioDB'),
  ],
  controllers: [AppController],
  providers: [AppService],
})

// DESPUES TENGO QUE PROBARLO CON EL TOKEN
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: 'mensajes', method: RequestMethod.POST },
        { path: 'users', method: RequestMethod.POST },
      )
      .forRoutes(MensajesController, UsersController);
  }
}

// export class AppModule {}
