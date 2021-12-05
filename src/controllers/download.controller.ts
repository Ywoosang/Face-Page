import * as express from 'express';
import Controller from '../interfaces/controller.interface';
import * as dotenv from 'dotenv';
import DownlodaService from '../services/download.service'; 
dotenv.config();

class DownloadController implements Controller {
    public path = '/image';
    public router = express.Router();
    public downloadService = new DownlodaService() ;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // 이미지 업로드 
        this.router.get(`${this.path}/download`, this.downloadImage);
    }

    private downloadImage = async(req, res, next) => {
        try {
            const url = req.query.url;
            const stream = await this.downloadService.getReadStream(url);
            res.setHeader('Content-disposition', 'attachment; filename=' + 'test.jpg');
            res.setHeader('Content-type','image/jpeg'); // 파일 형식 지정
            stream.pipe(res);
        } catch (error) {
            next(error);
        }
    };
};

export default DownloadController;