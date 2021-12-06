import axios from 'axios'; 
import '../env'; 

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

