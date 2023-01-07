import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from '../../config/config.service';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';

@Module({
  imports: [],
  controllers: [CountryController],
  providers: [CountryService],
})
export class CountryModule {}
