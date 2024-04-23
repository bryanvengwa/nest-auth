import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { IPaginationOptions, Pagination, paginate  } from 'nestjs-typeorm-paginate';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async create(userDTO: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
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
    delete user.password;
    delete user.refreshToken;
    return user;
  }

  async findAll(options: any): Promise<Pagination<User>> {
    return paginate<User>(this.usersRepository, {
      ...options,
      transform: (user: User) => {
        const { password, refreshToken, ...result } = user;

        return result;
      },
    });
 }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id: id },
    });
    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
    delete user.password;
    delete user.refreshToken;
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({ where: { id: id } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    // checking if userName has been updated
    if (updateUserDto.userName && updateUserDto.userName !== user.userName) {
      const userNameExists = await this.usersRepository.findOne({
        where: { userName: updateUserDto.userName },
      });

      if (userNameExists) {
        throw new HttpException('userName already exists', HttpStatus.CONFLICT);
      }
    }

    await this.usersRepository.update(id, updateUserDto);

    const updatedUser = await this.usersRepository.findOne({
      where: { id: id },
    });
    delete updatedUser.password;
    delete updatedUser.refreshToken;
    return updatedUser;
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
    return this.usersRepository.delete(id);
  }
  async paginate( options : IPaginationOptions ) :Promise<Pagination<User>> {

    const qb = this.usersRepository.createQueryBuilder('q')

    qb.orderBy('q.id', 'DESC')
    return paginate<User>(qb, options)

  }

}
