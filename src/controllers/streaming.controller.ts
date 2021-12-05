import * as express from 'express';
import Controller from '../interfaces/controller.interface';
import StreamingService from '../services/streaming.service';
import * as dotenv from 'dotenv';
dotenv.config();

class StreamingController implements Controller {
    public path = '/image';
    public router = express.Router();
    private streamingService = new StreamingService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // 이미지 업로드 
        this.router.get(`${this.path}/video`, this.videoStream);
    }

    private videoStream = async(req,res,next) => {
        try{
            const range: string = req.headers.range;
            if(!range) return res.sendStatus(400)
            const headers = this.streamingService.getStreamingHeader(range);
            const videoStream = this.streamingService.getVideoStream(range);
            res.writeHead(206,headers);
            videoStream.pipe(res);
        } catch(error){
            next(error); 
        }
    }
}

export default StreamingController;