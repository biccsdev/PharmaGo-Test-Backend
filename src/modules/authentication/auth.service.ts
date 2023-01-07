import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/model/user.entity';
import { UserService } from '../user/user.service';
import { LoginUserDto } from './login-user.dto';
import { RegisterUserDto } from './register-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  //This is a public method for registering a user that takes in a RegisterUserDto object as a parameter.
  // It returns a Promise of a UserEntity. The method calls the userService create method and passes in the RegisterUserDto object.
  public async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    return await this.userService.create(registerUserDto);
  }

  //This is a public method for logging in a user that takes in a LoginUserDto object as a parameter.
  // It returns a Promise of an object containing a message and a boolean value indicating the success of the login attempt.
  // The method calls the userService findByEmail method and compares the password from the LoginUserDto object to the password of the user found in the database.
  // If the passwords match, it returns an object indicating successful login, otherwise it returns an object indicating unsuccessful login.
  public async login(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.userService.findByEmail(loginUserDto.email);
    if (loginUserDto.password != user.password) {
      return {
        message: "Couldn't log in, passwords don't match",
        logged: false,
      };
    }
    if (
      this.exists(loginUserDto.email) &&
      loginUserDto.password == user.password
    ) {
      return { message: 'Logged in Successfully!', logged: true };
    }
  }

  //This is a public method for checking if an email exists in the database.
  // It takes in an email address as a parameter and returns a Promise of a boolean value.
  // The method calls the userService exists method and passes in the email address, and returns the result of the call.
  public async exists(email: string): Promise<boolean> {
    const res = await this.userService.exists(email);
    return res;
  }

  //This is a public method for validating an email address. It takes in an email address as a parameter and returns a boolean value.
  // The method uses a regular expression to check if the email address is valid, and then performs additional checks to ensure
  // the length of the email address does not exceed the maximum length.
  // It returns true if the email address is valid, and false if it is not.
  public async isEmailValid(email: string) {
    const emailRegex =
      /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    if (!email) return false;

    if (email.length > 254) return false;

    var valid = emailRegex.test(email);
    if (!valid) return false;

    // Further checking of some things regex can't handle
    var parts = email.split('@');
    if (parts[0].length > 64) return false;

    var domainParts = parts[1].split('.');
    if (
      domainParts.some(function (part) {
        return part.length > 63;
      })
    )
      return false;

    return true;
  }
}
