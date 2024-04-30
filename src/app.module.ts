import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmAsyncConfig } from 'db/data-source';
import { RouteLogger } from './common/middleware/logger.middleware';
import { UsersController } from './users/users.controller';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(TypeOrmAsyncConfig),
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env.production'],
      isGlobal: true,
      load: [configuration],
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer : MiddlewareConsumer){
  consumer.apply(RouteLogger).forRoutes(UsersController, AppController)

  }
}
