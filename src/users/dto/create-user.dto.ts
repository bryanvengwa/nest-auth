import { IsNotEmpty, IsString } from 'class-validator';
export class CreateUserDto {

  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  readonly userName: string;

  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
