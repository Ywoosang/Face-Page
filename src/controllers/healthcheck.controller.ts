import * as express from 'express';
import Controller from '../interfaces/controller.interface';

class PingController implements Controller {
    public path = '/ping';
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // 회원가입 
        this.router.get(`${this.path}`,this.healthCheck);
    }
    private healthCheck = async (req, res, next) => {
        try {
            return res.json({
                message : "success"
            }) 
        } catch (error) {
            next(error);
        }
    }
};

export default PingController;