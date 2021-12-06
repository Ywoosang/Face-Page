import * as AWS from 'aws-sdk'; 
import '../env';
 
AWS.config.update({
    apiVersion: "2010-12-01",
    accessKeyId : process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:process.env.AWS_SECRET_KEY,
    region: 'ap-northeast-2',
});

export default AWS;