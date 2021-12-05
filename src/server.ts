import * as dotenv from 'dotenv'
import App from './app';
import UploadController from './controllers/upload.controller';
import PostController from './controllers/post.controller';
import AuthController from './controllers/auth.controller';
import DownloadController from './controllers/download.controller';
// typeorm
import { createConnection } from "typeorm";
// import ormconfig from './config/typeorm.config';
// import {createDatabase} from "typeorm-extension";

(async () => {
    try {
        // await createDatabase({ifNotExist: true, charset: "utf8mb4_general_ci", characterSet: "utf8mb4"});
        await createConnection({
            "type": "mysql",
            "host": "localhost",
            "port": 3306,
            "username": "root",
            "password": "1234",
            "database": "FAGE",
            "synchronize": true,
            "logging": false,
            "entities": [
                "src/entity/**/*.ts"
            ],
            "migrations": [
                "src/migration/**/*.ts"
            ],
            "subscribers": [
                "src/subscriber/**/*.ts"
            ],
            "cli": {
                "entitiesDir": "src/entity",
                "migrationsDir": "src/migration",
                "subscribersDir": "src/subscriber"
            }
            })
        console.log('CONNECTED')
    
    } catch (error) {
      console.log('Error while connecting to the database', error);
      return error;
    }
    const app = new App(
        [
          new UploadController(),
          new AuthController(),
          new PostController(),
          new DownloadController()
        ]
      );
       app.listen();
  })();