import * as express from 'express';
import Controller from '../interfaces/controller.interface';
import upload from '../middlewares/upload.middleware';
import * as dotenv from 'dotenv';
dotenv.config();

class UploadController implements Controller {
    public path = '/image';
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // 이미지 업로드 
        this.router.post(`${this.path}/upload`, upload.single('image'), this.uploadPostImage);
    }

    private async uploadPostImage (req, res, next) {
        const file = req.file;
        if (!file) return res.status(400).json({ message: 'invalid image request' })
        console.log(req.file.location);
        console.log(req.file);
        return res.json({
            url: req.file.location,
            filename: req.file.key
        });
    };
}

export default UploadController;