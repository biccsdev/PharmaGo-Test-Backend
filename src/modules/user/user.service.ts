import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../model/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './create-user.dto';
import { RegisterUserDto } from '../authentication/register-user.dto';

//This decorator makes the class injectable for the module
@Injectable()
export class UserService {
  //Create a private readonly property that holds a repo of userEntity to be used for DB connection
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>,
  ) {}

  //Creates a public async function that takes in a CreateUserDto parameter for standarization
  // and returns a promise of UserEntity if the user was created successfully
  public async create(
    createUserDto: CreateUserDto | RegisterUserDto,
  ): Promise<UserEntity> {
    //Verifies if the passwords match, if so it creates the user
    if (createUserDto.password == createUserDto.confirmPassword) {
      //Maps the Dto's properties to a UserEntity object
      const userModel: UserEntity = {
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password,
      };
      //Stores the user in the database
      const user = this.repo.save(userModel);
      //Returns the created user
      return user;
    }
  }

  //This line of code creates a public async function called findAll
  // that returns a promise of an array of UserEntity
  public async findAll(): Promise<UserEntity[]> {
    const users = this.repo.find();
    return users;
  }

  // Creates a public async function called findByEmail
  // that takes in a string parameter (email) and returns a promise of a UserEntity with the found user
  public async findByEmail(email: string): Promise<UserEntity> {
    // This line of code creates a variable called user that holds a UserEntity that
    // is found by the specified email
    const user = this.repo.findOne({ where: { email: email } });
    //Returns the found user by email
    return user;
  }

  //Creates a public async function that takes in a string parameter and returns a boolean promise
  public async exists(email: string): Promise<boolean> {
    //Create a variable that holds a UserEntity that is found by the specified email
    const user = await this.repo.findOne({ where: { email: email } });
    //Checks whether a user was found or not
    if (user != null) {
      //If the user was found returns true
      return true;
    }
    //If the user wasn't found returns false
    return false;
  }
}
