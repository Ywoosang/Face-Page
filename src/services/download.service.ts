import AWS from '../config/aws.config';
import * as dotenv from 'dotenv';
import axios from 'axios'; 
dotenv.config();

class DownloadService {
    public getReadStream = async (url:string) => {
        const response = await axios({
            url,
            responseType: 'stream',
            method: "GET"
          })
        return response.data as any
    }
}

export default DownloadService;

