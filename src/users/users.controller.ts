import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto : CreateUserDto ) {
    console.log("post function running")
    return await this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(
    @Query() options: any,
  ): Promise<Pagination<User>> {
    return this.usersService.findAll(options);
 }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe({errorHttpStatusCode : HttpStatus.NOT_FOUND})) id: number) {
    return this.usersService.remove(id);
  }
}
