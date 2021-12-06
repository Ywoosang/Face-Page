import App from './app';
import UploadController from './controllers/upload.controller';
import PostController from './controllers/post.controller';
import AuthController from './controllers/auth.controller';
import DownloadController from './controllers/download.controller';
import PhotoController from './controllers/photo.controller';
import { createConnection } from "typeorm";
import ormconfig from './config/typeorm.config';
import './env';

(async () => {
    try {
      await createConnection(ormconfig as any)
      console.log('MYSQL DATABASE CONNECTED')
    } catch (error) {
      console.log('FAILED TO CONNECT MYSQL DATABASE', error);
      return error;
    }
    const app = new App(
        [
          new UploadController(),
          new AuthController(),
          new PostController(),
          new DownloadController(),
          new PhotoController()
        ]
      );
       app.listen();
})();
 