import { IsNotEmpty, IsString } from 'class-validator';
export class CreateUserDto {

  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsString()w
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  readonly userName: string;


}
