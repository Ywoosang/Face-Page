import '../env';

const ormconfig = {
    type: "mysql",
    host: process.env.MYSQL_HOST!,
    port: Number(process.env.MYSQL_PORT!),
    username: process.env.MYSQL_USERNAME!,
    password: process.env.MYSQL_ROOT_PASSWORD!,
    database: process.env.MYSQL_DATABASENAME!,
    synchronize: true,
    logging: false,
    entities: ["dist/entity/**/*.js","src/entity/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],
    cli: {
      entitiesDir: "src/entity",
      migrationsDir: "src/migration",
      subscribersDir: "src/subscriber",
    }
};

export default ormconfig;
