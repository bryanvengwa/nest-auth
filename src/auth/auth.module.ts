import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';

@Module({
  imports:[JwtModule.register({secret : "fdsaffs"}), UsersModule , TypeOrmModule.forFeature([User]) ],
  controllers: [AuthController, ],
  providers: [AuthService, RefreshTokenStrategy,AccessTokenStrategy, UsersService, ConfigService ],
})
export class AuthModule {}
