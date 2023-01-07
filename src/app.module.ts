import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { CountryModule } from './modules/country/country.module';
import { TaskModule } from './modules/task/task.module';
import { UserController } from './modules/user/user.controller';
import { UserModule } from './modules/user/user.module';

//@Module decorator is being used to provide metadata that Nest makes use
// of to organize the application structure. TypeOrmModule.forRoot is used to
// setup a connection to the database using the configuration options from
// configService.getTypeOrmConfig(). UserModule and TaskModule are imported to
// add their respective features to the application.
@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UserModule,
    TaskModule,
    CountryModule,
  ],
  controllers: [UserController],
  providers: [],
})
export class AppModule {}
