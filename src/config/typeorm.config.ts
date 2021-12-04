import * as dotenv from "dotenv";
import TypeormConfig from '../interfaces/typeorm.config';

dotenv.config();

const ormconfig: TypeormConfig = {
  development:{
    type: "mysql",
    host: "127.0.0.1",
    port:  3306,
    username: "root",
    password: "1234",
    database: "Fage",
    synchronize: true,
    logging: false,
    entities: ["dist/entity/**/*.js", "src/entity/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],
    cli: {
      entitiesDir: "src/entity",
      migrationsDir: "src/migration",
      subscribersDir: "src/subscriber",
    }
  },
  production: {
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASENAME,
    synchronize: true,
    logging: false,
    entities: ["dist/entity/**/*.js"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],
    cli: {
      entitiesDir: "src/entity",
      migrationsDir: "src/migration",
      subscribersDir: "src/subscriber",
    }
  }
};

export default ormconfig;