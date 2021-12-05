import AWS from '../config/aws.config';
import * as dotenv from 'dotenv';
dotenv.config();

class StreamingService {
    private s3 = new AWS.S3()
    
    public getStreamingHeader = async (range: string) => {
        const videoInfo = await this.s3.headObject({ Bucket: process.env.S3_BUCKET, Key: process.env.S3_DEMO_VIDEO_KEY }).promise();
        // {
        //     AcceptRanges: 'bytes',
        //     LastModified: 2021-10-20T08:02:11.000Z,
        //     ContentLength: 15747534,
        //     ETag: '"3e4d7adbae16f44cc54cfe9555039f8c"',
        //     ContentType: 'video/mp4',
        //     Metadata: {}
        //  }
        const videoSize = videoInfo.ContentLength;
        const chunkSize = 10 ** 6 // 1MB
        // header 에 content Range 적기
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + chunkSize, videoSize - 1);
        const contentLength = end - start + 1;
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4"
        };
        return headers;
    }

    public getVideoStream = (range: string) => {
        return this.s3.getObject({
            Bucket: process.env.S3_BUCKET,
            Key: process.env.S3_DEMO_VIDEO_KEY,
            Range: range
        }).createReadStream();
    }
}

export default StreamingService;

