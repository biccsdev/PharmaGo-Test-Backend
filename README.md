

# Pharma Go Test Backend

This repository contains the codebase for the backend of the system. This project is written using NestJS,  Typescript and TypeORM for the connection with Postgres Database.


## Deployment & Database Migrations

## TypeORM

TypeORM is an open source tool that provides an easy-to-use command line interface for interacting with a database. The following commands are used to work with TypeORM.

## typeorm

This command runs the TypeORM CLI, which allows you to run various commands to interact with a database. 

## typeorm:run-migrations 

This command runs the migrations defined in the `src/scripts/typeOrm.config.ts` file. Migrations are used to create or modify database tables or columns.

## typeorm:generate-migration

This command generates a new migration in the `src/migration/` directory. The name of the migration is specified by the `$npm_config_name` parameter.

## typeorm:create-migration

This command creates a new migration in the `src/migration/` directory. The name of the migration is specified by the `$npm_config_name` parameter.

## typeorm:revert-migration

This command reverts a migration in the `src/scripts/typeOrm.
## To run data migrations
``` bash
"typeorm": "ts-node ./node_modules/typeorm/cli",
"typeorm:run-migrations": "npm run typeorm migration:run -- -d src/scripts/typeOrm.config.ts",
"typeorm:generate-migration": "npm run typeorm -- -d src/scripts/typeOrm.config.ts migration:generate src/migration/$npm_config_name",
"typeorm:create-migration": "npm run typeorm -- migration:create src/migration/$npm_config_name",
"typeorm:revert-migration": "npm run typeorm -- -d src/scripts/typeOrm.config.ts migration:revert"
```
## To run this project:

```bash
  npm run start:dev 
  or
  npm run start
```


# API Reference
## Authentication
#### Register New User

```http
  POST /auth
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `registerUserDto` | `RegisterUserDto` | **Required** |

```
RegisterUserDto {
    name: string,
    password: string,
    confirmPassword: string,
    email: string
}
```
#### Login

```http
  GET /auth
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `loginUserDto`      | `LoginUserDto` | **Required** |

```
LoginUserDto {
    email: string
    password: string,
}
```
## User
#### create

```http
  POST /user
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `createUserDto` | `CreateUserDto` | **Required** |

```
CreateUserDto {
    name: string,
    password: string,
    confirmPassword: string,
    email: string
}
```
#### List All

```http
  GET /user
```
returns all users in the database
#### Find User

```http
  GET /user/:email
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required** |

returns an user matching the email provided, if any.
## Task
#### create

```http
  POST /task
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `createTaskDto` | `CreateTaskDto` | **Required** |

```
CreateTaskDto {
    taskName: string,
}
```
#### List All

```http
  GET /task
```
returns a list with all the tasks stored in the database

## Country
#### Get Countries

```http
  GET /country
```
returns a list of all available Countries to fetch data from.

#### Get Country Weather

```http
  GET /country/weather/:country
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `country` | `string` | **Required**.  Country available to retrieve data from |

#### Get Countries

```http
  GET /country
```
returns a list of all available Countries to fetch data from.

#### Get Country Timezones

```http
  GET /country/:country/timezones
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `country` | `string` | **Required**.  Country available to retrieve data from |

returns the timezones form the passed country

#### Get Timezone Current Time

```http
  GET /country/:country/currentTime
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `country` | `string` | **Required**.  TimeZone available to retrieve data from |

returns the current time from the passed TimeZone


