import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthDto } from './dto/auth.dto';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { RefreshTokenGuard } from 'src/common/guards/refresh-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  signUp(@Body() createUserDto : CreateUserDto){
    return this.authService.signUp(createUserDto);
  }
  @Post('signin')
  signIn(@Body() data: AuthDto) {
    return this.authService.signIn(data);
  }
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
 async refreshTokens(@Req() req: any) {
   const userId = req?.user['sub'];
   console.log( "user id from refresh : "+ userId)
    const refreshToken = req?.user['refreshToken'];
    return await this.authService.refreshTokens(userId, refreshToken);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() req: any) {
    console.log( "user : "+ req.user['sub'])
    this.authService.logout(req.user['sub']);
  }


}
