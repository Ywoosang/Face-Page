import * as express from 'express';
import * as morgan from 'morgan';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import * as hpp from 'hpp';
import * as helmet from 'helmet';
import Controller from './interfaces/controller.interface';
import { loggerMiddleware } from './middlewares/logger.middleware'

dotenv.config();

class App {
    public app: express.Application;
    public port: number | string;

    constructor(controllers: Controller[]) {
        this.app = express();
        this.port =   process.env.PORT || 3000;
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    private initializeMiddlewares() {
        this.app.use(loggerMiddleware); 
        if (process.env.NODE_ENV === "production"){
            this.app.use(cors({
                origin: ['https://kscic.co.kr','https://www.kscic.co.kr']
            })); 
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
    }

    private initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use('/api', controller.router);
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`server listening on port ${this.port}`)
        });
    }
}

export default App;
