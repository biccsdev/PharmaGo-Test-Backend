import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import fetch from 'node-fetch';
// require('dotenv').config();

@Injectable()
export class CountryService {
  //In the constructor, store the environment values in the env property
  //   constructor(private env: { [k: string]: string | undefined }) {}
  constructor() {
    dotenv.config();
  }

  //Create a method to retrieve values from the env property
  //   private getValue(key: string, throwOnMissing = true): string {
  //     const value = this.env[key];
  //     if (!value && throwOnMissing) {
  //       throw new Error(`config error - missing env.${key}`);
  //     }
  //     return value;
  //   }

  public async getCountriesList(): Promise<any[]> {
    return ['Mexico', 'Japan', 'Germany'];
  }

  public async getWeather(country: string): Promise<any> {
    const res = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${country}&days=1&aqi=no&alerts=no`,
    );
    const weather = await res.json();
    return {
      name: weather.location.name,
      region: weather.location.region,
      country: weather.location.country,
      temperature_c: weather.current.temp_c,
      condition: weather.current.condition.text,
    };
  }

  public async getTimezones(country: string): Promise<any> {
    if (country.toLowerCase() == 'mexico') {
      return ['Mexico', 'Tijuana', 'Hermosillo', 'Cancun'];
    }
    if (country.toLowerCase() == 'japan') {
      return ['Tokyo'];
    }
    if (country.toLowerCase() == 'germany') {
      return ['Berlin'];
    }
  }

  public async getCurrentTime(country: string): Promise<any> {
    const res = await fetch(
      `http://api.weatherapi.com/v1/timezone.json?key=${process.env.WEATHER_API_KEY}&q=${country}`,
    );
    const currentTime = await res.json();
    console.log(currentTime);
    return currentTime;
  }
}
