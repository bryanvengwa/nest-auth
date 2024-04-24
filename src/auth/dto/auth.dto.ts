import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsOptional()
  readonly firstName: string;

  @IsString()
  @IsOptional()
  readonly lastName: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  readonly userName: string;
}
