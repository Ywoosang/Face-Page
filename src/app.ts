import * as express from 'express';
import * as morgan from 'morgan';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import * as hpp from 'hpp';
import * as helmet from 'helmet';
import * as passport from 'passport'
import * as session from 'express-session';
import * as connectRedis from 'connect-redis';
import Controller from './interfaces/controller.interface';
import { loggerMiddleware } from './middlewares/logger.middleware';
import errorMiddleware from './middlewares/error.middleware';
import passportConfig from './passport';
import sessionConfig from './config/session.config';
import * as expressMySqlSession from "express-mysql-session";



import './env';

dotenv.config();

class App {
    public app: express.Application;
    public port: number;

    constructor(controllers: Controller[]) {
        this.app = express();
        this.port = Number(process.env.PORT) || 3000;
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }

    private initializeMiddlewares() {
        this.app.use(loggerMiddleware);
        if (process.env.NODE_ENV === "production") {
            this.app.use(cors());
            this.app.use(morgan("combined"));
            this.app.use(helmet({
                contentSecurityPolicy: false
            }));
            this.app.use(hpp());
        } else if (process.env.NODE_ENV === "development") {
            this.app.use(cors({
                origin: true,
                credentials: true
            }));
            this.app.use(morgan("dev"));
        }
        // parse application/json 파싱
        this.app.use(express.json());
        //  application/x-www-form-urlencoded 파싱
        this.app.use(express.urlencoded({ extended: true }));
        if(process.env.NODE_ENV !== 'test'){
            const MysqlStore = expressMySqlSession(session); 
            // 세션 미들웨어 사용 
            const sessionStore = new MysqlStore(sessionConfig)
            this.app.use(session({
                resave: false,
                saveUninitialized: false,
                secret: process.env.COOKIE_SECRET,
                cookie: {
                    secure: false,
                    maxAge: 1000 * 60 * 24
                },
                store: sessionStore
            }))
        } else {
            this.app.use(session({
                resave: false,
                saveUninitialized: false,
                secret: process.env.COOKIE_SECRET,
                cookie: {
                    secure: false
                }
            }))
        }
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

    public getServer() {
        return this.app;
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`SERVER LISTENING ON PORT ${this.port}`)
        });
    }
}

export default App;
