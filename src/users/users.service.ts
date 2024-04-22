import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}
  async create(userDTO: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt()
    userDTO.password = await bcrypt.hash(userDTO.password, salt);
    const userName = await this.usersRepository.exists({
      where: {
        userName: userDTO.userName,
      },
    });
    if (userName) {
      throw new HttpException('userName already exists', HttpStatus.CONFLICT);
    }

    const user = await this.usersRepository.save(userDTO);
    delete user.password
    return user;
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
