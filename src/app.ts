import * as express from 'express';
import * as morgan from 'morgan';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import * as hpp from 'hpp';
import * as helmet from 'helmet';
import * as passport from 'passport'
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import Controller from './interfaces/controller.interface';
import { loggerMiddleware } from './middlewares/logger.middleware';
import  errorMiddleware from './middlewares/error.middleware';
import passportConfig from './passport';

dotenv.config();

class App {
    public app: express.Application;
    public port: number;

    constructor(controllers: Controller[]) {
        this.app = express();
        this.port =   Number(process.env.PORT) || 3000;
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }

    private initializeMiddlewares() {
        this.app.use(loggerMiddleware); 
        if (process.env.NODE_ENV === "production"){
            this.app.use(cors()); 
            this.app.use(morgan("combined"));
            this.app.use(helmet({
                contentSecurityPolicy: false
            }));
            this.app.use(hpp());
        } else if(process.env.NODE_ENV === "development") {
            this.app.use(cors());
            this.app.use(morgan("dev"));
        }
         
        // parse application/json 파싱
        this.app.use(express.json());
        //  application/x-www-form-urlencoded 파싱
        this.app.use(express.urlencoded({
            extended: true
        }));
        this.app.use(session({
            resave: false,
            saveUninitialized: false,
            secret: process.env.COOKIE_SECRET,
            cookie: {
                secure: false
            }
        }))
        this.app.use(cookieParser(process.env.COOKIE_SECRET)); 
        passportConfig()
        this.app.use(passport.initialize()); 
        this.app.use(passport.session())
    }

    private initializeControllers(controllers: Controller[]) {
        controllers.forEach((controller: Controller) => {
            this.app.use('/api', controller.router);
        });
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
      }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`server listening on port ${this.port}`)
        });
    }
}

export default App;
