import axios from 'axios'; 
import '../env'; 

class PhotoService {
    public getPixabayImage = async (keyword:string) => {
        const API_KEY = process.env.PIXABAY_KEY;
        const URL =
          "https://pixabay.com/api/?key=" +
          API_KEY +
          "&q=" +
          encodeURIComponent(keyword);
        const response = await axios.get(URL);
        return response.data.hits;
    }
}

export default PhotoService;

