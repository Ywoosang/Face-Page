import * as express from 'express';
import Controller from '../interfaces/controller.interface';
import PhotoService from '../services/photo.service'; 
import '../env';

class PhotoController implements Controller {
    public path = '/image';
    public router = express.Router();
    public photoService = new PhotoService() ;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // 이미지 업로드 
        this.router.get(`${this.path}/pixabay`, this.getPixabayImage);
    }

    private getPixabayImage = async(req, res, next) => {
        try {
            const keyword:string = req.query.keyword;
            const images = await this.photoService.getPixabayImage(keyword);
            return res.json({
                images
            })
        } catch (error) {
            next(error);
        }
    };
};

export default PhotoController;