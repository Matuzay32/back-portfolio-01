import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { MensajesModule } from './mensajes/mensajes.module';
import { UsersModule } from './users/users.module';
import { MensajesController } from './mensajes/mensajes.controller';
import { UsersController } from './users/users.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MensajesModule,
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      'mongodb://eze:password@portfolioDB:27017/miapp?authSource=admin',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'mensajes', method: RequestMethod.POST })
      .forRoutes('mensajes');
  }
  static port: number;
  constructor(private readonly configService: ConfigService) {
    AppModule.port = +this.configService.get('PORT');
  }
}
// export class AppModule {}
