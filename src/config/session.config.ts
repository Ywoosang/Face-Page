import '../env'; 

const options = {
    host: process.env.MYSQL_HOST!,
    port: Number(process.env.MYSQL_PORT!),
    user: process.env.MYSQL_USERNAME!,
    password: process.env.MYSQL_ROOT_PASSWORD!,
  database: process.env.MYSQL_DATABASENAME!,
};

export default options
   