import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../model/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>,
  ) {}

  public async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    if (createUserDto.password == createUserDto.confirmPassword) {
      const userModel: UserEntity = {
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password,
      };
      const user = this.repo.save(userModel);
      return user;
    }
  }

  public async findAll(): Promise<UserEntity[]> {
    const users = this.repo.find();
    return users;
  }

  public async findByEmail(email: string): Promise<UserEntity> {
    const user = this.repo.findOne({ where: { email: email } });
    return;
  }
}
