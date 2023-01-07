import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Post,
} from '@nestjs/common';
import { UserEntity } from 'src/model/user.entity';
import { CreateUserDto } from './create-user.dto';
import { UserService } from './user.service';

//Creates a controller with the name 'user'
@Controller('user')
//Declares a class named UserController
export class UserController {
  //Creates a constructor that takes the UserService as a private
  // argument in order to call its business logic methods
  constructor(private userService: UserService) {}

  //Declares a Post request at the given route
  @Post()
  //Defines a create method using the argument CreateUserDto for standard communication with the client
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      //Attempts to create the user using the given argument
      const user: UserEntity = await this.userService.create(createUserDto);
      //Returns the created user if any
      return user;
    } catch (error) {
      //Check if the email already exists
      if (this.userService.exists(createUserDto.email)) {
        //Throws a Forbidden exception if the email exists
        throw new HttpException('Email already in use', HttpStatus.FORBIDDEN);
      }
      throw new InternalServerErrorException();
    }
  }

  //Defines the route handler for a GET request to the specified path
  @Get()
  //Async function that returns a promise of an array of UserEntity, (returns all users)
  async listAll(): Promise<UserEntity[]> {
    try {
      //Create a variable called users that holds an array of UserEntity from the userService.findAll() method
      const users: UserEntity[] = await this.userService.findAll();
      //Returns the users available, if any
      return users;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  // This is a decorator that defines a route handler for a GET request to the specified
  // path with an email parameter
  @Get(':email')
  // This is an async function that returns a promise of a UserEntity with a @Param() parameter
  // which stores the parameter passed through the query
  async findUser(@Param() params): Promise<UserEntity> {
    try {
      // This line of code creates a variable called user that holds a UserEntity from
      // the userService.findByEmail() method
      const user: UserEntity = await this.userService.findByEmail(params.email);
      // Returns the found user, if any
      return user;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
