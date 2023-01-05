import { TypeOrmModuleOptions } from '@nestjs/typeorm';

//Require the dotenv module to use environment variables
require('dotenv').config();

//Create class to store configuration values
class ConfigService {
  //In the constructor, store the environment values in the env property
  constructor(private env: { [k: string]: string | undefined }) {}

  //Create a method to retrieve values from the env property
  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }
    return value;
  }

  //Create a method to ensure that the specified keys are present in the env
  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  //This method retrieves the port that is being used by the DB
  public getPort() {
    return this.getValue('PORT', true);
  }

  //This is a method that checks if the mode is set to 'DEV' and returns the opposite boolean.
  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  //This is a method that returns the TypeORM configuration options.
  public getTypeOrmConfig() {
    return {
      type: 'postgres',
      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT')),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),

      entities: ['src/model/*.ts'],
      migrationsTableName: 'migration',
      migrations: ['src/migration/*.ts'],
      cli: { migrationsDir: 'src/migration' },
      ssl: this.isProduction(),
    };
  }
}

//This instantiates the 'ConfigService' with the process environment variables
// and ensures that the specified values of 'POSTGRES_HOST', 'POSTGRES_PORT',
// 'POSTGRES_USER', 'POSTGRES_PASSWORD', and 'POSTGRES_DATABASE' exist.
// It then exports the 'configService' so it can be used elsewhere.
const configService = new ConfigService(process.env).ensureValues([
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE',
]);

export { configService };
