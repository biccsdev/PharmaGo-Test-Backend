import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { UserEntity } from 'src/model/user.entity';
import { CreateUserDto } from './create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      const user: UserEntity = await this.userService.create(createUserDto);
      return user;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get()
  async listAll(): Promise<UserEntity[]> {
    try {
      const users: UserEntity[] = await this.userService.findAll();
      return users;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get(':email')
  async findUser(@Param('email') params: string): Promise<UserEntity> {
    try {
      console.log(params);
      const user: UserEntity = await this.userService.findByEmail(params);
      return user;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
