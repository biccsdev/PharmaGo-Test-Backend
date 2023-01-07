import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { UserEntity } from 'src/model/user.entity';
import { AuthService } from './auth.service';
import { LoginUserDto } from './login-user.dto';
import { RegisterUserDto } from './register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // This method is a POST route which is used to register a new user.
  // It takes a RegisterUserDto as its input argument and returns a UserEntity type object.
  //  Before registering the user, it checks if the email and password fields are valid and
  // if the password and the confirmed password matches. If not, it throws a BadRequestException.
  // If everything is valid, it registers the user and returns the registered user.
  @Post()
  async registerNewUser(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<UserEntity> {
    if (!registerUserDto.email) {
      throw new BadRequestException('Incomplete input found, try again.');
    }
    if (registerUserDto.password != registerUserDto.confirmPassword) {
      throw new BadRequestException("Passwords don't match.");
    }
    if (await this.authService.exists(registerUserDto.email)) {
      throw new BadRequestException(
        'Email already in use, try with other email address.',
      );
    }
    if (!(await this.authService.isEmailValid(registerUserDto.email))) {
      throw new BadRequestException(
        'Email format invalid, try with other email address.',
      );
    }
    const registeredUser = await this.authService.register(registerUserDto);
    return registeredUser;
  }

  // This method is a GET route which is used to log in a user. It takes a LoginUserDto
  //  as its input argument and returns a string type object. Before logging in the user,
  // it checks if the email exists. If not, it throws a BadRequestException.
  // If the email exists, it logs in the user and returns the logged in user.
  @Get()
  async login(@Body() loginUserDto: LoginUserDto): Promise<string> {
    if (!loginUserDto.email) {
      throw new BadRequestException('Incomplete input found, try again.');
    }
    if (!(await this.authService.exists(loginUserDto.email))) {
      throw new BadRequestException("An user with this email doesn't exist");
    }
    const loggedUser = await this.authService.login(loginUserDto);
    return loggedUser;
  }
}
