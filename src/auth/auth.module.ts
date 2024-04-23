import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategies/refreshToken.strategy';
import { RefreshTokenStrategy } from './strategies/accessToken.strategy';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports:[JwtModule.register({}), UsersModule , TypeOrmModule.forFeature([User]) ],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy, UsersService, ConfigService ],
})
export class AuthModule {}
