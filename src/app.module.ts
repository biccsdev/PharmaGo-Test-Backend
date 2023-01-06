import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { UserEntity } from './model/user.entity';
import { UserController } from './modules/user/user.controller';
import { UserModule } from './modules/user/user.module';
import { UserService } from './modules/user/user.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UserModule,
  ],
  controllers: [UserController],
  providers: [],
})
export class AppModule {}
