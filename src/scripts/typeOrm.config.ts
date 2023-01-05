import { DataSource } from 'typeorm';
import { configService } from '../config/config.service';

//To run a migration we must add it manually as strings with
// the migrations array is deprecated and will stop working with TypeOrm 0.4
import { firstMigration1672880320550 } from '../migration/1672880320550-firstMigration';

const confg = configService.getTypeOrmConfig();

export default new DataSource({
  type: 'postgres',
  host: confg.host,
  port: confg.port,
  username: confg.username,
  password: confg.password,
  database: confg.database,
  entities: confg.entities,
  migrations: [firstMigration1672880320550],
});
