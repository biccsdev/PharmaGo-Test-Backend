import {
  BadRequestException,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
} from '@nestjs/common';
import { CountryService } from './country.service';

@Controller('country')
export class CountryController {
  constructor(private countryService: CountryService) {}

  @Get()
  async getCountries(): Promise<any> {
    try {
      const countries = await this.countryService.getCountriesList();
      return { countries: countries };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get('weather/:country')
  async getCountryWeather(@Param() params): Promise<any> {
    try {
      const weather = await this.countryService.getWeather(params.country);
      return weather;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get(':country/timezones')
  async getCountryTimezones(@Param() params): Promise<any> {
    if (
      params.country.toLowerCase() == 'mexico' ||
      params.country.toLowerCase() == 'japan' ||
      params.country.toLowerCase() == 'germany'
    ) {
      const timezones = await this.countryService.getTimezones(params.country);
      return { timezones: timezones };
    }
    throw new BadRequestException(
      'Unavailable country, try with: Mexico, Japan or Germany',
    );
  }

  @Get(':country/currentTime')
  async getCountryTimezoneCurrentTime(@Param() params): Promise<any> {
    if (
      params.country.toLowerCase() == 'mexico' ||
      params.country.toLowerCase() == 'tijuana' ||
      params.country.toLowerCase() == 'hermosillo' ||
      params.country.toLowerCase() == 'cancun' ||
      params.country.toLowerCase() == 'berlin' ||
      params.country.toLowerCase() == 'tokyo'
    ) {
      const currentTime = await this.countryService.getCurrentTime(
        params.country,
      );
      return currentTime;
    }
    throw new BadRequestException(
      'Unavailable region, try with: Mexico, Tijuana, Hermosillo, Cancun, Berlin or Tokyo',
    );
  }
}
