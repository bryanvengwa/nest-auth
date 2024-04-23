import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
       password: 'password',
      database: 'token-auth',
      entities: [User],
      synchronize: true,
    }),ConfigModule.forRoot(),
    UsersModule,
    AuthModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
